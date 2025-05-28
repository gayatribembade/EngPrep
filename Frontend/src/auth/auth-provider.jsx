// // src/auth/auth-provider.jsx
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in
//     const loadUser = async () => {
//       try {
//         const res = await axios.get('/api/auth/me', {
//           withCredentials: true
//         });

//         if (res.data.success) {
//           setUser(res.data.data);
//         }
//       } catch (error) {
//         console.error('User not authenticated');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, []);

//   const register = async (userData) => {
//     try {
//       const res = await axios.post('/api/auth/register', userData, {
//         withCredentials: true
//       });

//       if (res.data.success) {
//         await loadUserData();
//         return { success: true };
//       }
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || 'Registration failed'
//       };
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post('/api/auth/login', {
//         email,
//         password
//       }, {
//         withCredentials: true
//       });

//       if (res.data.success) {
//         await loadUserData();
//         return { success: true };
//       }
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || 'Authentication failed'
//       };
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.get('/api/auth/logout', {
//         withCredentials: true
//       });
//       setUser(null);
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || 'Logout failed'
//       };
//     }
//   };

//   const loadUserData = async () => {
//     try {
//       const res = await axios.get('/api/auth/me', {
//         withCredentials: true
//       });

//       if (res.data.success) {
//         setUser(res.data.data);
//       }
//     } catch (error) {
//       console.error('Failed to load user data');
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         register,
//         login,
//         logout,
//         isAuthenticated: !!user
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Load user data from API or local storage
//   const loadUserData = async () => {
//     try {
//       const res = await axios.get('/api/auth/me', { withCredentials: true });
//       if (res.data.success) {
//         setUser(res.data.data);
//         localStorage.setItem('user', JSON.stringify(res.data.data));
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         setUser(null);
//         localStorage.removeItem('user');
//       }
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       loadUserData();
//     }
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     loadUserData();
//   }, [user]);

//   const API_BASE_URL = "http://localhost:5000/api/auth"; // Set backend URL

//   const register = async (userData) => {
//     try {
//         const res = await axios.post(`${API_BASE_URL}/register`, userData, {
//             withCredentials: true
//           });

//       if (res.data.success) {
//         await loadUserData();
//         return { success: true };
//       }
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || 'Registration failed'
//       };
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(`${API_BASE_URL}/login`, {
//         email,
//         password
//       }, {
//         withCredentials: true
//       });

//       if (res.data.success) {
//         await loadUserData();
//         return { success: true };
//       }
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || 'Authentication failed'
//       };
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.get('/api/auth/logout', { withCredentials: true });
//       setUser(null);
//       localStorage.removeItem('user');
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || 'Logout failed'
//       };
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         register,
//         login,
//         logout,
//         isAuthenticated: !!user
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const API_BASE_URL = "http://localhost:5000/api/auth"; // Backend URL

//   // Load user data from API or local storage
//   const loadUserData = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });
//       if (res.data.success) {
//         setUser(res.data.data);
//         localStorage.setItem('user', JSON.stringify(res.data.data));
//       } else {
//         setUser(null);
//         localStorage.removeItem('user');
//       }
//     } catch (error) {
//       setUser(null);
//       localStorage.removeItem('user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//       setLoading(false);
//     } else {
//       loadUserData();
//     }
//   }, []);

//   const register = async (userData) => {
//     try {
//       const res = await axios.post(`${API_BASE_URL}/register`, userData, { withCredentials: true });
//       if (res.data.success) {
//         await loadUserData();
//         return { success: true };
//       }
//     } catch (error) {
//       return { success: false, error: error.response?.data?.error || 'Registration failed' };
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(`${API_BASE_URL}/login`, { email, password }, { withCredentials: true });
//       if (res.data.success) {
//         await loadUserData();
//         return { success: true };
//       }
//     } catch (error) {
//       return { success: false, error: error.response?.data?.error || 'Authentication failed' };
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.get(`${API_BASE_URL}/logout`, { withCredentials: true });
//       setUser(null);
//       localStorage.removeItem('user');
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.error || 'Logout failed' };
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, register, login, logout, isAuthenticated: !!user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import Toast notifications

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000/api/auth"; // Backend URL

  // Load user data from API or local storage
  const loadUserData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });
      if (res.data.success) {
        setUser(res.data.data);
        localStorage.setItem('user', JSON.stringify(res.data.data));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      loadUserData();
    }
  }, []);

  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/register`, userData, { withCredentials: true });
      if (res.data.success) {
        await loadUserData();
        toast.success("Registration successful! 🎉");
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, { email, password }, { withCredentials: true });
      if (res.data.success) {
        const { role } = res.data;
        await loadUserData();
        toast.success(`Logged in as ${role}! ✅`);
        return { success: true, role };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Authentication failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/logout`, { withCredentials: true });
      setUser(null);
      localStorage.removeItem('user');
      toast.info("Logged out successfully! 👋");
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Logout failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      register, 
      login, 
      logout, 
      isAuthenticated: !!user, 
      isAdmin: user?.role === "admin" 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


//riddhi

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify'; // Import Toast notifications

// const AuthContext = createContext(null);



// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const API_BASE_URL = "http://localhost:5000/api/auth"; // Backend URL

//   // Load user data from API or local storage
//   const loadUserData = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });
//       if (res.data.success) {
//         setUser(res.data.data);
//         localStorage.setItem('user', JSON.stringify(res.data.data));
//       } else {
//         setUser(null);
//         localStorage.removeItem('user');
//       }
//     } catch (error) {
//       setUser(null);
//       localStorage.removeItem('user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       loadUserData();
//     }
//     setLoading(false);
//   }, []);

//   const register = async (userData) => {
//     try {
//       const res = await axios.post(`${API_BASE_URL}/register`, userData, { withCredentials: true });
//       if (res.data.success) {
//         await loadUserData();
//         toast.success("Registration successful! 🎉");
//         return { success: true };
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 'Registration failed';
//       toast.error(errorMessage);
//       return { success: false, error: errorMessage };
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(`${API_BASE_URL}/login`, { email, password }, { withCredentials: true });
//       if (res.data.success) {
//         await loadUserData();
//         toast.success("Logged in successfully! ✅");
//         return { success: true };
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 'Authentication failed';
//       toast.error(errorMessage);
//       return { success: false, error: errorMessage };
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.get(`${API_BASE_URL}/logout`, { withCredentials: true });
//       setUser(null);
//       localStorage.removeItem('user');
//       toast.info("Logged out successfully! 👋");
//       return { success: true };
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 'Logout failed';
//       toast.error(errorMessage);
//       return { success: false, error: errorMessage };
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, register, login, logout, isAuthenticated: !!user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// // In auth-provider.jsx
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AuthContext = createContext(null);

// // List of admin emails
// const ADMIN_EMAILS = [
//   'bembadegayatree15@gmail.com',
//   'dapkeriddhi@gmail.com'
// ];

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const API_BASE_URL = "http://localhost:5000/api/auth";

//   // Check if a user is an admin based on email
//   const checkAdminStatus = (userData) => {
//     if (!userData || !userData.email) return false;
//     return ADMIN_EMAILS.includes(userData.email.toLowerCase());
//   };

//   // Load user data from API or local storage
//   const loadUserData = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });
//       if (res.data.success) {
//         const userData = res.data.data;
//         setUser(userData);
//         // Set admin status based on email
//         setIsAdmin(checkAdminStatus(userData));
//         localStorage.setItem('user', JSON.stringify(userData));
//       } else {
//         setUser(null);
//         setIsAdmin(false);
//         localStorage.removeItem('user');
//       }
//     } catch (error) {
//       setUser(null);
//       setIsAdmin(false);
//       localStorage.removeItem('user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setUser(userData);
//       setIsAdmin(checkAdminStatus(userData));
//     } else {
//       loadUserData();
//     }
//     setLoading(false);
//   }, []);

//   const register = async (userData) => {
//     try {
//       const res = await axios.post(`${API_BASE_URL}/register`, userData, { withCredentials: true });
//       if (res.data.success) {
//         toast.success("Registration successful! 🎉");
//         return { success: true };
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 'Registration failed';
//       toast.error(errorMessage);
//       return { success: false, error: errorMessage };
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(`${API_BASE_URL}/login`, { email, password }, { withCredentials: true });
//       if (res.data.success) {
//         const userData = res.data.data;
//         setUser(userData);
//         // Set admin status on login
//         const adminStatus = checkAdminStatus({...userData, email});
//         setIsAdmin(adminStatus);
        
//         localStorage.setItem('user', JSON.stringify({...userData, email}));
//         toast.success("Logged in successfully! ✅");
//         return { success: true, isAdmin: adminStatus };
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 'Authentication failed';
//       toast.error(errorMessage);
//       return { success: false, error: errorMessage };
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.get(`${API_BASE_URL}/logout`, { withCredentials: true });
//       setUser(null);
//       setIsAdmin(false);
//       localStorage.removeItem('user');
//       toast.info("Logged out successfully! 👋");
//       return { success: true };
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 'Logout failed';
//       toast.error(errorMessage);
//       return { success: false, error: errorMessage };
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       loading, 
//       register, 
//       login, 
//       logout, 
//       isAuthenticated: !!user, 
//       isAdmin, // Expose isAdmin to components
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);