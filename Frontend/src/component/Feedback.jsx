// import React from "react";
// import Cards from "./Cards"; // Import the Cards component

// function Home() {
//   return (
//     <div className=" ">
//       {/* Banner, Cards, etc. */}
//       {/* ✅ Cards are rendered only once */}

//       {/* Social Remarks Section BELOW Cards */}
//       <div className="container h-80 mx-auto mt-10 p-6 bg-gradient-to-l from-transparent to-yellow-950 text-white rounded-lg shadow-lg">
//         <h2 className="text-3xl font-bold text-center mb-4">
//           What Students Say About Us
//         </h2>

//         <div className="flex flex-wrap justify-center gap-6 h-48">
//           {[
//             {
//               name: "Akshada Ghodke",
//               remark:
//                 "This platform helped me ace my exams! The study material is fantastic.",
//             },
//             {
//               name: "Princy Malewar",
//               remark:
//                 "The collection of past year papers is a lifesaver. Highly recommended!",
//             },
//             {
//               name: "Atharva Khare",
//               remark:
//                 "Uploading my notes to help others gave me a great sense of contribution!",
//             },
//           ].map((testimonial, index) => (
//             <div
//               key={index}
//               className="w-80 p-4 bg-white text-gray-800 rounded-lg shadow-md"
//             >
//               <h3 className="font-semibold text-lg">{testimonial.name}</h3>
//               <p className="text-sm mt-2">{testimonial.remark}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

function TestimonialsSection() {
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('testimonials-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Computer Science Student",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "This platform completely transformed my learning experience. The resources are comprehensive and the community is incredibly supportive.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Engineering Professor",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "I've recommended this platform to all my students. The quality of content and interactive learning tools are unmatched.",
      rating: 5,
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Data Science Professional",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "The advanced courses helped me transition into a new career. Worth every penny and minute invested.",
      rating: 4,
    },
  ];

  return (
    <section id="testimonials-section" className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">Hear from students and educators who have experienced the benefits of our platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-8">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                <p className="text-gray-600 italic pl-6">{item.quote}</p>
              </div>
              
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-blue-500 text-sm">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;