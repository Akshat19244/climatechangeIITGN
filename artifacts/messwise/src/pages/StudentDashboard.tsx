import { useState } from 'react';
import { Home, TrendingDown, Utensils, MessageSquare, Wallet, User, LogOut, Calendar, Star, Award, Download, Bell, Lock, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface StudentDashboardProps {
  onLogout?: () => void;
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [walletBalance, setWalletBalance] = useState(2450);
  const [dailyWastage, setDailyWastage] = useState(320);
  const [weeklyWastage, setWeeklyWastage] = useState(1850);
  const [monthlyWastage, setMonthlyWastage] = useState(7200);
  const [timeRange, setTimeRange] = useState('daily');
  const [mealReservations, setMealReservations] = useState({
    breakfast: { reserved: false, price: 50 },
    lunch: { reserved: true, price: 62 },
    snacks: { reserved: false, price: 30 },
    dinner: { reserved: false, price: 60 },
  });
  const [foodRatings, setFoodRatings] = useState({
    breakfast: [
      { item: 'Aloo Paratha', rating: 4, comment: 'Good' },
      { item: 'Butter Milk', rating: 5, comment: 'Excellent' },
    ],
    lunch: [
      { item: 'Biryani', rating: 4, comment: 'Nice' },
      { item: 'Dal', rating: 3, comment: 'Average' },
    ],
    snacks: [],
    dinner: [],
  });
  const [notificationPrefs, setNotificationPrefs] = useState({
    reservationReminder: true,
    wastageAlerts: true,
    feedbackNotifications: true,
    weeklyReport: true,
  });
  const [newRating, setNewRating] = useState(0);

  const handleMealReservation = (meal: string) => {
    const price = mealReservations[meal as keyof typeof mealReservations].price;
    if (walletBalance >= price) {
      setMealReservations(prev => ({
        ...prev,
        [meal]: { ...prev[meal as keyof typeof prev], reserved: !prev[meal as keyof typeof prev].reserved }
      }));
      if (!mealReservations[meal as keyof typeof mealReservations].reserved) {
        setWalletBalance(walletBalance - price);
      } else {
        setWalletBalance(walletBalance + price);
      }
    }
  };

  const handleDownloadReport = () => {
    const csvContent = `Date,Wastage (grams),Equivalent Meals,Cost Wasted
2024-03-25,${dailyWastage},${Math.floor(dailyWastage / 250)},₹${Math.floor(dailyWastage / 250) * 25}
2024-03-24,280,1,₹25
2024-03-23,350,1.4,₹35
2024-03-22,300,1.2,₹30`;
    
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
    element.setAttribute('download', 'wastage_report.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const wastageData = [
    { date: 'Mon', wastage: 280 },
    { date: 'Tue', wastage: 320 },
    { date: 'Wed', wastage: 250 },
    { date: 'Thu', wastage: 380 },
    { date: 'Fri', wastage: 290 },
    { date: 'Sat', wastage: 310 },
    { date: 'Sun', wastage: 320 },
  ];

  const mealsSaved = Math.floor((weeklyWastage / 250) * -1) + 12;
  const costSaved = mealsSaved * 25;
  const waterSaved = mealsSaved * 2700;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-50">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">MessWise</h1>
          <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className="w-full bg-white border-b border-emerald-100 overflow-x-auto">
        <div className="w-full flex px-6 gap-8">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'wastage', label: 'Wastage Logs', icon: TrendingDown },
            { id: 'meals', label: 'Meals', icon: Utensils },
            { id: 'feedback', label: 'Feedback', icon: Star },
            { id: 'wallet', label: 'Wallet', icon: Wallet },
            { id: 'profile', label: 'Profile', icon: User },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 flex items-center gap-2 transition ${
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-emerald-600'
                }`}
              >
                <Icon size={18} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full">
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="p-6 space-y-6">
            {/* Wallet Balance */}
            <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 mb-2">Current Balance</p>
                  <h2 className="text-4xl font-bold text-emerald-700">₹{walletBalance}</h2>
                </div>
                <Wallet className="text-emerald-600" size={32} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-600">Earned Today</p>
                  <p className="text-xl font-semibold text-green-600">₹85</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Spent</p>
                  <p className="text-xl font-semibold text-orange-600">₹1,200</p>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Impact This Week</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                  <p className="text-sm text-gray-600 mb-2">Meals Saved</p>
                  <p className="text-3xl font-bold text-emerald-700">{mealsSaved}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-2">Cost Prevented</p>
                  <p className="text-3xl font-bold text-blue-700">₹{costSaved}</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl p-6 border border-cyan-200">
                  <p className="text-sm text-gray-600 mb-2">Water Saved</p>
                  <p className="text-3xl font-bold text-cyan-700">{waterSaved}L</p>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 border border-teal-200">
                  <p className="text-sm text-gray-600 mb-2">CO₂ Offset</p>
                  <p className="text-3xl font-bold text-teal-700">2.1kg</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WASTAGE LOGS TAB */}
        {activeTab === 'wastage' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Wastage Trends</h3>
                <div className="flex gap-2">
                  {['daily', 'weekly', 'monthly'].map(range => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-2 rounded-lg transition capitalize ${
                        timeRange === range
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={wastageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="wastage" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <p className="text-sm text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-red-600">{dailyWastage}g</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-orange-600">{weeklyWastage}g</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-amber-600">{monthlyWastage}g</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MEALS TAB */}
        {activeTab === 'meals' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm">
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Current Balance</h3>
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
                  <p className="text-sm opacity-90">Available Credit</p>
                  <h2 className="text-4xl font-bold">₹{walletBalance}</h2>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-6">Select Your Meals</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(mealReservations).map(([meal, data]) => (
                  <div key={meal} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-emerald-300 transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 capitalize">{meal}</h4>
                        <p className="text-gray-600">₹{data.price}</p>
                      </div>
                      <Calendar size={24} className="text-emerald-600" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMealReservation(meal)}
                        disabled={!data.reserved && walletBalance < data.price}
                        className={`flex-1 py-3 rounded-lg font-semibold transition ${
                          data.reserved
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : walletBalance < data.price
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                        }`}
                      >
                        {data.reserved ? 'Cancel' : 'Reserve'}
                      </button>
                    </div>
                    {data.reserved && (
                      <p className="text-sm text-green-600 mt-3">✓ Reserved</p>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-6 pt-6 border-t border-gray-200">
                Balance after reservation: ₹{walletBalance}
              </p>
            </div>
          </div>
        )}

        {/* FEEDBACK TAB */}
        {activeTab === 'feedback' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Rate Your Food</h3>
              <div className="space-y-6">
                {Object.entries(foodRatings).map(([meal, items]) => (
                  <div key={meal} className="border-b border-gray-200 pb-6 last:border-0">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 capitalize">{meal}</h4>
                    {items.length === 0 ? (
                      <p className="text-gray-500 italic">No items available for rating</p>
                    ) : (
                      <div className="space-y-3">
                        {items.map((item, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-4 flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-gray-800">{item.item}</p>
                              <div className="flex gap-1 mt-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star
                                    key={star}
                                    size={16}
                                    className={star <= item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-600">{item.comment}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WALLET TAB */}
        {activeTab === 'wallet' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Wallet Details</h3>
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white">
                  <p className="text-sm opacity-90 mb-2">Total Balance</p>
                  <h2 className="text-4xl font-bold">₹{walletBalance}</h2>
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
                    <div>
                      <p className="text-sm opacity-90">Earned This Month</p>
                      <p className="text-xl font-semibold">₹850</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Spent This Month</p>
                      <p className="text-xl font-semibold">₹1,200</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Net This Month</p>
                      <p className="text-xl font-semibold">-₹350</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h4>
                <div className="space-y-3">
                  {[
                    { date: 'Today', desc: 'Lunch Reservation', amount: '-₹62', type: 'debit' },
                    { date: 'Yesterday', desc: 'Wastage Credits', amount: '+₹85', type: 'credit' },
                    { date: 'Mar 23', desc: 'Breakfast Reservation', amount: '-₹50', type: 'debit' },
                  ].map((tx, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">{tx.desc}</p>
                        <p className="text-sm text-gray-600">{tx.date}</p>
                      </div>
                      <p className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User size={20} className="text-emerald-600" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <p className="text-gray-900">Akshat Mathur</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Roll Number</label>
                    <p className="text-gray-900">22110001</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hostel</label>
                    <p className="text-gray-900">Hostel A</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <p className="text-gray-900">22110001@iitgn.ac.in</p>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Bell size={20} className="text-emerald-600" />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {Object.entries(notificationPrefs).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setNotificationPrefs(prev => ({...prev, [key]: e.target.checked}))}
                        className="w-5 h-5 text-emerald-600 rounded cursor-pointer"
                      />
                      <span className="text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Lock size={20} className="text-emerald-600" />
                  Privacy Settings
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p className="text-sm">Your personal data is securely stored and encrypted. We follow industry-standard security practices to protect your information.</p>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-gray-800">Data Protection</p>
                    <p className="text-sm text-gray-600">All personal and transaction data is protected under IITGN's privacy policy.</p>
                  </div>
                  <button className="w-full px-4 py-2 text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition font-semibold">
                    View Privacy Policy
                  </button>
                </div>
              </div>

              {/* Export Data */}
              <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Download size={20} className="text-emerald-600" />
                  Export Data
                </h3>
                <p className="text-gray-700 text-sm mb-4">Download your wastage report as CSV for analysis.</p>
                <button
                  onClick={handleDownloadReport}
                  className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
