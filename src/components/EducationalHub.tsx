import React, { useState } from 'react';
import { BookOpen, Video, Download, ExternalLink, Search, Star, Clock, Users } from 'lucide-react';

const EducationalHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'basics', name: 'Tree Planting Basics' },
    { id: 'climate', name: 'Climate Science' },
    { id: 'biodiversity', name: 'Biodiversity' },
    { id: 'guides', name: 'How-to Guides' },
    { id: 'research', name: 'Research Papers' }
  ];
// In Future, this could also be made dynamic. This could be called using APIs and  JSON format for API can be same as right now. However, for this hackathon, we made it static..
  const resources = [
    {
      id: 1,
      title: 'Complete Guide to Urban Tree Planting',
      type: 'guide',
      category: 'basics',
      description: 'Comprehensive guide covering everything from site selection to long-term care of urban trees.',
      duration: '15 min read',
      rating: 4.8,
      views: 12547,
      thumbnail: '🌳',
      tags: ['urban-planning', 'tree-care', 'beginner'],
      downloadable: true
    },
    {
      id: 2,
      title: 'Carbon Sequestration: How Trees Fight Climate Change',
      type: 'video',
      category: 'climate',
      description: 'Understanding the science behind how trees absorb and store carbon dioxide from the atmosphere.',
      duration: '12 min watch',
      rating: 4.9,
      views: 8932,
      thumbnail: '🔬',
      tags: ['carbon', 'climate-science', 'environment'],
      downloadable: false
    },
    {
      id: 3,
      title: 'Native Species Selection by Region',
      type: 'article',
      category: 'biodiversity',
      description: 'Interactive tool to find the best native tree species for your specific geographic location.',
      duration: '8 min read',
      rating: 4.7,
      views: 15632,
      thumbnail: '🗺️',
      tags: ['native-species', 'biodiversity', 'regional'],
      downloadable: true
    },
    {
      id: 4,
      title: 'DIY Tree Planting: Tools and Techniques',
      type: 'video',
      category: 'guides',
      description: 'Step-by-step video tutorial showing proper planting techniques and required tools.',
      duration: '18 min watch',
      rating: 4.6,
      views: 6789,
      thumbnail: '🛠️',
      tags: ['diy', 'tools', 'technique'],
      downloadable: false
    },
    {
      id: 5,
      title: 'Tree Health Monitoring and Disease Prevention',
      type: 'guide',
      category: 'basics',
      description: 'Learn to identify common tree diseases and implement prevention strategies.',
      duration: '20 min read',
      rating: 4.8,
      views: 9456,
      thumbnail: '🩺',
      tags: ['health', 'disease', 'monitoring'],
      downloadable: true
    },
    {
      id: 6,
      title: 'The Economics of Reforestation',
      type: 'research',
      category: 'research',
      description: 'Academic paper analyzing the economic benefits and costs of large-scale reforestation projects.',
      duration: '45 min read',
      rating: 4.5,
      views: 3421,
      thumbnail: '📊',
      tags: ['economics', 'research', 'policy'],
      downloadable: true
    }
  ];
// Webinars could also have zoom id or zoom link or google meet id or link in their data and that data could be linked with more abilities. Maybe I'll do it in the future...
  const webinars = [
    {
      id: 1,
      title: 'Sustainable Forestry Practices',
      date: 'March 25, 2024',
      time: '2:00 PM EST',
      speaker: 'Dr. Sarah Johnson',
      registered: 234,
      maxCapacity: 500
    },
    {
      id: 2,
      title: 'Community Tree Planting Organization',
      date: 'March 30, 2024',
      time: '11:00 AM EST',
      speaker: 'Mark Thompson',
      registered: 187,
      maxCapacity: 300
    },
    {
      id: 3,
      title: 'Climate Change Adaptation Strategies',
      date: 'April 5, 2024',
      time: '3:00 PM EST',
      speaker: 'Prof. Elena Rodriguez',
      registered: 412,
      maxCapacity: 600
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'guide': return <BookOpen className="w-5 h-5" />;
      case 'article': return <BookOpen className="w-5 h-5" />;
      case 'research': return <BookOpen className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-600 bg-red-50';
      case 'guide': return 'text-green-600 bg-green-50';
      case 'article': return 'text-blue-600 bg-blue-50';
      case 'research': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Educational Hub
        </h1>
        <p className="text-xl text-gray-600">
          Learn everything about trees, climate action, and sustainable living
        </p>
      </div>

      {/* Featured Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-green-100">
          <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-green-600">156</p>
          <p className="text-gray-600 text-sm">Resources</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-green-100">
          <Video className="w-8 h-8 text-red-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-red-600">42</p>
          <p className="text-gray-600 text-sm">Video Tutorials</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-green-100">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-blue-600">8,932</p>
          <p className="text-gray-600 text-sm">Learners</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-green-100">
          <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-purple-600">24/7</p>
          <p className="text-gray-600 text-sm">Access</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  {/* Resource Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{resource.thumbnail}</div>
                    <div className="flex items-center space-x-2">
                      <span className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                        {getTypeIcon(resource.type)}
                        <span className="capitalize">{resource.type}</span>
                      </span>
                      {resource.downloadable && (
                        <button className="text-gray-500 hover:text-green-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Resource Info */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{resource.title}</h3>
                    <p className="text-gray-600 text-sm">{resource.description}</p>
                    
                    {/* Metadata */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{resource.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{resource.views.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag) => (
                        <span key={tag} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2">
                      {resource.type === 'video' ? <Video className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                      <span>{resource.type === 'video' ? 'Watch Now' : 'Read More'}</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Webinars */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Webinars</h3>
            <div className="space-y-4">
              {webinars.map((webinar) => (
                <div key={webinar.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{webinar.title}</h4>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <p>{webinar.date} at {webinar.time}</p>
                    <p>Speaker: {webinar.speaker}</p>
                    <p>{webinar.registered}/{webinar.maxCapacity} registered</p>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              {[
                { name: 'Tree Species Database', icon: '🌲' },
                { name: 'Planting Calendar', icon: '📅' },
                { name: 'Carbon Calculator', icon: '🧮' },
                { name: 'Local Nurseries', icon: '🏪' },
                { name: 'Expert Network', icon: '👥' }
              ].map((link, i) => (
                <button key={i} className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <span className="text-2xl">{link.icon}</span>
                  <span className="font-medium text-gray-900">{link.name}</span>
                  <ExternalLink className="w-4 h-4 text-gray-500 ml-auto" />
                </button>
              ))}
            </div>
          </div>

          {/* Featured Content */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Featured This Week</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-900">New Course</h4>
                <p className="text-sm text-gray-600">Advanced Tree Care Techniques</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl mb-2">📖</div>
                <h4 className="font-semibold text-gray-900">Research Update</h4>
                <p className="text-sm text-gray-600">Latest Climate Action Studies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalHub;
