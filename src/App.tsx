import { useState } from 'react';
import { TreePine, Coins, Trophy, Map, User, Heart, Users, BookOpen } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import Header from './components/Header';
import EnhancedDonation from './components/EnhancedDonation';
import Leaderboard from './components/Leaderboard';
import TreeMap from './components/TreeMap';
import UserProfile from './components/UserProfile';
import Marketplace from './components/Marketplace';
import CommunityForum from './components/CommunityForum';
import EducationalHub from './components/EducationalHub';

type ActiveTab = 'home' | 'donate' | 'leaderboard' | 'map' | 'profile' | 'marketplace' | 'community' | 'education';

function AppContent() {
  const { user, login, signup, logout, isLoading, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // If user is not logged in, show login form
  if (!user) {
    return <LoginForm onLogin={login} onSignup={signup} isLoading={isLoading} />;
  }

  const handleDonationComplete = (trees: number) => {
    updateUser({
      treesPlanted: user.treesPlanted + trees,
      treecoins: user.treecoins + (trees * 10),
      co2Offset: user.co2Offset + (trees * 0.0137)
    });
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: TreePine },
    { id: 'donate', label: 'Donate', icon: Heart },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'map', label: 'Tree Map', icon: Map },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'marketplace', label: 'Marketplace', icon: Coins },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'education', label: 'Learn', icon: BookOpen }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Homepage user={user} />;
      case 'donate':
        return <EnhancedDonation user={user} onDonationComplete={(_, trees) => handleDonationComplete(trees)} />;
      case 'leaderboard':
        return <Leaderboard currentUser={user} />;
      case 'map':
        return <TreeMap />;
      case 'profile':
        return <UserProfile user={user} />;
      case 'marketplace':
        return <Marketplace user={user} />;
      case 'community':
        return <CommunityForum user={user} />;
      case 'education':
        return <EducationalHub />;
      default:
        return <Homepage user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header user={user} onLogout={logout} />
      
      {/* Navigation */}
      <nav className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-1 py-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-green-600 text-white shadow-lg transform scale-105'
                      : 'text-green-700 hover:bg-green-100 hover:scale-105'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Floating Action Elements */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col space-y-3">
          {/* Treecoin Balance */}
          <div className="bg-amber-400 text-amber-900 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
            <Coins className="w-5 h-5" />
            <span className="font-bold">{user.treecoins.toLocaleString()}</span>
          </div>
          
          {/* Trees Planted */}
          <div className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
            <TreePine className="w-5 h-5" />
            <span className="font-bold">{user.treesPlanted}</span>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
