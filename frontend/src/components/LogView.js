import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const LogView = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredData = data.filter(item => 
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className='flex'>
    <Sidebar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">NetLog</h1>
      <input
        type="text"
        placeholder="Search logs..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      <table className="table-fixed w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {/* <th className="py-2 px-4 border-b">ID</th> */}
            <th className="py-2 px-4 border-b">Browser</th>
            {/* <th className="py-2 px-4 border-b">Event</th> */}
            <th className="py-2 px-4 border-b">Host</th>
            {/* <th className="py-2 px-4 border-b">Pid</th> */}
            {/* <th className="py-2 px-4 border-b">Session</th> */}
            {/* <th className="py-2 px-4 border-b">Terminal</th> */}
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Url</th>
            <th className="py-2 px-4 border-b">User</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              {/* <td className="py-2 px-4 border-b">{item.id}</td> */}
              <td className="py-2 px-4 border-b">{item.browser}</td>
              {/* <td className="py-2 px-4 border-b">{item.event}</td> */}
              <td className="py-2 px-4 border-b">{item.host}</td>
              {/* <td className="py-2 px-4 border-b">{item.pid}</td> */}
              {/* <td className="py-2 px-4 border-b">{item.session}</td> */}
              {/* <td className="py-2 px-4 border-b">{item.terminal}</td> */}
              <td className="py-2 px-4 border-b">{item.time}</td>
              <td className="py-2 px-4 border-b">
                <p className="break-all">
                  {item.title}
                </p>
              </td>
              <td className="py-2 px-4 border-b">
                  <p className="break-all">
                      {item.url}
                  </p>
              </td>
                
              <td className="py-2 px-4 border-b">{item.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span>
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
        </span>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1, pageSize)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1, pageSize)}
            disabled={currentPage * pageSize >= filteredData.length}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LogView;
