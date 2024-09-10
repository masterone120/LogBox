import React, { useState } from 'react';

const Sidebar = () => {
  const [selected, setSelected] = useState(null); // State to track the selected link

  const menuItems = [
    { id: 1, name: 'Dashboard', path: '/' },
    { id: 2, name: 'NetLog', path: '/logview' },
    { id: 3, name: 'AppLog', path: '#' },
    { id: 4, name: 'Engine', path: '#' },
    { id: 5, name: 'Menu', path: '#' },
    { id: 6, name: 'Settings', path: '#' },
    { id: 7, name: 'Notification', path: '#' },
    { id: 8, name: 'Account', path: '#' },
  ];

  return (
    <div className="flex flex-col items-center w-40 h-100 overflow-hidden text-gray-400 bg-gray-900 rounded">
      <a className="flex items-center w-full px-3 mt-3" href="#">
        <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        <span className="ml-2 text-sm font-bold">The App</span>
      </a>
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
          {menuItems.map(item => (
            <a
              key={item.id}
              href={item.path}
              className={`flex items-center w-full h-12 px-3 mt-2 rounded 
                ${selected === item.id ? 'bg-green-600 text-white' : 'hover:bg-gray-700 hover:text-gray-300'}`}
              onClick={() => setSelected(item.id)} // Set the selected item on click
            >
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* Example icon */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="ml-2 text-sm font-medium">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
