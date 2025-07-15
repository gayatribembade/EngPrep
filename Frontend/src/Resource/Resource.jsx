// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const Resource = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const branch = queryParams.get("branch");
//   const year = queryParams.get("year");
//   const semester = queryParams.get("semester");

//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       if (branch && year && semester) {
//         try {
//           const response = await fetch(
//             `http://localhost:5000/api/files/search?branch=${branch}&year=${year}&semester=${semester}`
//           );
//           console.log(response); // Debugging

//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }

//           const result = await response.json();
//           console.log(result); // Debugging

//           if (result.success && result.data.length > 0) {
//             setSubjects(result.data);
//           } else {
//             console.warn("No resources found, showing default Software Engineering.");
//             setSubjects([
//               {
//                 _id: "67a25789f33c4cdac28097d1",
//                 title: "Software Engineering",
//                 subject: "Software Engineering",
//                 year: "3rd Year",
//                 branch: "Electronics & Telecommunication Engineering",
//                 semester: "Semester 5",
//                 cloudinary_url: "https://res.cloudinary.com/dmf9szsvt/image/upload/v1738693708/matrix_q1zrsr.pdf",
//               },
//             ]);
//           }
//         } catch (error) {
//           console.error("Error fetching resources:", error);
//         }
//       }
//     };

//     getData();
//   }, [branch, year, semester]);

//   return (
//     <div className="flex min-h-screen bg-gray-100" style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp2036914.jpg')" }}>
//       {/* Sidebar */}
//       <aside className="w-1/4 bg-white p-4 border-r">
//         <h2 className="text-xl font-bold mb-4">Subjects</h2>
//         <ul>
//           {subjects.map((subject, index) => (
//             <li
//               key={index}
//               className={`p-2 rounded-md cursor-pointer hover:bg-blue-100 ${
//                 selectedSubject?.title === subject.title ? "bg-blue-300" : ""
//               }`}
//               onClick={() => setSelectedSubject(subject)}
//             >
//               {subject.title}
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {selectedSubject ? (
//           <>
//             <h2 className="text-2xl font-bold mb-4">{selectedSubject.title}</h2>
//             <p className="text-lg mb-4">
//               {selectedSubject.subject} - {selectedSubject.year} {selectedSubject.branch} {selectedSubject.semester}
//             </p>
//             <a
//               href={selectedSubject.cloudinary_url}
//               className="text-blue-500 underline"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Download the PYQ File
//             </a>
//           </>
//         ) : (
//           <p className="text-gray-500">Select a subject to view resources.</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Resource;
//////

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { FaFilePdf } from "react-icons/fa";

// const Resource = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const branch = queryParams.get("branch");
//   const year = queryParams.get("year");
//   const semester = queryParams.get("semester");

//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async (retryCount = 3) => {
//       if (!branch || !year || !semester) return;

//       setLoading(true);
//       setError("");

//       try {
//         console.log("Fetching with:", { branch, year, semester });

//         const response = await fetch(
//           `http://localhost:5000/api/files/search?branch=${encodeURIComponent(
//             branch
//           )}&year=${encodeURIComponent(year)}&semester=${encodeURIComponent(
//             semester
//           )}`
//         );

//         if (!response.ok) {
//           if (retryCount > 0) {
//             console.warn(`Retrying... (${3 - retryCount + 1})`);
//             return fetchData(retryCount - 1); // Retry the request
//           }
//           throw new Error(`HTTP Error! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("Fetched Data:", result);

//         setSubjects(
//           result.success && result.data.length > 0 ? result.data : []
//         );
//       } catch (err) {
//         console.error("Fetching error:", err.message);
//         setError("Failed to load resources. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [branch, year, semester]);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-1/4 bg-white p-4 border-r">
//         <h2 className="text-xl font-bold mb-4">Subjects</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : subjects.length === 0 ? (
//           <p>No resources found.</p>
//         ) : (
//           <ul>
//             {subjects.map((subject, index) => (
//               <li
//                 key={index}
//                 className={`p-2 rounded-md cursor-pointer hover:bg-blue-100 ${
//                   selectedSubject?.title === subject.title ? "bg-blue-300" : ""
//                 }`}
//                 onClick={() => setSelectedSubject(subject)}
//               >
//                 {subject.title}
//               </li>
//             ))}
//           </ul>
//         )}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {selectedSubject ? (
//           <>
//             <h2 className="text-2xl font-bold mb-4">{selectedSubject.title}</h2>
//             <p className="text-lg mb-4">
//               {selectedSubject.subject} - {selectedSubject.year}{" "}
//               {selectedSubject.branch} {selectedSubject.semester}
//             </p>

//             {/* PDF Download Section */}
//             <div className="flex items-center space-x-3">
//               <a
//                 href={selectedSubject.cloudinary_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-red-500 text-3xl"
//               >
//                 <FaFilePdf />
//               </a>
//               <span>Click the icon to view/download the file</span>
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500">Select a subject to view resources.</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Resource;




/////////new schema

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaFilePdf, FaBook, FaFileAlt } from "react-icons/fa";

const Resource = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const branch = queryParams.get("branch");
  const year = queryParams.get("year");
  const semester = queryParams.get("semester");

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedResourceType, setSelectedResourceType] = useState(null); // 'lectures' or 'pyqs'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!branch || !year || !semester) return;

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:5000/api/files/search?branch=${encodeURIComponent(branch)}&year=${encodeURIComponent(year)}&semester=${encodeURIComponent(semester)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          setSubjects(result.data);
        } else {
          setError("No resources found for the selected criteria.");
          setSubjects([]);
        }
      } catch (err) {
        console.error("Fetching error:", err.message);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [branch, year, semester]);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSelectedResourceType(null); // Reset resource type when changing subjects
  };

  const renderResourceList = () => {
    if (!selectedSubject || !selectedResourceType) return null;

    const resources = selectedSubject.resources[selectedResourceType];
    return (
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-3">
          {selectedResourceType === 'lectures' ? 'Lecture Notes' : 'Previous Year Questions'}
        </h3>
        <ul className="space-y-2">
          {resources.map((resource, index) => (
            <li key={index} className="flex items-center space-x-3">
              <FaFilePdf className="text-red-500" />
              <a
                href={resource.cloudinary_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100 pt-20" style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp2036914.jpg')" }}>
      <aside className="w-1/4 bg-white p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Subjects</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : subjects.length === 0 ? (
          <p className="text-gray-500">No resources found for the selected criteria.</p>
        ) : (
          <ul className="space-y-2">
            {subjects.map((subject) => (
              <li
                key={subject._id}
                className={`p-2 rounded-md cursor-pointer hover:bg-blue-100 ${
                  selectedSubject?._id === subject._id ? "bg-blue-300" : ""
                }`}
                onClick={() => handleSubjectClick(subject)}
              >
                {subject.title}
              </li>
            ))}
          </ul>
        )}
      </aside>

      <main className="flex-1 p-6">
        {selectedSubject ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{selectedSubject.title}</h2>
            <p className="text-lg mb-6">
              {selectedSubject.year} - {selectedSubject.branch} - {selectedSubject.semester}
            </p>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setSelectedResourceType('lectures')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  selectedResourceType === 'lectures'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <FaBook />
                <span>Lecture Notes</span>
              </button>
              <button
                onClick={() => setSelectedResourceType('pyqs')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  selectedResourceType === 'pyqs'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <FaFileAlt />
                <span>Previous Year Questions</span>
              </button>
            </div>

            {renderResourceList()}
          </>
        ) : (
          <p className="text-gray-500">Select a subject to view resources.</p>
        )}
      </main>
    </div>
  );
};

export default Resource;