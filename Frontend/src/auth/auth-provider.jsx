import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axios';

const AuthContext = createContext(null);

// List of admin email addresses
const ADMIN_EMAILS = [
  'bembadegayatree15@gmail.com',
  'dapkeriddhi@gmail.com'
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = (userEmail) => {
    if (!userEmail) {
      console.log('No email provided for admin check');
      return false;
    }
    const normalizedEmail = userEmail.toLowerCase().trim();
    console.log('Checking admin status for:', normalizedEmail);
    console.log('Admin emails list:', ADMIN_EMAILS);
    const adminStatus = ADMIN_EMAILS.includes(normalizedEmail);
    console.log('Is admin?', adminStatus);
    return adminStatus;
  };

  const loadUserData = async () => {
    try {
      console.log('Loading user data from API...');
      const res = await axiosInstance.get('/auth/me');
      console.log('API response:', res.data);
      
      if (res.data.success) {
        const email = res.data.data.email;
        const adminStatus = isAdmin(email);
        console.log('Admin status for', email, ':', adminStatus);
        
        const userData = {
          ...res.data.data,
          isAdmin: adminStatus,
          // Set username as the display name
          username: res.data.data.username
        };

        console.log('Setting user data:', userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Loading user data error:', error);
      if (error.response?.status === 401) {
        console.log('Unauthorized, clearing user data');
        setUser(null);
        localStorage.removeItem('user');
        toast.info('Your session has expired. Please log in again.');
      }
    }
  };

  useEffect(() => {
    console.log('AuthProvider useEffect running...');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        console.log('Found stored user:', storedUser);
        const userData = JSON.parse(storedUser);
        if (userData && userData.email) {
          const adminStatus = isAdmin(userData.email);
          console.log('Rechecked admin status:', adminStatus);
          userData.isAdmin = adminStatus;
          console.log('Setting stored user with admin status:', userData);
          setUser(userData);
        } else {
          console.log('Invalid stored user data');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    } else {
      console.log('No stored user found, loading from API...');
      loadUserData();
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login for email:', email);
      const res = await axiosInstance.post('/auth/login', {
        email: email.trim(),
        password
      });

      console.log('Login response data:', res.data);

      if (res.data.success) {
        const adminStatus = isAdmin(email);
        console.log('Admin status after login:', adminStatus);
        
        // Extract user data from response
        const userData = {
          ...res.data.user,  // Get user data from response
          email: email,
          isAdmin: adminStatus
        };
        
        console.log('Final user data being set:', userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Toast notification is now handled in the Login component
        return { success: true, isAdmin: adminStatus };
      } else {
        throw new Error(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Authentication failed';
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration with data:', userData);
      const res = await axiosInstance.post('/auth/register', userData);
      console.log('Registration response:', res.data);
      console.log('Full registration response:', JSON.stringify(res.data, null, 2));
      
      if (res.data.success) {
        console.log('Registration successful');
        // Toast notification is now handled in the Register component
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Registration failed';
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get('/auth/logout');
      console.log('Logout successful, clearing user data');
      setUser(null);
      localStorage.removeItem('user');
      
      toast.success('Logged out successfully!', {
        icon: '👋',
        position: 'top-center'
      });
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      const errorMessage = error.response?.data?.error || 'Logout failed';
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const contextValue = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user ? isAdmin(user.email) : false
  };

  console.log('Current auth context:', contextValue);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);