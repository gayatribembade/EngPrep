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


import React from 'react';
import { Star } from 'lucide-react';

function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Computer Science Student",
      image: "/api/placeholder/64/64", // Replace with actual image path
      quote: "This platform completely transformed my learning experience. The resources are comprehensive and the community is incredibly supportive.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Engineering Professor",
      image: "/api/placeholder/64/64", // Replace with actual image path
      quote: "I've recommended this platform to all my students. The quality of content and interactive learning tools are unmatched.",
      rating: 5,
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Data Science Professional",
      image: "/api/placeholder/64/64", // Replace with actual image path
      quote: "The advanced courses helped me transition into a new career. Worth every penny and minute invested.",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-blue-400">{item.role}</p>
                </div>
              </div>
              
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                  />
                ))}
              </div>
              
              <p className="text-gray-300 italic">"{item.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;