import React, { useState } from 'react';
import { TreePine, Coins, Award, Calendar, TrendingUp, Target, Share2, Download, Edit } from 'lucide-react';

interface User {
  name: string;
  treesPlanted: number;
  treecoins: number;
  co2Offset: number;
  rank: number;
  badges: string[];
  joinDate: string;
}

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const achievements = [
    { name: 'First Tree', icon: '🌱', description: 'Planted your first tree', earned: true, date: '2024-01-15' },
    { name: 'Green Warrior', icon: '⚔️', description: 'Planted 100+ trees', earned: true, date: '2024-02-10' },
    { name: 'Carbon Slayer', icon: '💨', description: 'Offset 1+ ton of CO₂', earned: true, date: '2024-02-20' },
    { name: 'Forest Guardian', icon: '🛡️', description: 'Planted 200+ trees', earned: true, date: '2024-03-01' },
    { name: 'Eco Legend', icon: '👑', description: 'Top 50 global ranking', earned: false, date: null },
    { name: 'Tree Titan', icon: '🏆', description: 'Planted 500+ trees', earned: false, date: null }
  ];

  const donationHistory = [
    { date: '2024-03-15', trees: 25, amount: 125, location: 'Shivapuri National Park', treecoins: 250 },
    { date: '2024-03-10', trees: 15, amount: 75, location: 'Nagarjun Forest', treecoins: 150 },
    { date: '2024-03-05', trees: 50, amount: 250, location: 'Gokarna Forest', treecoins: 500 },
    { date: '2024-02-28', trees: 30, amount: 150, location: 'Chabahil', treecoins: 300 },
    { date: '2024-02-20', trees: 40, amount: 200, location: 'Thali', treecoins: 400 }
  ];

  const monthlyProgress = [
    { month: 'Jan', trees: 45, co2: 0.6 },
    { month: 'Feb', trees: 78, co2: 1.1 },
    { month: 'Mar', trees: 124, co2: 1.7 }
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Edit className="w-4 h-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              {user.badges.map((badge, i) => (
                <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {badge}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-white/80">
              <Calendar className="w-4 h-4" />
              <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-3">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Download className="w-4 h-4" />
              <span>Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-green-100">
          <TreePine className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-green-600 mb-1">{user.treesPlanted}</p>
          <p className="text-gray-600 text-sm">Trees Planted</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-green-100">
          <Coins className="w-8 h-8 text-amber-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-amber-600 mb-1">{user.treecoins.toLocaleString()}</p>
          <p className="text-gray-600 text-sm">Treecoins</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-green-100">
          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-blue-600 mb-1">{user.co2Offset}t</p>
          <p className="text-gray-600 text-sm">CO₂ Offset</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-green-100">
          <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-purple-600 mb-1">#{user.rank}</p>
          <p className="text-gray-600 text-sm">Global Rank</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'history', label: 'History' },
              { id: 'goals', label: 'Goals' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Monthly Progress */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress</h3>
                <div className="grid grid-cols-3 gap-4">
                  {monthlyProgress.map((month) => (
                    <div key={month.month} className="bg-gray-50 rounded-lg p-4 text-center">
                      <h4 className="font-medium text-gray-900 mb-2">{month.month} 2024</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-2xl font-bold text-green-600">{month.trees}</p>
                          <p className="text-xs text-gray-600">Trees</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-blue-600">{month.co2}t</p>
                          <p className="text-xs text-gray-600">CO₂</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Visualization */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Visualization</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Environmental Impact</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Carbon Sequestered</span>
                          <span className="font-semibold">{(user.treesPlanted * 22).toLocaleString()}kg/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Oxygen Produced</span>
                          <span className="font-semibold">{(user.treesPlanted * 260).toLocaleString()}kg/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Air Filtered</span>
                          <span className="font-semibold">{(user.treesPlanted * 27000).toLocaleString()}m³/year</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Equivalent Impact</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cars off road</span>
                          <span className="font-semibold">{Math.floor(user.co2Offset * 0.4)} for 1 year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Home energy</span>
                          <span className="font-semibold">{Math.floor(user.co2Offset * 1.2)} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Flight offset</span>
                          <span className="font-semibold">{Math.floor(user.co2Offset * 2)} domestic flights</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Achievements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${
                          achievement.earned ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-green-600 mt-1">
                            Earned {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Donation History</h3>
              <div className="space-y-3">
                {donationHistory.map((donation, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{donation.location}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(donation.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-semibold text-green-600">{donation.trees} trees</p>
                            <p className="text-xs text-gray-500">${donation.amount}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-amber-600">+{donation.treecoins}</p>
                            <p className="text-xs text-gray-500">treecoins</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Your Goals</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Monthly Goal</h4>
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>124 / 150 trees</span>
                      <span>83%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '83%' }}></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">26 more trees to reach your March goal!</p>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Yearly Goal</h4>
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>247 / 1000 trees</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">753 more trees to reach your 2024 goal!</p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200">
                Update Goals
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;