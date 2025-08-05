import React from 'react';
import { TreePine, Leaf, Award, Bell, LogOut } from 'lucide-react';

interface User {
  name: string;
  treesPlanted: number;
  treecoins: number;
  co2Offset: number;
  rank: number;
  badges: string[];
}

interface HeaderProps {
  user: User;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <TreePine className="w-8 h-8 text-green-600" />
              <Leaf className="w-4 h-4 text-green-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                GHaaS4Impact
              </h1>
              <p className="text-xs text-green-600 font-medium">Green Humanity As A Service</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-6">
            {/* Impact Stats */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{user.co2Offset}t</p>
                <p className="text-xs text-gray-600">CO₂ Offset</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">#{user.rank}</p>
                <p className="text-xs text-gray-600">Global Rank</p>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
              <Bell className="w-6 h-6" />
              {/* <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span> */}
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <div className="flex items-center space-x-1">
                  <Award className="w-3 h-3 text-amber-500" />
                  <span className="text-xs text-gray-600">{user.badges[0]}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              {/* Logout Button */}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <TreePine className="w-4 h-4" />
              <span>1,247,892 Trees Planted Globally</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Leaf className="w-4 h-4" />
              <span>16,223t CO₂ Offset This Month</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;