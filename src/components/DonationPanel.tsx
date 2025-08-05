import React, { useState } from 'react';
import { TreePine, Coins, Leaf, Calculator, CreditCard, Heart, Zap } from 'lucide-react';

interface User {
  name: string;
  treesPlanted: number;
  treecoins: number;
  co2Offset: number;
}

interface DonationPanelProps {
  user: User;
}

const DonationPanel: React.FC<DonationPanelProps> = ({ user }) => {
  const [treeCount, setTreeCount] = useState(10);
  const [selectedPackage, setSelectedPackage] = useState('custom');

  const packages = [
    { id: 'starter', name: 'Starter Pack', trees: 5, price: 25, popular: false },
    { id: 'eco', name: 'Eco Warrior', trees: 25, price: 100, popular: true },
    { id: 'forest', name: 'Forest Guardian', trees: 100, price: 350, popular: false },
  ];

  const calculateImpact = (trees: number) => ({
    co2Offset: (trees * 0.0137).toFixed(3),
    treecoins: trees * 10,
    cost: trees * 5
  });

  const impact = calculateImpact(treeCount);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Plant Trees, Save Earth
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of eco-warriors in our mission to reforest the planet. Every tree counts, every action matters.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Donation Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <TreePine className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Make Your Impact</h2>
            </div>

            {/* Package Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Choose a Package</h3>
              <div className="grid gap-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => {
                      setSelectedPackage(pkg.id);
                      setTreeCount(pkg.trees);
                    }}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedPackage === pkg.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{pkg.name}</p>
                        <p className="text-sm text-gray-600">{pkg.trees} trees</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${pkg.price}</p>
                        <p className="text-xs text-gray-500">${(pkg.price / pkg.trees).toFixed(1)}/tree</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-3">
              <button
                onClick={() => setSelectedPackage('custom')}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedPackage === 'custom'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <p className="font-semibold text-gray-900">Custom Amount</p>
              </button>
              
              {selectedPackage === 'custom' && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Trees
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setTreeCount(Math.max(1, treeCount - 1))}
                      className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={treeCount}
                      onChange={(e) => setTreeCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 text-center text-xl font-bold py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="1"
                    />
                    <button
                      onClick={() => setTreeCount(treeCount + 1)}
                      className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Impact Calculator */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Your Impact</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-lg font-bold text-green-600">{impact.co2Offset}t</p>
                  <p className="text-xs text-gray-600">CO₂ Offset</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-lg mx-auto mb-2">
                    <Coins className="w-6 h-6 text-amber-600" />
                  </div>
                  <p className="text-lg font-bold text-amber-600">{impact.treecoins}</p>
                  <p className="text-xs text-gray-600">Treecoins</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-blue-600">{treeCount}</p>
                  <p className="text-xs text-gray-600">Trees</p>
                </div>
              </div>
            </div>

            {/* Donate Button */}
            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
              <CreditCard className="w-5 h-5" />
              <span>Donate ${impact.cost}</span>
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Impact Visualization */}
        <div className="space-y-6">
          {/* Tree Growth Animation */}
          <div className="bg-gradient-to-b from-sky-100 to-green-100 rounded-2xl p-8 h-64 relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="flex items-end space-x-2">
                {Array.from({ length: Math.min(treeCount, 20) }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-green-600 rounded-t-full animate-pulse"
                    style={{
                      width: '8px',
                      height: `${20 + (i % 5) * 10}px`,
                      animationDelay: `${i * 100}ms`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Growing Forest</h3>
              <p className="text-gray-600">Watch your impact grow with every donation</p>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TreePine className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">1 Tree</p>
                <p className="text-sm text-gray-600">Absorbs 22kg CO₂/year</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Leaf className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">1 Day</p>
                <p className="text-sm text-gray-600">To plant & verify</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Global Activity</h3>
            <div className="space-y-3">
              {[
                { name: 'Sarah M.', trees: 50, time: '2 min ago', location: 'California' },
                { name: 'Mike T.', trees: 25, time: '5 min ago', location: 'Texas' },
                { name: 'Emma L.', trees: 100, time: '12 min ago', location: 'New York' }
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <TreePine className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.name}</p>
                      <p className="text-xs text-gray-500">{activity.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{activity.trees} trees</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPanel;