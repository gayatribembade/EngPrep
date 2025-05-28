// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Info = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     college: "",
//     year: "",
//     branch: "",
//     semester: "",
//   });

//   const branches = [
//     { value: "chemical", label: "Chemical Engineering" },
//     { value: "civil", label: "Civil Engineering" },
//     { value: "cs", label: "Computer Science & Engineering" },
//     { value: "extc", label: "Electronics & Telecommunication Engineering" },
//     { value: "tronics", label: "Electronics Engineering" },
//     { value: "trical", label: "Electrical Engineering" },
//     { value: "it", label: "Information Technology" },
//     { value: "mechanical", label: "Mechanical Engineering" },
//     { value: "production", label: "Production Engineering" },
//     { value: "textile", label: "Textile Engineering" },
//   ];

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!formData.name || !formData.college || !formData.year || !formData.branch || !formData.semester) {
//       alert("Please fill all fields before submitting.");
//       return;
//     }

//     // Navigate to Resource page with selected values
//     navigate(`/resource?branch=${formData.branch}&year=${formData.year}&semester=${formData.semester}`);
//   };

//   return (
//     <>
//       {/* Background Image */}
//       <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp2036914.jpg')", filter: "blur(8px)" }}></div>

//       {/* Form Container */}
//       <div className="max-w-md mx-auto mt-10 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg relative z-10">
//         <h2 className="text-2xl font-bold mb-4 text-center">Student Form</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
          
//           {/* Name Input */}
//           <div>
//             <label className="block font-semibold">Name</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 rounded-md border" placeholder="Enter your name" required />
//           </div>

//           {/* College Input */}
//           <div>
//             <label className="block font-semibold">College</label>
//             <input type="text" name="college" value={formData.college} onChange={handleChange} className="w-full p-2 rounded-md border" placeholder="Enter your college name" required />
//           </div>

//           {/* Year Dropdown */}
//           <div>
//             <label className="block font-semibold">Year</label>
//             <select name="year" value={formData.year} onChange={handleChange} className="w-full p-2 rounded-md border" required>
//               <option value="">Select Year</option>
//               <option value="1st">1st Year</option>
//               <option value="2nd">2nd Year</option>
//               <option value="3rd">3rd Year</option>
//             </select>
//           </div>

//           {/* Semester Dropdown */}
//           <div>
//             <label className="block font-semibold">Semester</label>
//             <select name="semester" value={formData.semester} onChange={handleChange} className="w-full p-2 rounded-md border" required>
//               <option value="">Select Semester</option>
//               <option value="sem1">Semester 1</option>
//               <option value="sem2">Semester 2</option>
//               <option value="sem3">Semester 3</option>
//               <option value="sem4">Semester 4</option>
//               <option value="sem5">Semester 5</option>
//               <option value="sem6">Semester 6</option>
//             </select>
//           </div>

//           {/* Branch Dropdown */}
//           <div>
//             <label className="block font-semibold">Branch</label>
//             <select name="branch" value={formData.branch} onChange={handleChange} className="w-full p-2 rounded-md border" required>
//               <option value="">Select Branch</option>
//               {branches.map((branch) => (
//                 <option key={branch.value} value={branch.value}>{branch.label}</option>
//               ))}
//             </select>
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Info;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    year: "",
    branch: "",
    semester: "",
  });

  const branches = [
    { value: "Chemical Engineering", label: "Chemical Engineering" },
    { value: "Civil Engineering", label: "Civil Engineering" },
    { value: "Computer Science & Engineering", label: "Computer Science & Engineering" },
    { value: "Electronics & Telecommunication Engineering", label: "Electronics & Telecommunication Engineering" },
    { value: "Electronics Engineering", label: "Electronics Engineering" },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Information Technology", label: "Information Technology" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    { value: "Production Engineering", label: "Production Engineering" },
    { value: "Textile Engineering", label: "Textile Engineering" },
  ];

  const yearOptions = [
    { value: "1st Year", label: "1st Year" },
    { value: "2nd Year", label: "2nd Year" },
    { value: "3rd Year", label: "3rd Year" }
  ];

  const semesterOptions = [
    { value: "Semester 1", label: "Semester 1" },
    { value: "Semester 2", label: "Semester 2" },
    { value: "Semester 3", label: "Semester 3" },
    { value: "Semester 4", label: "Semester 4" },
    { value: "Semester 5", label: "Semester 5" },
    { value: "Semester 6", label: "Semester 6" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.college || !formData.year || !formData.branch || !formData.semester) {
      alert("Please fill all fields before submitting.");
      return;
    }

    // Navigate with exact values that match the database
    navigate(`/resource?branch=${encodeURIComponent(formData.branch)}&year=${encodeURIComponent(formData.year)}&semester=${encodeURIComponent(formData.semester)}`);
  };

  return (
    <>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp2036914.jpg')", filter: "blur(8px)" }}></div>

      <div className="max-w-md mx-auto mt-30 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg relative z-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Student Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 rounded-md border" placeholder="Enter your name" required />
          </div>

          <div>
            <label className="block font-semibold">College</label>
            <input type="text" name="college" value={formData.college} onChange={handleChange} className="w-full p-2 rounded-md border" placeholder="Enter your college name" required />
          </div>

          <div>
            <label className="block font-semibold">Year</label>
            <select name="year" value={formData.year} onChange={handleChange} className="w-full p-2 rounded-md border" required>
              <option value="">Select Year</option>
              {yearOptions.map((year) => (
                <option key={year.value} value={year.value}>{year.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold">Semester</label>
            <select name="semester" value={formData.semester} onChange={handleChange} className="w-full p-2 rounded-md border" required>
              <option value="">Select Semester</option>
              {semesterOptions.map((sem) => (
                <option key={sem.value} value={sem.value}>{sem.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold">Branch</label>
            <select name="branch" value={formData.branch} onChange={handleChange} className="w-full p-2 rounded-md border" required>
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.value} value={branch.value}>{branch.label}</option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Info;