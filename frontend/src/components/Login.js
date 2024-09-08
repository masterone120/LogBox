import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://192.168.11.131:5000/login', {
        email,
        password,
      });

      // Assuming the response contains a token
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      
      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        setError('Login failed: ' + err.response.data.msg);
      } else {
        setError('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <img src="/Logo.png" className="text-2xl font-bold text-center"></img>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};


export default Login;
