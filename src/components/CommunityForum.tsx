import React, { useState } from 'react';
import { MessageCircle, Users, Calendar, ThumbsUp, MessageSquare, Plus, Search, Filter, Bookmark, Heart, Smile, Trophy, Flame, Send, Reply, MoreHorizontal, Image, Paperclip } from 'lucide-react';

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
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [postReactions, setPostReactions] = useState<{[key: number]: {[key: string]: number}}>({});
  const [userReactions, setUserReactions] = useState<{[key: number]: string}>({});
  const [showComments, setShowComments] = useState<{[key: number]: boolean}>({});

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
      pinned: false,
      reactions: { like: 15, love: 3, helpful: 7, inspiring: 2 },
      comments: [
        {
          id: 101,
          author: 'TreeExpert',
          avatar: 'TE',
          content: 'I\'d recommend Red Oak and Sugar Maple for zone 6-7. They\'re very resilient and provide great shade.',
          timestamp: '1 hour ago',
          likes: 5,
          replies: [
            {
              id: 1011,
              author: 'GreenThumb92',
              avatar: 'GT',
              content: 'Thanks! Do you know how fast Sugar Maples grow?',
              timestamp: '45 minutes ago',
              likes: 2
            }
          ]
        },
        {
          id: 102,
          author: 'UrbanForester',
          avatar: 'UF',
          content: 'Don\'t forget about Eastern Redbud! Beautiful spring flowers and great for pollinators.',
          timestamp: '30 minutes ago',
          likes: 8,
          replies: []
        }
      ]
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
      pinned: true,
      reactions: { like: 32, love: 18, inspiring: 15, helpful: 5 },
      comments: [
        {
          id: 201,
          author: 'EcoWarrior2024',
          avatar: 'EW',
          content: 'Count me in! What should I bring?',
          timestamp: '3 hours ago',
          likes: 12,
          replies: [
            {
              id: 2011,
              author: 'SFTreeLover',
              avatar: 'SF',
              content: 'Just bring gloves and water! We\'ll provide all the tools and saplings.',
              timestamp: '2 hours ago',
              likes: 8
            }
          ]
        }
      ]
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
      pinned: false,
      reactions: { like: 89, love: 45, inspiring: 67, helpful: 12 },
      comments: [
        {
          id: 301,
          author: 'GreenThumb92',
          avatar: 'GT',
          content: 'Congratulations! That\'s amazing dedication. What\'s your next goal?',
          timestamp: '5 hours ago',
          likes: 15,
          replies: []
        },
        {
          id: 302,
          author: 'TreeExpert',
          avatar: 'TE',
          content: 'Wow! You\'ve probably offset about 13.7 tons of CO2. Keep up the great work!',
          timestamp: '4 hours ago',
          likes: 23,
          replies: []
        }
      ]
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
      pinned: false,
      reactions: { like: 23, helpful: 31, inspiring: 8 },
      comments: [
        {
          id: 401,
          author: 'ScienceGuy',
          avatar: 'SG',
          content: 'Check out the EPA\'s greenhouse gas equivalencies calculator. Very accurate and easy to use.',
          timestamp: '7 hours ago',
          likes: 18,
          replies: []
        }
      ]
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
      pinned: false,
      reactions: { like: 41, helpful: 28, inspiring: 15 },
      comments: [
        {
          id: 501,
          author: 'DesertExpert',
          avatar: 'DE',
          content: 'California Sycamore and Coast Live Oak are excellent choices. Native and very drought tolerant.',
          timestamp: '11 hours ago',
          likes: 25,
          replies: []
        }
      ]
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

  // Reaction handling
  const handleReaction = (postId: number, reactionType: string) => {
    setPostReactions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [reactionType]: (prev[postId]?.[reactionType] || 0) + 1
      }
    }));
    setUserReactions(prev => ({
      ...prev,
      [postId]: reactionType
    }));
  };

  // Comment handling
  const toggleComments = (postId: number) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId: number) => {
    if (newComment.trim()) {
      // In a real app, this would make an API call
      console.log(`Adding comment to post ${postId}: ${newComment}`);
      setNewComment('');
      setReplyingTo(null);
    }
  };

  const reactionEmojis = [
    { type: 'like', emoji: '👍', label: 'Like' },
    { type: 'love', emoji: '❤️', label: 'Love' },
    { type: 'helpful', emoji: '💡', label: 'Helpful' },
    { type: 'inspiring', emoji: '🌟', label: 'Inspiring' }
  ];

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
                        <div className="flex items-center space-x-6">
                          {/* Reaction Buttons */}
                          <div className="flex items-center space-x-1">
                            {reactionEmojis.map((reaction) => {
                              const postReactionCount = postReactions[post.id]?.[reaction.type] || 0;
                              const baseReactionCount = (post.reactions as any)[reaction.type] || 0;
                              const count = postReactionCount + baseReactionCount;
                              const isActive = userReactions[post.id] === reaction.type;
                              return (
                                <button
                                  key={reaction.type}
                                  onClick={() => handleReaction(post.id, reaction.type)}
                                  className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-200 ${
                                    isActive 
                                      ? 'bg-green-100 text-green-700 border border-green-300' 
                                      : 'hover:bg-gray-100 text-gray-600'
                                  }`}
                                  title={reaction.label}
                                >
                                  <span className="text-sm">{reaction.emoji}</span>
                                  {count > 0 && <span className="text-xs font-medium">{count}</span>}
                                </button>
                              );
                            })}
                          </div>
                          
                          {/* Comment Button */}
                          <button 
                            onClick={() => toggleComments(post.id)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments.length} comments</span>
                          </button>
                          
                          {/* More Actions */}
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
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
                      
                      {/* Comments Section */}
                      {showComments[post.id] && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="space-y-4">
                            {post.comments.map((comment) => (
                              <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                    {comment.avatar}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-gray-900">{comment.author}</span>
                                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm">{comment.content}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                      <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-green-600 transition-colors">
                                        <ThumbsUp className="w-3 h-3" />
                                        <span>{comment.likes}</span>
                                      </button>
                                      <button 
                                        onClick={() => setReplyingTo(comment.id)}
                                        className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                                      >
                                        Reply
                                      </button>
                                    </div>
                                    
                                    {/* Nested Replies */}
                                    {comment.replies && comment.replies.length > 0 && (
                                      <div className="mt-3 ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
                                        {comment.replies.map((reply) => (
                                          <div key={reply.id} className="bg-white rounded-lg p-3">
                                            <div className="flex items-start space-x-2">
                                              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                {reply.avatar}
                                              </div>
                                              <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                  <span className="font-medium text-gray-900 text-sm">{reply.author}</span>
                                                  <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                                </div>
                                                <p className="text-gray-700 text-sm">{reply.content}</p>
                                                <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-green-600 transition-colors mt-1">
                                                  <ThumbsUp className="w-3 h-3" />
                                                  <span>{reply.likes}</span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    
                                    {/* Reply Input */}
                                    {replyingTo === comment.id && (
                                      <div className="mt-3 flex items-center space-x-2">
                                        <input
                                          type="text"
                                          placeholder="Write a reply..."
                                          value={newComment}
                                          onChange={(e) => setNewComment(e.target.value)}
                                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <button
                                          onClick={() => handleAddComment(post.id)}
                                          className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                          <Send className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => setReplyingTo(null)}
                                          className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Add Comment Input */}
                          <div className="mt-4 flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              {user.name.charAt(0)}
                            </div>
                            <div className="flex-1 flex items-center space-x-2">
                              <input
                                type="text"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                              />
                              <button
                                onClick={() => handleAddComment(post.id)}
                                disabled={!newComment.trim()}
                                className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
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

      {/* Enhanced New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
              <button
                onClick={() => setShowNewPost(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">Posting to Community Forum</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="discussion">Discussion</option>
                    <option value="question">Question</option>
                    <option value="announcement">Announcement</option>
                    <option value="success-story">Success Story</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Enter your post title..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Add Image">
                        <Image className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Attach File">
                        <Paperclip className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Add Emoji">
                        <Smile className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Tip: Use markdown for formatting
                    </div>
                  </div>
                  <textarea
                    rows={8}
                    placeholder="Share your thoughts, questions, or experiences...

You can use:
• **bold text**
• *italic text*
• [links](url)
• Lists and more!"
                    className="w-full px-3 py-3 border-0 rounded-b-lg focus:outline-none resize-none"
                  ></textarea>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="Add tags separated by commas (e.g., urban-planning, native-species, drought-resistant)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Popular tags: urban-planning, native-species, carbon-offset, community-event, drought-resistant
                </p>
              </div>
              
              {/* Post Options */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Post Options</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    <span className="text-sm text-gray-700">Allow comments</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    <span className="text-sm text-gray-700">Notify me of replies</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    <span className="text-sm text-gray-700">Featured post (requires approval)</span>
                  </label>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Post</span>
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