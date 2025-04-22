import React, { useState } from 'react';
import { MessageSquare, Lock, Globe, ThumbsUp, AlertTriangle, User, Calendar } from 'lucide-react';

// Mock data for public complaints
const initialComplaints = [
  {
    id: 1,
    title: 'Library Hours Extension',
    description: 'Request to extend library hours during exam periods',
    date: '2024-03-15',
    author: 'Student Council',
    votes: 45,
    status: 'under-review',
    category: 'Academic',
  },
  {
    id: 2,
    title: 'Cafeteria Food Quality',
    description: 'Concerns about the variety and quality of food options in the cafeteria',
    date: '2024-03-14',
    author: 'Sarah Ahmed',
    votes: 78,
    status: 'in-progress',
    category: 'Facilities',
  },
  {
    id: 3,
    title: 'Wi-Fi Connectivity Issues',
    description: 'Poor Wi-Fi connection in Building H, especially during peak hours',
    date: '2024-03-13',
    author: 'Mohammed Hassan',
    votes: 92,
    status: 'pending',
    category: 'Technical',
  },
];

export default function StudentComplaints() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Academic');
  const [isPublic, setIsPublic] = useState(true);
  const [activeTab, setActiveTab] = useState('submit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPublic) {
      const newComplaint = {
        id: complaints.length + 1,
        title,
        description,
        date: new Date().toISOString().split('T')[0],
        author: 'Current User',
        votes: 0,
        status: 'pending',
        category,
      };
      setComplaints([newComplaint, ...complaints]);
    }
    setTitle('');
    setDescription('');
    setCategory('Academic');
    setIsPublic(true);
  };

  const handleVote = (id: number) => {
    setComplaints(complaints.map(complaint =>
      complaint.id === id ? { ...complaint, votes: complaint.votes + 1 } : complaint
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="University Campus"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Student Complaints Portal</h1>
            <p className="text-xl">Voice your concerns and help improve our university</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeTab === 'submit'
                ? 'bg-[#003366] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Submit Complaint
          </button>
          <button
            onClick={() => setActiveTab('public')}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeTab === 'public'
                ? 'bg-[#003366] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Public Complaints
          </button>
        </div>

        {activeTab === 'submit' ? (
          /* Complaint Submission Form */
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Submit Your Complaint</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complaint Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Academic</option>
                  <option>Facilities</option>
                  <option>Technical</option>
                  <option>Administrative</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Make this complaint public</span>
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  Public complaints can be viewed and voted on by other students
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#003366] text-white py-3 px-6 rounded-md hover:bg-blue-800 transition-colors"
              >
                Submit Complaint
              </button>
            </form>
          </div>
        ) : (
          /* Public Complaints List */
          <div className="space-y-6">
            {complaints
              .sort((a, b) => b.votes - a.votes)
              .map((complaint) => (
                <div
                  key={complaint.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{complaint.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {complaint.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {complaint.date}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium
                          ${complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'}`}
                        >
                          {complaint.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleVote(complaint.id)}
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{complaint.votes}</span>
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{complaint.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {complaint.category}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}