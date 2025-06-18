import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth-provider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// List of admin email addresses
const ADMIN_EMAILS = [
  'bembadegayatree15@gmail.com',
  'dapkeriddhi@gmail.com'
];

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const validateForm = () => {
    if (!formData.email) {
      toast.error('Please enter your email address');
      return false;
    }
    
    if (!formData.password) {
      toast.error('Please enter your password');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    const { email, password } = formData;
    
    console.log('Submitting login for email:', email);
    console.log('Is admin email?', ADMIN_EMAILS.includes(email.toLowerCase()));
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        console.log('Login successful, admin status:', result.isAdmin);
        toast.success('Login successful! Welcome back!', {
          icon: '👋',
          position: 'top-center'
        });
        
        // Navigate to admin route if user is admin, otherwise to home
        const destination = location.state?.from?.pathname || (result.isAdmin ? '/' : '/');
        console.log('Navigating to:', destination);
        setTimeout(() => {
          navigate(destination);
        }, 500);
      } else {
        console.error('Login failed:', result.error);
        setError(result.error);
        toast.error(result.error || 'Login failed, please check your credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to EngPrep</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p>Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
