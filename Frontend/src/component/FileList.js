import React, { useEffect, useState } from 'react';

const FileList = ({ branch, year, sem, subject }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch(`http://localhost:5000/api/files?branch=${branch}&year=${year}&sem=${sem}&subject=${subject}`);
      const data = await response.json();
      setFiles(data);
    };
    fetchFiles();
  }, [branch, year, sem, subject]);

  return (
    <div>
      <h2>Uploaded Files</h2>
      {files.map((file, index) => (
        <div key={index}>
          <a href={file.url} target="_blank" rel="noopener noreferrer">{file.public_id}</a>
        </div>
      ))}
    </div>
  );
};

export default FileList;
