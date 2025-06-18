import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, HelpCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';
import axiosInstance from '../api/axios';

function Support() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I upload a resource?',
      answer: 'To upload a resource, log in to your account and click on the "Upload" button in the navigation bar. Fill in the required details about your resource, attach your file, and submit the form. Your resource will be reviewed by our team before being published.'
    },
    {
      id: 2,
      question: 'What types of files can I upload?',
      answer: 'We support various file formats including PDF, DOC/DOCX, PPT/PPTX, and more. The maximum file size is 50MB. For larger files, consider compressing them or splitting them into multiple parts.'
    },
    {
      id: 3,
      question: 'How are resources categorized?',
      answer: 'Resources are categorized by branch, year, type (Notes, PYQS, Books), semester, and subject. This helps users find exactly what they need. Make sure to properly categorize your uploads to help others discover them.'
    },
    {
      id: 4,
      question: 'Can I edit or delete my uploaded resources?',
      answer: 'Yes, you can manage your uploads from the "My Resources" page. There you can edit details, replace files, or delete resources you\'ve uploaded.'
    },
    {
      id: 5,
      question: 'How does the rating system work?',
      answer: 'Users can rate resources on a scale of 1-5 stars. The average rating is displayed on each resource. Higher-rated resources may appear higher in search results when sorted by relevance.'
    },
    {
      id: 6,
      question: 'What should I do if I find inappropriate content?',
      answer: 'If you find content that violates our guidelines, please report it using the "Report" button on the resource page. Our moderation team will review it promptly.'
    }
  ];

  const handleFaqToggle = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // In a real app, you would send this data to your backend
      // await axiosInstance.post('/support/contact', contactForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent. We\'ll get back to you soon!'
      });
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-screen-xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get the help you need with our resources and platform features
        </p>
      </div>
      
      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">FAQs</h3>
          <p className="text-gray-600 mb-4">
            Find answers to commonly asked questions about our platform
          </p>
          <button
            onClick={() => document.getElementById('faqs').scrollIntoView({ behavior: 'smooth' })}
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            View FAQs
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">
            Send us an email and we'll get back to you within 24 hours
          </p>
          <a
            href="mailto:support@engprep.edu"
            className="text-green-600 font-medium hover:text-green-700"
          >
            support@engprep.edu
          </a>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-4">
            Available Monday to Friday, 9 AM to 5 PM
          </p>
          <a
            href="tel:+1234567890"
            className="text-purple-600 font-medium hover:text-purple-700"
          >
            +1 (234) 567-890
          </a>
        </div>
      </div>
      
      {/* FAQs Section */}
      <div id="faqs" className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => handleFaqToggle(faq.id)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {expandedFaq === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {expandedFaq === faq.id && (
                <div className="px-5 pb-5">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Contact Form */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactForm.name}
                onChange={handleFormChange}
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactForm.email}
                onChange={handleFormChange}
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={contactForm.subject}
              onChange={handleFormChange}
              required
              className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="How can we help you?"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={contactForm.message}
              onChange={handleFormChange}
              required
              rows={5}
              className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="Please describe your issue or question in detail..."
            />
          </div>
          
          {submitStatus && (
            <div className={`p-4 mb-6 rounded-lg ${
              submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {submitStatus.message}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 py-2.5 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Support; 