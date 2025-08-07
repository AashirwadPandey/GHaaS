import React, { useState } from 'react';
import { Trophy, Medal, Award, Crown, Filter, Calendar, Globe, MapPin } from 'lucide-react';

interface User {
  name: string;
  treesPlanted: number;
  rank: number;
}

interface LeaderboardProps {
  currentUser: User;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentUser }) => {
  
// aba ahile lai yo ni demo data.. in future we can call it from actual leaders..
  const leaders = [
    { rank: 1, name: 'Sugam Tamang', trees: 12547, treecoins: 125470, location: 'Kathmandu', badge: 'Forest Legend', avatar: 'ST' },
    { rank: 2, name: 'Saugat Bajgain', trees: 9823, treecoins: 98230, location: 'Kavre', badge: 'Green Titan', avatar: 'SB' },
    { rank: 3, name: 'Utsav Mainali', trees: 8756, treecoins: 87560, location: 'Kavre', badge: 'Nature Guardian', avatar: 'UM' },
    { rank: 4, name: 'Aashirwad Pandey', trees: 7234, treecoins: 72340, location: 'Nuwakot', badge: 'Eco Champion', avatar: 'AP' },
    { rank: 5, name: 'Karun Karki', trees: 6891, treecoins: 68910, location: 'Bhaktapur', badge: 'Tree Warrior', avatar: 'KK' },
    { rank: 6, name: 'Sparshi Limbu', trees: 6123, treecoins: 61230, location: 'Dang', badge: 'Carbon Crusher', avatar: 'SL' },
    { rank: 7, name: 'Madhi Khadka', trees: 5847, treecoins: 58470, location: 'Bajhang', badge: 'Green Knight', avatar: 'MK' },
    { rank: 8, name: 'Bhisma Timalsina', trees: 5234, treecoins: 52340, location: 'Butwal', badge: 'Forest Sage', avatar: 'BT' },
    { rank: 9, name: 'Krishna Ale', trees: 4789, treecoins: 47890, location: 'Dharan', badge: 'Eco Warrior', avatar: 'KA' },
    { rank: 10, name: 'Kusum Karki', trees: 4567, treecoins: 45670, location: 'Jhapa', badge: 'Desert Greener', avatar: 'KK' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-6 h-6 text-green-600" />;
    }
  };

  const [timeFilter, setTimeFilter] = useState('all-time');
  const [locationFilter, setLocationFilter] = useState('global');

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300';
      default:
        return 'bg-white border-green-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Global Leaderboard
        </h1>
        <p className="text-xl text-gray-600">
          Celebrating our top environmental champions
        </p>
      </div>


      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {leaders.slice(0, 3).map((leader, index) => (
          <div
            key={leader.rank}
            className={`${getRankBg(leader.rank)} rounded-2xl p-6 text-center border-2 shadow-lg transform hover:scale-105 transition-all duration-200 ${
              index === 0 ? 'md:order-2 md:scale-110' : index === 1 ? 'md:order-1' : 'md:order-3'
            }`}
          >
            <div className="flex justify-center mb-4">
              {getRankIcon(leader.rank)}
            </div>
            
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
              {leader.avatar}
            </div>
            
            <h3 className="font-bold text-lg text-gray-900 mb-1">{leader.name}</h3>
            <div className="flex items-center justify-center space-x-1 mb-2">
              <MapPin className="w-3 h-3 text-gray-500" />
              <span className="text-sm text-gray-600">{leader.location}</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-2xl font-bold text-green-600">{leader.trees.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Trees Planted</p>
              <div className="bg-white/50 rounded-lg py-2 px-3">
                <p className="text-xs font-medium text-gray-700">{leader.badge}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Time Filter */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all-time">All Time</option>
                <option value="monthly">This Month</option>
                <option value="weekly">This Week</option>
              </select>
            </div>
            
            {/* Location Filter */}
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="global">Global</option>
                <option value="local">Local</option>
                <option value="national">National</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
          <h2 className="text-xl font-bold text-gray-900">Complete Rankings</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {leaders.map((leader) => (
            <div
              key={leader.rank}
              className="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-bold text-gray-600">
                    #{leader.rank}
                  </div>
                  
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                    {leader.avatar}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">{leader.name}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{leader.location}</span>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {leader.badge}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{leader.trees.toLocaleString()}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{leader.treecoins.toLocaleString()} coins</span>
                    <span>{(leader.trees * 0.0137).toFixed(1)}t CO₂</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Position */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 font-bold text-blue-600">
              #{currentUser.rank}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Your Position</h3>
              <p className="text-gray-600">Keep climbing the leaderboard!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{currentUser.treesPlanted}</p>
            <p className="text-sm text-gray-600">Trees planted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
