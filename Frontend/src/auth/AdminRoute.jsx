import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './auth-provider';

// List of admin emails for direct comparison
const ADMIN_EMAILS = [
  'bembadegayatree15@gmail.com',
  'dapkeriddhi@gmail.com'
];

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AdminRoute - Component Mounted');
    console.log('Current user:', user);
    console.log('Is authenticated:', isAuthenticated);
    console.log('Is admin from context:', isAdmin);
    if (user?.email) {
      const isEmailAdmin = ADMIN_EMAILS.includes(user.email.toLowerCase());
      console.log('Is email in admin list:', isEmailAdmin);
    }
  }, [user, isAuthenticated, isAdmin]);

  if (loading) {
    console.log('AdminRoute - Loading...');
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('AdminRoute - Not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }

  // Double-check admin status both from context and email list
  const isUserAdmin = isAdmin || (user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));
  console.log('Final admin check:', {
    contextIsAdmin: isAdmin,
    userEmail: user?.email,
    isInAdminList: user?.email ? ADMIN_EMAILS.includes(user.email.toLowerCase()) : false,
    finalIsAdmin: isUserAdmin
  });

  if (!isUserAdmin) {
    console.log('AdminRoute - Not admin, redirecting to unauthorized');
    return <Navigate to="/unauthorized" />;
  }

  console.log('AdminRoute - Access granted');
  return children;
};

export default AdminRoute;