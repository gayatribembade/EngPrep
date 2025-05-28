import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  // Fetch all pending submissions
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/submissions/pending');
      setSubmissions(response.data.submissions);
      setError(null);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to load submissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle WebSocket connection for real-time notifications
  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_submission') {
        // Fetch the latest submissions when a new one is received
        fetchSubmissions();
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    
    setSocket(ws);
    
    // Clean up the WebSocket connection
    return () => {
      ws.close();
    };
  }, []);
  
  // Initial fetch of submissions
  useEffect(() => {
    fetchSubmissions();
  }, []);
  
  // Handle submission approval
  const handleApprove = async (submissionId) => {
    try {
      await axios.post(`/api/submissions/approve/${submissionId}`);
      // Remove the approved submission from the list
      setSubmissions(submissions.filter(sub => sub._id !== submissionId));
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Error approving submission:', error);
      setError('Failed to approve submission. Please try again.');
    }
  };
  
  // Handle submission rejection
  const handleReject = async (submissionId) => {
    const reason = prompt('Please enter a reason for rejection (optional):');
    try {
      await axios.post(`/api/submissions/reject/${submissionId}`, { reason });
      // Remove the rejected submission from the list
      setSubmissions(submissions.filter(sub => sub._id !== submissionId));
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Error rejecting submission:', error);
      setError('Failed to reject submission. Please try again.');
    }
  };
  
  // View submission details
  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission);
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Pending Submissions ({submissions.length})</h2>
          
          {loading ? (
            <p>Loading submissions...</p>
          ) : submissions.length === 0 ? (
            <p>No pending submissions</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <li key={submission._id} className="py-3">
                  <div 
                    className="cursor-pointer hover:bg-gray-50 p-2 rounded" 
                    onClick={() => handleViewDetails(submission)}
                  >
                    <h3 className="font-medium">{submission.title}</h3>
                    <p className="text-sm text-gray-500">
                      {submission.category} • By {submission.authorName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(submission.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Submission Details */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          {selectedSubmission ? (
            <div>
              <h2 className="text-2xl font-bold mb-2">{selectedSubmission.title}</h2>
              <div className="flex gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {selectedSubmission.category}
                </span>
                {selectedSubmission.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-1">Description</h3>
                <p className="text-gray-700">{selectedSubmission.description}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-1">File</h3>
                <a 
                  href={selectedSubmission.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Preview File
                </a>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-1">Author Information</h3>
                <p className="text-gray-700">
                  {selectedSubmission.authorName} ({selectedSubmission.authorEmail})
                </p>
              </div>
              
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => handleApprove(selectedSubmission._id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Approve Submission
                </button>
                <button
                  onClick={() => handleReject(selectedSubmission._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Reject Submission
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Select a submission to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;