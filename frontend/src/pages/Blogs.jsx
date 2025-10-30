import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'https://vibelog-pro-8.onrender.com/api'}/posts`);
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        // Fallback to mock data if API fails
        const mockBlogs = [
          {
            _id: 1,
            title: "Getting Started with React Development",
            authorId: { name: "John Doe" },
            content: "Learn the basics of React and build your first application...",
            tags: ["React", "JavaScript", "Frontend"],
            likes: [1, 2, 3],
            comments: [],
            createdAt: "2024-01-15T10:00:00Z"
          },
          {
            _id: 2,
            title: "The Future of Content Creation",
            authorId: { name: "Jane Smith" },
            content: "Exploring how AI and new technologies are shaping content creation...",
            tags: ["Content", "AI", "Future"],
            likes: [1, 2, 3, 4, 5],
            comments: [],
            createdAt: "2024-01-12T10:00:00Z"
          },
          {
            _id: 3,
            title: "Building a Successful Freelance Career",
            authorId: { name: "Mike Johnson" },
            content: "Tips and strategies for freelancers to grow their business...",
            tags: ["Freelance", "Career", "Business"],
            likes: [1, 2, 3, 4, 5, 6, 7],
            comments: [],
            createdAt: "2024-01-10T10:00:00Z"
          }
        ];
        setBlogs(mockBlogs);
        setError('Using mock data - API not available');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Latest Blogs</h1>
        <p className="text-gray-600">Discover amazing content from our talented creators</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id || blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.content ? blog.content.substring(0, 150) + '...' : blog.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags && blog.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {blog.authorId?.name || blog.author}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{blog.likes?.length || blog.likes || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm">{blog.comments?.length || blog.comments || 0}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {blogs.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first blog post.</p>
        </div>
      )}
    </div>
  );
};

export default Blogs;
