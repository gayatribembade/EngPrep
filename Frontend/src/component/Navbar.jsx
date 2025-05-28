// // import React from 'react'

// function Navbar() {
//   const navItems = (
//     <>
//       <div className="flex text-lg">
//         <li>
//           <a href="/">Home</a>
//         </li>
//         <li>
//           <a href="/info">Resource</a>
//         </li>
//         <li>
//           <a>Contact</a>
//         </li>
//         <li>
//           <a>About</a>
//         </li>
//       </div>
//     </>
//   );
//   return (
//     <>
//       <div className="max-w-screen-2xl container mx-auto md:px-20 px-4  fixed  top-0 left-0 right-0  z-50  ">
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-40 -z-10"></div>
//         <div className="navbar bg-transparent shadow-none text-white text-3xl">
//           <div className="navbar-start ">
//             <div className="dropdown">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost lg:hidden"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h8m-8 6h16"
//                   />
//                 </svg>
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//               >
//                 {navItems}
//               </ul>
//             </div>
//             <a className="btn btn-ghost bg-transparent text-4xl shadow-none border-none hover:text-white " >
//               EngPrep
//             </a>
//           </div>
//           <div className="navbar-center hidden lg:flex">
//             <ul className="menu menu-horizontal px-1">{navItems}</ul>
//           </div>
//           <div className="navbar-end">
//             <a className="btn bg-blue-700 text-white border-none hover:bg-gray-500">
//               Login
//             </a>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Navbar;





// import React from 'react';
// import { Home, BookOpen, MessageCircle, Info, LogIn } from 'lucide-react';
// import { useNavigate } from "react-router-dom";
// import Login from '../auth/Login';


// function Navbar() {
//   // Nav items with icons and hover animations
//   const navigate = useNavigate();
//   const navItems = (
//     <>
//       <div className="flex text-lg gap-6">
//         <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//           <a href="/" className="flex items-center gap-1">
//             <Home size={18} />
//             <span>Home</span>
//           </a>
//         </li>
//         <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//           <a href="/info" className="flex items-center gap-1">
//             <BookOpen size={18} />
//             <span>Resource</span>
//           </a>
//         </li>
//         <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//           <a className="flex items-center gap-1">
//             <MessageCircle size={18} />
//             <span>Contact</span>
//           </a>
//         </li>
//         <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//           <a className="flex items-center gap-1">
//             <Info size={18} />
//             <span>About</span>
//           </a>
//         </li>
//       </div>
//     </>
//   );

//   return (
//     <>
//       <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50">
//         {/* Background with improved gradient */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/5 backdrop-blur-sm -z-10 rounded-b-lg"></div>

//         <div className="navbar bg-transparent shadow-none text-white text-3xl ">
//           <div className="navbar-start">
//             <div className="dropdown">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost lg:hidden hover:bg-white/10 transition-all duration-300"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h8m-8 6h16"
//                   />
//                 </svg>
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="menu menu-sm dropdown-content bg-black/80 backdrop-blur-md rounded-box z-1 mt-3 w-52 p-2 shadow text-white"
//               >
//                 {navItems}
//               </ul>
//             </div>
//             {/* Logo with hover animation */}
//             <a className="btn btn-ghost bg-transparent text-4xl shadow-none border-none group flex items-center gap-2">
//               <span className="text-blue-500 font-bold transition-all duration-300 group-hover:text-white group-hover:scale-105">
//                 Eng
//               </span>
//               <span className="font-bold transition-all duration-300 group-hover:text-blue-500 group-hover:scale-105">
//                 Prep
//               </span>
//             </a>
//           </div>

//           <div className="navbar-center hidden lg:flex">
//             <ul className="menu menu-horizontal px-1">{navItems}</ul>
//           </div>

//           <div className="navbar-end">

//             <a onClick={() => navigate('/login')} className="btn bg-blue-700 text-white border-none hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 cursor-pointer">
//               <LogIn size={18} />
//               <span>Login</span>
//             </a>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Navbar;


// import React from 'react';
// import { Home, BookOpen, MessageCircle, Info, LogIn, LogOut } from 'lucide-react';
// import { useNavigate } from "react-router-dom";
// import { useAuth } from '../auth/auth-provider';

// function Navbar() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const handleLogout = async () => {
//     await logout();
  
//     navigate('/');
//   };

//   const navItems = (
//     <div className="flex text-lg gap-6">
//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <a href="/" className="flex items-center gap-1">
//           <Home size={18} />
//           <span>Home</span>
//         </a>
//       </li>
//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <a href="/info" className="flex items-center gap-1">
//           <BookOpen size={18} />
//           <span>Resource</span>
//         </a>
//       </li>
//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <a className="flex items-center gap-1">
//           <MessageCircle size={18} />
//           <span>Contact</span>
//         </a>
//       </li>
//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <a className="flex items-center gap-1">
//           <Info size={18} />
//           <span>About</span>
//         </a>
//       </li>
//     </div>
//   );

//   return (
//     <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50">
//       <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/5 backdrop-blur-sm -z-10 rounded-b-lg"></div>

//       <div className="navbar bg-transparent shadow-none text-white text-3xl ">
//         <div className="navbar-start">
//           <a className="btn btn-ghost bg-transparent text-4xl shadow-none border-none group flex items-center gap-2">
//             <span className="text-blue-500 font-bold transition-all duration-300 group-hover:text-white group-hover:scale-105">
//               Eng
//             </span>
//             <span className="font-bold transition-all duration-300 group-hover:text-blue-500 group-hover:scale-105">
//               Prep
//             </span>
//           </a>
//         </div>

//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">{navItems}</ul>
//         </div>

//         <div className="navbar-end">
//           {user ? (
//             <button 
//               onClick={handleLogout} 
//               className="btn bg-red-600 text-white border-none hover:bg-red-500 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer">
//               <LogOut size={18} />
//               <span>Logout</span>
//             </button>
//           ) : (
//             <button 
//               onClick={() => navigate('/login')} 
//               className="btn bg-blue-700 text-white border-none hover:bg-blue-600 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer">
//               <LogIn size={18} />
//               <span>Login</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;








// import React from 'react';
// import { Home, BookOpen, MessageCircle, Info, LogIn, LogOut, User } from 'lucide-react';
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from '../auth/auth-provider';

// function Navbar() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const handleLogout = async () => {
//     await logout();
//     navigate('/');
//   };

//   // Public navigation items - available to all users
//   const publicNavItems = (
//     <div className="flex text-lg gap-6">
//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <Link to="/" className="flex items-center gap-1">
//           <Home size={18} />
//           <span>Home</span>
//         </Link>
//       </li>

//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <Link to="/login" className="flex items-center gap-1">
//           <BookOpen size={18} />
//           <span >Resources</span>
//         </Link>
//       </li>
//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <Link to="/login" className="flex items-center gap-1">
//           <User size={18} />
//           <span>Profile</span>
//         </Link>
//       </li>
      
//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <Link to="/about" className="flex items-center gap-1">
//           <Info size={18} />
//           <span>About</span>
//         </Link>
//       </li>
     
//     </div>
//   );

//   // Protected navigation items - only for authenticated users
//   const protectedNavItems = (
//     <div className="flex text-lg gap-6">
//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <Link to="/" className="flex items-center gap-1">
//           <Home size={18} />
//           <span>Home</span>
//         </Link>
//       </li>
//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <Link to="/info" className="flex items-center gap-1">
//           <BookOpen size={18} />
//           <span >Resources</span>
//         </Link>
//       </li>
//       {/* <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <Link to="/contact" className="flex items-center gap-1">
//           <MessageCircle size={18} />
//           <span>Contact</span>
//         </Link>
//       </li> */}
//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <Link to="/about" className="flex items-center gap-1">
//           <Info size={18} />
//           <span>About</span>
//         </Link>
//       </li>
//       <li className="transition-all duration-300 hover:scale-110 hover:text-blue-400 flex items-center">
//         <Link to="/profile" className="flex items-center gap-1">
//           <User size={18} />
//           <span>Profile</span>
//         </Link>
//       </li>
//     </div>
//   );

//   return (
//     <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50">
//       <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/5 backdrop-blur-sm -z-10 rounded-b-lg"></div>

//       <div className="navbar bg-transparent shadow-none text-white text-3xl ">
//         <div className="navbar-start">
//           <Link to="/" className="btn btn-ghost bg-transparent text-4xl shadow-none border-none group flex items-center gap-2">
//             <span className="text-blue-500 font-bold transition-all duration-300 group-hover:text-white group-hover:scale-105">
//               Eng
//             </span>
//             <span className="font-bold transition-all duration-300 group-hover:text-blue-500 group-hover:scale-105">
//               Prep
//             </span>
//           </Link>
//         </div>

//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             {user ? protectedNavItems : publicNavItems}
//           </ul>
//         </div>

//         <div className="navbar-end">
//           {user ? (
//             <div className="flex items-center gap-10 font-semibold">
//               <span className="text-sm hidden md:block">Welcome, {user.username}</span>
//               <button 
//                 onClick={handleLogout} 
//                 className="btn bg-red-600 text-white border-none hover:bg-red-500 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer">
//                 <LogOut size={18} />
//                 <span>Logout</span>
//               </button>
//             </div>
//           ) : (
//             <button 
//               onClick={() => navigate('/login')} 
//               className="btn bg-blue-700 text-white border-none hover:bg-blue-600 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer">
//               <LogIn size={18} />
//               <span>Login</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Info, LogIn, LogOut, User, Menu, X } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../auth/auth-provider';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Nav items with animations
  const NavItem = ({ to, icon: Icon, text }) => (
    <li className="group relative">
      <Link 
        to={to} 
        className="flex items-center gap-2 py-2 px-3 font-medium transition-all duration-300 hover:text-blue-400"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Icon size={18} className="group-hover:rotate-6 transition-transform" />
        <span>{text}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
      </Link>
    </li>
  );

  // Public navigation items
  const publicNavItems = (
    <>
      <NavItem to="/" icon={Home} text="Home" />
      <NavItem to="/login" icon={BookOpen} text="Resources" />
      <NavItem to="/login" icon={User} text="Profile" />
      <NavItem to="/about" icon={Info} text="About" />
    </>
  );

  // Protected navigation items
  const protectedNavItems = (
    <>
      <NavItem to="/" icon={Home} text="Home" />
      <NavItem to="/info" icon={BookOpen} text="Resources" />
      <NavItem to="/about" icon={Info} text="About" />
      <NavItem to="/profile" icon={User} text="Profile" />
    </>
  );

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/20' : 'bg-transparent'}`}>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-4 text-white">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-1">
            <span className="text-3xl font-extrabold">
              <span className="text-blue-500 transition-all duration-300 group-hover:text-white">Eng</span>
              <span className="transition-all duration-300 group-hover:text-blue-500">Prep</span>
            </span>
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <ul className="flex space-x-6 items-center">
              {user ? protectedNavItems : publicNavItems}
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium">
                  Welcome, {user.username}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="btn px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 border-none text-white rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 flex items-center gap-2">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')} 
                className="btn px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 border-none text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
                <LogIn size={16} />
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden flex items-center" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-900/95 backdrop-blur-md rounded-lg p-4 mt-2 border border-gray-800 animate-fadeIn">
            <ul className="flex flex-col space-y-3">
              {user ? protectedNavItems : publicNavItems}
              <div className="pt-3 border-t border-gray-700">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <span className="text-sm text-gray-300">Welcome,{user.username}</span>
                    <button 
                      onClick={handleLogout} 
                      className="btn w-full py-2 bg-gradient-to-r from-red-500 to-red-700 border-none text-white rounded-lg flex items-center justify-center gap-2">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }} 
                    className="btn w-full py-2 bg-gradient-to-r from-blue-600 to-blue-800 border-none text-white rounded-lg flex items-center justify-center gap-2">
                    <LogIn size={16} />
                    Login
                  </button>
                )}
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;