import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'https://vibelog-pro-8.onrender.com/api'}/services`);
        // Transform service data to freelancer format
        const transformedFreelancers = response.data.map(service => ({
          _id: service._id,
          name: service.creatorId?.name || 'Unknown Creator',
          title: service.title,
          skills: service.category ? [service.category] : [],
          rating: service.rating || 0,
          projects: service.orders?.length || 0,
          hourlyRate: service.pricing?.[0]?.price || 0,
          bio: service.description,
          avatar: "https://via.placeholder.com/150"
        }));
        setFreelancers(transformedFreelancers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching freelancers:', err);
        // Fallback to mock data if API fails
        const mockFreelancers = [
          {
            _id: 1,
            name: "Sarah Johnson",
            title: "Content Writer & SEO Specialist",
            skills: ["Content Writing", "SEO", "Blogging"],
            rating: 4.8,
            projects: 45,
            hourlyRate: 50,
            bio: "Passionate content creator with 5+ years of experience in digital marketing and SEO.",
            avatar: "https://via.placeholder.com/150"
          },
          {
            _id: 2,
            name: "Alex Chen",
            title: "Video Editor & Motion Graphics",
            skills: ["Video Editing", "After Effects", "Premiere Pro"],
            rating: 4.9,
            projects: 67,
            hourlyRate: 75,
            bio: "Creative video editor specializing in engaging content for social media and marketing.",
            avatar: "https://via.placeholder.com/150"
          },
          {
            _id: 3,
            name: "Maria Rodriguez",
            title: "Social Media Manager",
            skills: ["Social Media", "Marketing", "Strategy"],
            rating: 4.7,
            projects: 32,
            hourlyRate: 40,
            bio: "Helping brands grow their online presence through strategic social media management.",
            avatar: "https://via.placeholder.com/150"
          },
          {
            _id: 4,
            name: "David Kim",
            title: "Graphic Designer & Illustrator",
            skills: ["Graphic Design", "Illustration", "Branding"],
            rating: 4.6,
            projects: 58,
            hourlyRate: 60,
            bio: "Creating stunning visuals that tell your brand's story and capture attention.",
            avatar: "https://via.placeholder.com/150"
          }
        ];
        setFreelancers(mockFreelancers);
        setError('Using mock data - API not available');
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Freelancers</h1>
        <p className="text-gray-600">Connect with talented professionals for your projects</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading freelancers...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <div key={freelancer._id || freelancer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{freelancer.name}</h3>
                  <p className="text-gray-600 text-sm">{freelancer.title}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-2">{freelancer.bio}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {freelancer.skills.map((skill, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">{freelancer.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({freelancer.projects} projects)</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">${freelancer.hourlyRate}/hr</p>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                Contact Freelancer
              </button>
            </div>
          </div>
          ))}
        </div>
      )}

      {freelancers.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No freelancers found</h3>
          <p className="mt-1 text-sm text-gray-500">Check back later for new talent.</p>
        </div>
      )}
    </div>
  );
};

export default Freelancers;
