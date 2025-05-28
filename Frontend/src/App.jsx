import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/auth-provider';
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import Navbar from './component/Navbar';
import Resource from "./Resource/Resource";
import Home from "./Home/Home";
import Info from "./component/Info";








import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
     <ToastContainer position="top-right" autoClose={1000} />

    <AuthProvider>
      <Navbar />
      {/* <div className="pt-20">  */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/info" element={<Info />} />

          
          {/* Protected Routes */}
          <Route 
            path="/resource" 
            element={
              <ProtectedRoute>
                <Resource/>
              </ProtectedRoute>
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
