import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/auth-provider';
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import AdminRoute from './auth/AdminRoute';
import Navbar from './component/Navbar';
import Resource from "./Resource/Resource";
import ResourceDetail from "./Resource/ResourceDetail";
import Home from "./Home/Home";
import Info from "./component/Info";
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './auth/Unauthorized';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import MyResources from './pages/MyResources';
import Activity from './pages/Activity';
import Support from './pages/Support';
import About from './pages/About';
import UploadResource from './pages/UploadResource';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthProvider>
        <Navbar />
        {/* <div className="pt-20">  */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/info" element={<Info />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/resource/:id" element={<ResourceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            
            {/* Protected Routes */}
            <Route 
              path="/resource" 
              element={
                <ProtectedRoute>
                  <Resource/>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/my-resources" 
              element={
                <ProtectedRoute>
                  <MyResources />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/activity" 
              element={
                <ProtectedRoute>
                  <Activity />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/upload-resource" 
              element={
                <ProtectedRoute>
                  <UploadResource />
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* Redirect any unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        {/* </div> */}
      </AuthProvider>
    </>
  );
}

export default App;
