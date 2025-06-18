// import React from "react";
// import Navbar from "../component/Navbar";

// import Cards from "../component/Cards";
// import Feedback from "../component/Feedback";
// import Footer from "../component/Footer";
// import Background from "../component/Background";

// const Home = () => {
//   return (
//     <>
//       <div className="app-container">
//         <Navbar />

//         <div className="min-h-screen flex flex-col">
//           <main className="flex-grow">
//             {/* Your Page Content Here */}
//             <Background />
//             <Cards />
//             <Feedback/>
//           </main>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;



import React, { useEffect } from "react";
// import Background from "./Background";
import Background from "../component/Background";
import Feedback from "../component/Feedback";
import Cards from "../component/Cards";
// import Cards from "./Cards";
// import TestimonialsSection from "./TestimonialsSection";
import { BookOpen, Globe, Users, ArrowRight } from 'lucide-react';

function Home() {
  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add animations with CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.8s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <Background />
      
      {/* Features Section */}
      <Cards />
      
      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, value: "10k+", label: "Resources" },
              { icon: Users, value: "50k+", label: "Students" },
              { icon: Globe, value: "200+", label: "Universities" },
              { icon: BookOpen, value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <stat.icon className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-800">{stat.value}</h3>
                <p className="text-blue-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <Feedback/>
      
      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-tr from-yellow-200 to-pink-200 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 animate-fadeIn">Ready to Transform Your Learning Journey?</h2>
            <p className="text-xl text-gray-600 mb-10 animate-fadeIn">Join thousands of students who have already taken their education to the next level.</p>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-lg text-lg flex items-center mx-auto transition-all duration-300 hover:shadow-lg hover:scale-105">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Press</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Guides</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Cookies</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Licenses</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-gray-600">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input type="email" placeholder="Enter your email" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r transition">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} EngPrep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;