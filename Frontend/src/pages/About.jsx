import React from 'react';
import { BookOpen, Search, Share2, Award, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

function About() {
  // Team members data
  const teamMembers = [
    {
      name: 'Gayatri Bembade',
      role: 'Lead Developer',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Computer Science graduate with a passion for education technology.'
    },
    {
      name: 'Riddhi Dapke',
      role: 'Lead Developer',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Full-stack developer with expertise in React and Node.js.'
    }
  ];

  // Key features data
  const keyFeatures = [
    {
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      title: 'Resource Library',
      description: 'Access thousands of educational resources uploaded by students and faculty.'
    },
    {
      icon: <Search className="w-6 h-6 text-blue-600" />,
      title: 'Smart Search',
      description: 'Find exactly what you need with our powerful search and filtering system.'
    },
    {
      icon: <Share2 className="w-6 h-6 text-blue-600" />,
      title: 'Easy Sharing',
      description: 'Upload and share your own notes, books, and study materials with others.'
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: 'Quality Content',
      description: 'All resources are rated and reviewed by the community for quality assurance.'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: 'Community Driven',
      description: 'Join a growing community of students helping each other succeed.'
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: 'Secure Platform',
      description: 'Your data is protected with the latest security measures and protocols.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24 max-w-screen-xl">
      {/* Hero Section */}
      <div className="mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About EngPrep</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to make quality educational resources accessible to all engineering students.
        </p>
      </div>
      
      {/* Our Story */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              EngPrep was born out of a simple observation: engineering students spend countless hours searching for quality study materials, often scattered across various platforms and websites.
            </p>
            <p className="text-gray-600 mb-4">
              Founded in 2023 by a group of engineering graduates, we set out to create a centralized platform where students could easily find, share, and collaborate on educational resources specific to their courses and curriculum.
            </p>
            <p className="text-gray-600">
              Today, EngPrep serves thousands of students across multiple engineering disciplines, helping them access the materials they need to succeed in their academic journey.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
              alt="Students collaborating" 
              className="rounded-xl shadow-lg w-full h-auto object-cover"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </div>
      
      {/* Our Mission */}
      <div className="bg-blue-50 rounded-2xl p-8 md:p-12 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To empower engineering students with accessible, high-quality educational resources that enhance their learning experience and academic success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
            <p className="text-gray-600">
              Making educational resources available to all students regardless of their location or financial constraints.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
            <p className="text-gray-600">
              Ensuring all shared materials meet high standards through community reviews and ratings.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
            <p className="text-gray-600">
              Building a collaborative environment where students can help each other succeed.
            </p>
          </div>
        </div>
      </div>
      
      {/* Key Features */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {keyFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Our Team */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Join Us CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Join Our Community Today</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Start sharing and accessing quality educational resources to enhance your academic journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="py-3 px-6 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Sign Up Now
          </Link>
          <Link
            to="/search"
            className="py-3 px-6 bg-blue-700 text-white border border-white/30 rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Browse Resources
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About; 