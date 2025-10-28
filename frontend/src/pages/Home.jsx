import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-url.onrender.com/api';

const Home = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [postsRes, servicesRes] = await Promise.all([
        axios.get(`${API_URL}/posts/trending`),
        axios.get(`${API_URL}/services/featured`)
      ]);
      setTrendingPosts(postsRes.data);
      setFeaturedServices(servicesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to VibeLog Pro
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            The ultimate platform where creators showcase their blogs, vlogs, and freelance services.
            Connect, create, and monetize your passion. 🚀
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/blogs" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              📝 Explore Blogs
            </Link>
            <Link to="/freelancers" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              💼 Find Freelancers
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
            🔥 Trending Posts
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : trendingPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingPosts.map((post) => (
                <Link key={post._id} to={`/blog/${post._id}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {post.authorId?.name?.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{post.authorId?.name}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>❤️ {post.likes?.length || 0} likes</span>
                    <span>👁️ {post.views || 0} views</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">{post.type}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">No trending posts yet</p>
          )}
        </div>
      </section>

      {/* Featured Freelancers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
            ⭐ Featured Services
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredServices.map((service) => (
                <Link key={service._id} to={`/service/${service._id}`} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-blue-100">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                      {service.creatorId?.name?.charAt(0)}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-semibold truncate">{service.creatorId?.name}</p>
                      <p className="text-sm text-gray-600">⭐ {service.rating || 0.0}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                      {service.category}
                    </span>
                    {service.pricing && service.pricing.length > 0 && (
                      <span className="text-green-600 font-bold">
                        ${Math.min(...service.pricing.map(p => p.price))}+
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">No featured services yet</p>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose VibeLog Pro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Create & Share</h3>
              <p className="text-gray-600">Publish your blogs and vlogs, build your audience, and showcase your creative work with our beautiful editor.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💼</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Freelance Services</h3>
              <p className="text-gray-600">Offer your skills as a freelancer and get hired for exciting projects worldwide. Connect with clients seamlessly.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Monetize Your Work</h3>
              <p className="text-gray-600">Earn money through freelance gigs, platform commissions, and premium features. Multiple revenue streams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey? 🚀</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of creators and freelancers on VibeLog Pro today.</p>
          <Link to="/register" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
