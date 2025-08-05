import React, { useState, useEffect } from 'react';
import { TreePine, Award, Users, Globe, Zap } from 'lucide-react';

interface HomepageProps {
  user: any;
}

const Homepage: React.FC<HomepageProps> = ({ user }) => {
  const [stats, setStats] = useState({
    totalTrees: 1247839,
    totalUsers: 15432,
    co2Saved: 1674.2,
    countriesReached: 47
  });

  const [recentActivities] = useState([
    { id: 1, user: 'Samriddhi M.', action: 'planted 25 trees', time: '2 minutes ago', avatar: '🌱' },
    { id: 2, user: 'Davis K.', action: 'earned Forest Guardian badge', time: '5 minutes ago', avatar: '🏆' },
    { id: 3, user: 'Eno L.', action: 'offset 2.3 tons of CO₂', time: '8 minutes ago', avatar: '🌿' },
    { id: 4, user: 'Aakriti P.', action: 'joined the community', time: '12 minutes ago', avatar: '👋' }
  ]);

  const [weeklyGoal] = useState({
    target: 50,
    current: user.treesPlanted % 50,
    streak: 7
  });

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalTrees: prev.totalTrees + Math.floor(Math.random() * 3),
        totalUsers: prev.totalUsers + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const achievements = [
    { title: 'First Tree', icon: '🌱', completed: true, description: 'Plant your first tree' },
    { title: 'Green Warrior', icon: '⚔️', completed: user.treesPlanted >= 100, description: 'Plant 100 trees' },
    { title: 'Forest Guardian', icon: '🛡️', completed: user.treesPlanted >= 500, description: 'Plant 500 trees' },
    { title: 'Earth Savior', icon: '🌍', completed: user.treesPlanted >= 1000, description: 'Plant 1000 trees' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-green-100 text-lg max-w-2xl">
                You've made an incredible impact! Your {user.treesPlanted} trees have offset {user.co2Offset} tons of CO₂. 
                Keep up the amazing work, eco-warrior!
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col items-center space-y-2">
              <div className="text-center">
                <div className="text-3xl font-bold">{user.treesPlanted}</div>
                <div className="text-green-100">Trees Planted</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white/10 rounded-full"></div>
      </div>

      {/* Quick Stats Grid */}
      <h1 className="text-xl font-bold text-gray-900">Overall Platform Stats</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-full">
              <TreePine className="w-6 h-6 text-green-600" />
            </div>
            
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalTrees.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Trees Planted</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Eco Warriors</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.co2Saved}</div>
              <div className="text-sm text-gray-600">Tons CO₂ Saved</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.countriesReached}</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Weekly Goal Progress */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Weekly Goal</h3>
              <p className="text-gray-600">Keep your streak alive!</p>
            </div>
            <div className="flex items-center space-x-2 text-orange-600">
              <Zap className="w-5 h-5" />
              <span className="font-bold">{weeklyGoal.streak} day streak</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Progress</span>
              <span className="font-bold text-green-600">{weeklyGoal.current}/{weeklyGoal.target} trees</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(weeklyGoal.current / weeklyGoal.target) * 100}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-7 gap-2 mt-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{day}</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    index < weeklyGoal.streak 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < weeklyGoal.streak ? '✓' : '○'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Live Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{activity.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium text-gray-900">{activity.user}</span>
                    <span className="text-gray-600"> {activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                achievement.completed 
                  ? 'border-green-200 bg-green-50 shadow-lg transform scale-105' 
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="text-center space-y-2">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="font-bold text-gray-900">{achievement.title}</div>
                <div className="text-xs text-gray-600">{achievement.description}</div>
                {achievement.completed && (
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Unlocked! 🎉
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Plant More Trees?</h3>
        <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
          Every tree you plant makes a difference. Join thousands of eco-warriors in our mission to reforest the planet.
        </p>
        <button className="bg-white text-emerald-600 font-bold py-3 px-8 rounded-lg hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200">
          Plant Trees Now 🌱
        </button>
      </div>
    </div>
  );
};

export default Homepage;
