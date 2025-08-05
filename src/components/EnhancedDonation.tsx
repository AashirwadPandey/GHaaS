import React, { useState } from 'react';
import { TreePine, Coins, CreditCard, Heart, Award, CheckCircle, Smartphone } from 'lucide-react';

interface User {
  name: string;
  treesPlanted: number;
  treecoins: number;
  co2Offset: number;
}

interface EnhancedDonationProps {
  user: User;
  onDonationComplete: (amount: number, trees: number) => void;
}

const EnhancedDonation: React.FC<EnhancedDonationProps> = ({ user, onDonationComplete }) => {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [donationData, setDonationData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const presetAmounts = [
    { amount: 15, trees: 3, popular: false },
    { amount: 25, trees: 5, popular: true },
    { amount: 50, trees: 10, popular: false },
    { amount: 100, trees: 20, popular: false },
    { amount: 250, trees: 50, popular: false },
    { amount: 500, trees: 100, popular: false }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'eSewa', name: 'eSewa', icon: Smartphone },
    { id: 'Khalti', name: 'Khalti', icon: Smartphone }
  ];

  const getCurrentAmount = () => {
    return customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  };

  const getTreeCount = () => {
    return Math.floor(getCurrentAmount() / 5);
  };

  const getImpact = () => {
    const trees = getTreeCount();
    return {
      co2Offset: (trees * 0.0137).toFixed(3),
      treecoins: trees * 10,
      monthlyOffset: (trees * 0.0137 * 12).toFixed(2)
    };
  };

  const handleDonation = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const amount = getCurrentAmount();
      const trees = getTreeCount();
      
      onDonationComplete(amount, trees);
      setShowSuccess(true);
      setIsProcessing(false);
      
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setCustomAmount('');
        setSelectedAmount(25);
        setDonationData({ name: '', email: '', message: '' });
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 text-center">
        <div className="space-y-6">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You! 🎉</h2>
            <p className="text-gray-600 text-lg">
              Your donation of ${getCurrentAmount()} will plant {getTreeCount()} trees!
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-bold text-green-800 mb-2">Your Impact:</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{getTreeCount()}</div>
                <div className="text-sm text-green-700">Trees Planted</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{getImpact().co2Offset}</div>
                <div className="text-sm text-green-700">Tons CO₂ Offset</div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            You'll receive an email confirmation shortly with your tree certificate!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Plant Trees Today
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Every tree you plant helps fight climate change and creates a better future for our planet.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Donation Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <TreePine className="w-7 h-7 text-green-600" />
            <span>Choose Your Impact</span>
          </h2>

          {/* Preset Amounts */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Amount
            </label>
            <div className="grid grid-cols-3 gap-3">
              {presetAmounts.map((preset) => (
                <button
                  key={preset.amount}
                  onClick={() => {
                    setSelectedAmount(preset.amount);
                    setCustomAmount('');
                  }}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedAmount === preset.amount && !customAmount
                      ? 'border-green-500 bg-green-50 transform scale-105'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  {preset.popular && (
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">${preset.amount}</div>
                    <div className="text-sm text-gray-600">{preset.trees} trees</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or Enter Custom Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter amount"
                min="5"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedMethod === method.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">{method.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Donor Information */}
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={donationData.name}
                onChange={(e) => setDonationData({...donationData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={donationData.email}
                onChange={(e) => setDonationData({...donationData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={donationData.message}
                onChange={(e) => setDonationData({...donationData, message: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                placeholder="Leave a message with your trees..."
              />
            </div>
          </div>

          {/* Donate Button */}
          <button
            onClick={handleDonation}
            disabled={isProcessing || getCurrentAmount() < 5}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Donation...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Donate ${getCurrentAmount().toLocaleString()} Now</span>
              </div>
            )}
          </button>
        </div>

        {/* Impact Preview */}
        <div className="space-y-6">
          {/* Impact Summary */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Your Impact Preview</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-green-400">
                <span>Trees to Plant:</span>
                <span className="text-2xl font-bold">{getTreeCount()}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-green-400">
                <span>CO₂ Offset (Annual):</span>
                <span className="text-xl font-bold">{getImpact().co2Offset} tons</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-green-400">
                <span>TreeCoins Earned:</span>
                <span className="text-xl font-bold">{getImpact().treecoins}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span>Lifetime CO₂ Impact:</span>
                <span className="text-xl font-bold">{getImpact().monthlyOffset} tons</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <h3 className="text-xl font-bold mb-4">What Your Donation Includes:</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Digital tree certificate with GPS location</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Annual progress photos of your trees</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>TreeCoins for marketplace rewards</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Tax-deductible receipt</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Access to exclusive eco-warrior community</span>
              </div>
            </div>
          </div>

          {/* Achievement Preview */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-6 h-6" />
              <h3 className="text-xl font-bold">Achievement Unlock!</h3>
            </div>
            <p>
              Planting {getTreeCount()} more trees will bring you closer to the 
              <strong> Forest Guardian</strong> badge!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDonation;
