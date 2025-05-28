// import React from "react";

// const Cards = () => {
//   return (
//     <div className="relative px-45 py-10 flex flex-wrap justify-center gap-20  mt-20 bg-gradient-to-t from-transparent to-yellow-950">
//       <div className="absolute inset-0 bg-gradient-to-b from-white to-white opacity-40 -z-10"></div>
//       <div className="flex space-x-8 ">
//         {/* Card 1 */}
//         <div className="relative card bg-base-100 w-96 shadow-xl overflow-hidden">
//           <figure className="px-10 pt-10">
//             <img
//               src="https://wallpapercave.com/wp/wp2036967.jpg"
//               alt="Shoes"
//               className="rounded-xl"
//             />
//           </figure>
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-950 opacity-50"></div>

//           <div className="card-body items-center text-center text-white relative">
//             <h2 className="card-title text-2xl">Latest Books</h2>
//             <p>Most recently added textbooks</p>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="relative card bg-base-100 w-96 shadow-xl overflow-hidden">
//           <figure className="px-10 pt-9">
//             <img
//               src="http://sev.h-cdn.co/assets/15/20/1280x960/gallery-1431381741-tumblr-nmcftajjos1uqg4zmo1-1280.jpg"
//               alt="Shoes"
//               className="rounded-xl"
//             />
//           </figure>
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-950 opacity-50"></div>

//           <div className="card-body items-center text-center text-white relative">
//             <h2 className="card-title text-2xl">Past Year Papers (PYQs)</h2>
//             <p>Previous exam papers by subject</p>
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div className="relative card bg-base-100 w-96 shadow-xl overflow-hidden">
//           <figure className="px-10 pt-10">
//             <img
//               src="https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?cs=srgb&dl=ballpen-blur-book-1925536.jpg&fm=jpg"
//               alt="Shoes"
//               className="rounded-xl"
//             />
//           </figure>
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-950  opacity-50 "></div>

//           <div className="card-body items-center text-center text-white relative">
//             <h2 className="card-title text-2xl">Notes & Study Material</h2>
//             <p className="">Notes contributed by students</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cards;


import React, { useEffect, useState } from "react";
import { BookOpen, FileText, Notebook } from 'lucide-react';

const Cards = () => {
  // Animation states for each card
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
    
    const element = document.getElementById('feature-cards');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  
  // Card data
  const cardsData = [
    {
      icon: BookOpen,
      title: "Latest Books",
      description: "Most recently added textbooks and learning materials",
      image: "https://wallpapercave.com/wp/wp2036967.jpg",
      color: "from-blue-600 to-cyan-400"
    },
    {
      icon: FileText,
      title: "Past Year Papers (PYQs)",
      description: "Previous exam papers organized by subject and year",
      image: "http://sev.h-cdn.co/assets/15/20/1280x960/gallery-1431381741-tumblr-nmcftajjos1uqg4zmo1-1280.jpg",
      color: "from-purple-600 to-pink-500"
    },
    {
      icon: Notebook,
      title: "Notes & Study Material",
      description: "High-quality notes contributed by top students",
      image: "https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg",
      color: "from-amber-500 to-yellow-400"
    }
  ];

  return (
    <div 
      id="feature-cards" 
      className="px-6 py-24 bg-gradient-to-b from-blue-900/80 to-black"
    >
      <div className="container mx-auto">
        {/* Section heading */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">Access our comprehensive collection of academic resources designed to help you excel in your studies.</p>
        </div>
        
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardsData.map((card, index) => (
            <div 
              key={index} 
              className={`bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform transition-all duration-700 delay-${index * 100} hover:-translate-y-2 ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              {/* Card image with overlay */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-90`}></div>
                
                {/* Icon overlay */}
                <div className={`absolute top-4 right-4 p-3 rounded-lg bg-gradient-to-br ${card.color} shadow-lg`}>
                  <card.icon size={24} className="text-white" />
                </div>
              </div>
              
              {/* Card content */}
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${card.color}`}>
                  {card.title}
                </h3>
                <p className="text-gray-300">{card.description}</p>
                
                {/* Interactive button */}
                <button className={`mt-6 py-2 px-4 rounded-lg bg-gray-800 hover:bg-gradient-to-r ${card.color} text-white text-sm flex items-center gap-2 transition-all duration-300`}>
                  Explore Resources
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;