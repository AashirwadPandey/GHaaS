import React, { useState } from 'react';
import { Coins, ShoppingCart, Award, Gift, Star, Zap, Shield, Crown, Shirt, Search, X } from 'lucide-react';

interface User {
  treecoins: number;
}

interface MarketplaceProps {
  user: User;
}

const Marketplace: React.FC<MarketplaceProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Items', icon: ShoppingCart },
    { id: 'badges', name: 'Badges', icon: Award },
    { id: 'rewards', name: 'Rewards', icon: Gift },
    { id: 'merchandise', name: 'Merchandise', icon: Shirt },
    { id: 'special', name: 'Special', icon: Crown }
  ];

  const items = [
    {
      id: 1,
      name: 'Bronze Tree Badge',
      category: 'badges',
      price: 100,
      description: 'Show your commitment to the environment',
      image: '🥉',
      tier: 'Bronze',
      available: true
    },
    {
      id: 2,
      name: 'Silver Forest Guardian',
      category: 'badges',
      price: 500,
      description: 'Exclusive silver badge for dedicated planters',
      image: '🥈',
      tier: 'Silver',
      available: true
    },
    {
      id: 3,
      name: 'Gold Eco Warrior',
      category: 'badges',
      price: 1000,
      description: 'Premium gold badge for environmental champions',
      image: '🥇',
      tier: 'Gold',
      available: true
    },
    {
      id: 4,
      name: 'Eco-Friendly Tote Bag',
      category: 'merchandise',
      price: 250,
      description: 'Sustainable hemp tote bag with GHaaS logo',
      image: '🛍️',
      tier: 'Physical',
      available: true
    },
    {
      id: 5,
      name: 'Tree Planting Kit',
      category: 'rewards',
      price: 750,
      description: 'Complete kit for planting trees at home',
      image: '🌱',
      tier: 'Physical',
      available: true
    },
    {
      id: 6,
      name: 'Carbon Neutral Certificate',
      category: 'rewards',
      price: 300,
      description: 'Official certificate for your CO₂ offset',
      image: '📜',
      tier: 'Digital',
      available: true
    },
    {
      id: 7,
      name: 'Rare Forest Spirit T-Shirt',
      category: 'merchandise',
      price: 2000,
      description: 'Limited edition animated forest spirit T-Shirt',
      image: '👕',
      tier: 'Merchandise',
      available: true
    },
    {
      id: 8,
      name: 'Ancient Tree Jacket',
      category: 'merchandise',
      price: 1500,
      description: 'Unique ancient tree artwork Jacket',
      image: '🧥',
      tier: 'Merchandise',
      available: true
    },
    {
      id: 9,
      name: 'VIP Event Access',
      category: 'special',
      price: 5000,
      description: 'Exclusive access to GHaaS environmental events',
      image: '🎟️',
      tier: 'Exclusive',
      available: false
    },
    {
      id: 10,
      name: 'Founder\'s Edition Badge',
      category: 'special',
      price: 10000,
      description: 'Ultra-rare founder\'s edition badge',
      image: '👑',
      tier: 'Legendary',
      available: false
    }
  ];

  const filteredItems = items.filter(item => {
    // Filter by category
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    
    // Filter by search query
    const searchMatch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tier.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'bronze': return 'text-amber-600 bg-amber-50';
      case 'silver': return 'text-gray-600 bg-gray-50';
      case 'gold': return 'text-yellow-600 bg-yellow-50';
      case 'nft': return 'text-purple-600 bg-purple-50';
      case 'physical': return 'text-green-600 bg-green-50';
      case 'digital': return 'text-blue-600 bg-blue-50';
      case 'exclusive': return 'text-indigo-600 bg-indigo-50';
      case 'legendary': return 'text-pink-600 bg-pink-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const addToCart = (itemId: number) => {
    setCart([...cart, itemId]);
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(id => id !== itemId));
  };

  const isInCart = (itemId: number) => cart.includes(itemId);

  const cartTotal = cart.reduce((total, itemId) => {
    const item = items.find(i => i.id === itemId);
    return total + (item?.price || 0);
  }, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Treecoin Marketplace
        </h1>
        <p className="text-xl text-gray-600">
          Redeem your treecoins for eco-friendly rewards and exclusive badges
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search items by name, description, or tier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-3 text-sm text-gray-600">
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found for "{searchQuery}"
          </p>
        )}
      </div>

      {/* Wallet Balance */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-6 text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <Coins className="w-8 h-8 text-amber-900" />
          <h2 className="text-3xl font-bold text-amber-900">{user.treecoins.toLocaleString()}</h2>
        </div>
        <p className="text-amber-800">Available Treecoins</p>
        {cart.length > 0 && (
          <div className="mt-4 bg-white/20 rounded-lg p-3">
            <p className="text-amber-900">
              Cart Total: <span className="font-bold">{cartTotal.toLocaleString()}</span> coins
            </p>
            <p className="text-sm text-amber-800">
              Remaining: <span className="font-bold">{(user.treecoins - cartTotal).toLocaleString()}</span> coins
            </p>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-200 hover:scale-105 ${
              item.available ? 'border-green-100' : 'border-gray-200 opacity-60'
            }`}
          >
            <div className="p-6">
              {/* Item Image/Icon */}
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{item.image}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(item.tier)}`}>
                  {item.tier}
                </span>
              </div>

              {/* Item Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 text-center">{item.name}</h3>
                <p className="text-gray-600 text-sm text-center">{item.description}</p>
                
                {/* Price */}
                <div className="flex items-center justify-center space-x-2">
                  <Coins className="w-5 h-5 text-amber-500" />
                  <span className="text-2xl font-bold text-amber-600">{item.price.toLocaleString()}</span>
                </div>

                {/* Action Button */}
                {item.available ? (
                  <div className="space-y-2">
                    {isInCart(item.id) ? (
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Remove from Cart</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(item.id)}
                        disabled={user.treecoins < item.price}
                        className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                          user.treecoins >= item.price
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                    
                    {user.treecoins < item.price && (
                      <p className="text-xs text-red-500 text-center">
                        Need {(item.price - user.treecoins).toLocaleString()} more coins
                      </p>
                    )}
                  </div>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Coming Soon</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shopping Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-6 bg-white rounded-2xl shadow-2xl border border-green-100 p-6 max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Shopping Cart</h3>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
              {cart.length} items
            </span>
          </div>
          
          <div className="space-y-2 mb-4">
            {cart.map((itemId, i) => {
              const item = items.find(i => i.id === itemId);
              if (!item) return null;
              
              return (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 truncate">{item.name}</span>
                  <span className="font-semibold text-amber-600">{item.price}</span>
                </div>
              );
            })}
          </div>
          
          <div className="border-t pt-3 mb-4">
            <div className="flex items-center justify-between font-bold">
              <span>Total:</span>
              <span className="text-amber-600">{cartTotal.toLocaleString()} coins</span>
            </div>
          </div>
          
          <button
            disabled={cartTotal > user.treecoins}
            className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              cartTotal <= user.treecoins
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Purchase All</span>
          </button>
        </div>
      )}

      {/* Featured Rewards */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured This Week</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🌟</div>
            <h3 className="font-semibold text-gray-900">50% Off NFTs</h3>
            <p className="text-sm text-gray-600">Limited time offer on digital collectibles</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🎁</div>
            <h3 className="font-semibold text-gray-900">Bonus Rewards</h3>
            <p className="text-sm text-gray-600">Extra treecoins with physical items</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-semibold text-gray-900">New Arrivals</h3>
            <p className="text-sm text-gray-600">Fresh items added weekly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;