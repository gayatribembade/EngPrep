import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/auth-provider';
import { storage, auth } from '../firebase/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploadType, setUploadType] = useState(null);
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    branch: '',
    year: '',
    semester: '',
    subject: ''
  });

  const branches = [
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science & Engineering",
    "Electronics & Telecommunication Engineering",
    "Electronics Engineering",
    "Electrical Engineering",
    "Information Technology",
    "Mechanical Engineering",
    "Production Engineering",
    "Textile Engineering"
  ];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setUploadSuccess(false);
    }
  };

  const handleMetadataChange = (e) => {
    setMetadata({
      ...metadata,
      [e.target.name]: e.target.value
    });
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    if (!uploadType) {
      setError('Please select upload type');
      return;
    }

    if (!metadata.title || !metadata.description || !metadata.branch || !metadata.year || !metadata.semester) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Get the current user's token
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      // Create a reference with a unique file name
      const safePath = encodeURIComponent(`resources/${uploadType}/${metadata.branch}/${metadata.year}/${metadata.semester}/${file.name}`);
      const fileRef = ref(storage, safePath);

      // Add custom metadata
      const customMetadata = {
        customMetadata: {
          title: metadata.title,
          description: metadata.description,
          branch: metadata.branch,
          year: metadata.year,
          semester: metadata.semester,
          subject: metadata.subject || '',
          uploadedBy: user.email,
          uploadedAt: new Date().toISOString()
        }
      };

      // Upload the file with metadata
      await uploadBytes(fileRef, file, customMetadata);
      const downloadURL = await getDownloadURL(fileRef);

      setUploadSuccess(true);
      setFile(null);
      setMetadata({
        title: '',
        description: '',
        branch: '',
        year: '',
        semester: '',
        subject: ''
      });
      setUploadType(null);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.username}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Upload Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Select Upload Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Notes', 'Question Papers', 'Books'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setUploadType(type)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      uploadType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    <FileText className="w-6 h-6 mx-auto mb-2" />
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {uploadType && (
              <>
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                    </div>
                  </div>
                  {file && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {file.name}
                    </p>
                  )}
                </div>

                {/* Metadata Form */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={metadata.title}
                      onChange={handleMetadataChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      value={metadata.description}
                      onChange={handleMetadataChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Branch</label>
                      <select
                        name="branch"
                        value={metadata.branch}
                        onChange={handleMetadataChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Branch</option>
                        {branches.map((branch) => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Year</label>
                      <select
                        name="year"
                        value={metadata.year}
                        onChange={handleMetadataChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Semester</label>
                      <select
                        name="semester"
                        value={metadata.semester}
                        onChange={handleMetadataChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Semester</option>
                        {semesters.map((semester) => (
                          <option key={semester} value={semester}>{semester}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject (Optional)</label>
                    <input
                      type="text"
                      name="subject"
                      value={metadata.subject}
                      onChange={handleMetadataChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Upload Button */}
                <div>
                  <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white ${
                      !file || uploading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {uploading ? 'Uploading...' : 'Upload File'}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <div className="flex items-center p-4 text-red-700 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          {uploadSuccess && (
            <div className="flex items-center p-4 text-green-700 bg-green-50 rounded-lg">
              <Check className="w-5 h-5 mr-2" />
              File uploaded successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;