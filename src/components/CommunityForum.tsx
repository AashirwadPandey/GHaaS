import React, { useState } from 'react';
import { MessageCircle, Users, Calendar, ThumbsUp, MessageSquare, Plus, Search, Filter, Bookmark } from 'lucide-react';

interface User {
  name: string;
}

interface CommunityForumProps {
  user: User;
}

const CommunityForum: React.FC<CommunityForumProps> = ({ user }) => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const categories = [
    { id: 'general', name: 'General Discussion', count: 245 },
    { id: 'tips', name: 'Planting Tips', count: 156 },
    { id: 'events', name: 'Local Events', count: 89 },
    { id: 'success', name: 'Success Stories', count: 178 },
    { id: 'questions', name: 'Q&A', count: 203 }
  ];

  const posts = [
    {
      id: 1,
      title: 'Best native trees for urban environments?',
      category: 'tips',
      author: 'GreenThumb92',
      avatar: 'GT',
      content: 'Looking for recommendations on native tree species that thrive in urban settings. Any suggestions for zones 6-7?',
      timestamp: '2 hours ago',
      likes: 15,
      replies: 8,
      tags: ['urban-planning', 'native-species'],
      pinned: false
    },
    {
      id: 2,
      title: 'Community tree planting event - San Francisco',
      category: 'events',
      author: 'SFTreeLover',
      avatar: 'SF',
      content: 'Join us this Saturday at Golden Gate Park for a community tree planting event! We\'ll be planting 100 native oak trees.',
      timestamp: '4 hours ago',
      likes: 32,
      replies: 12,
      tags: ['san-francisco', 'community-event'],
      pinned: true
    },
    {
      id: 3,
      title: 'Reached 1000 trees planted milestone! 🎉',
      category: 'success',
      author: 'EcoWarrior2024',
      avatar: 'EW',
      content: 'Just hit my personal goal of 1000 trees planted this year! It\'s been an incredible journey and I want to thank this community for all the support.',
      timestamp: '6 hours ago',
      likes: 89,
      replies: 24,
      tags: ['milestone', 'celebration'],
      pinned: false
    },
    {
      id: 4,
      title: 'How do you measure carbon offset accurately?',
      category: 'questions',
      author: 'DataDriven',
      avatar: 'DD',
      content: 'I\'ve been tracking my plantings but wondering about the most accurate way to calculate actual carbon offset. Any resources or tools you recommend?',
      timestamp: '8 hours ago',
      likes: 23,
      replies: 15,
      tags: ['carbon-offset', 'measurement'],
      pinned: false
    },
    {
      id: 5,
      title: 'Drought-resistant trees for California',
      category: 'tips',
      author: 'CAGardener',
      avatar: 'CG',
      content: 'With ongoing drought conditions, what are your top picks for drought-resistant trees that still provide good environmental benefits?',
      timestamp: '12 hours ago',
      likes: 41,
      replies: 19,
      tags: ['drought-resistant', 'california'],
      pinned: false
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'general' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Community Forum
        </h1>
        <p className="text-xl text-gray-600">
          Connect with fellow eco-warriors and share your green journey
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-green-100">
          <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-green-600">12,547</p>
          <p className="text-gray-600 text-sm">Active Members</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-green-100">
          <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-blue-600">3,891</p>
          <p className="text-gray-600 text-sm">Discussions</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-green-100">
          <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-purple-600">156</p>
          <p className="text-gray-600 text-sm">Events This Month</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-green-100">
          <ThumbsUp className="w-8 h-8 text-amber-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-amber-600">45,231</p>
          <p className="text-gray-600 text-sm">Helpful Reactions</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* New Post Button */}
          <button
            onClick={() => setShowNewPost(true)}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Post</span>
          </button>

          {/* Categories */}
          <div className="bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
              <h3 className="font-semibold text-gray-900">Categories</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    activeCategory === category.id ? 'bg-green-50 border-r-2 border-green-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${
                      activeCategory === category.id ? 'text-green-600' : 'text-gray-700'
                    }`}>
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div className="bg-white rounded-xl shadow-lg p-4 border border-green-100">
            <h3 className="font-semibold text-gray-900 mb-3">Trending Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['urban-planning', 'native-species', 'carbon-offset', 'drought-resistant', 'community-event'].map((tag) => (
                <span key={tag} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-lg p-4 border border-green-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  <span>Saved</span>
                </button>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {sortedPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-shadow">
                {post.pinned && (
                  <div className="bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-2 border-b border-amber-200">
                    <span className="text-amber-800 text-sm font-medium">📌 Pinned Post</span>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {post.avatar}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 hover:text-green-600 cursor-pointer">
                          {post.title}
                        </h3>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {categories.find(c => c.id === post.category)?.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm text-gray-600 mb-3">
                        <span className="font-medium">{post.author}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Load More Posts
            </button>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
              <button
                onClick={() => setShowNewPost(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Enter your post title..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  rows={6}
                  placeholder="Share your thoughts, questions, or experiences..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="Add tags separated by commas..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;