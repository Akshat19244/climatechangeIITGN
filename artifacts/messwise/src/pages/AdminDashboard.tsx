import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LogOut, TrendingUp, Users, Utensils, Calendar, Settings, Bell, MessageSquare, Plus, Edit, Trash2 } from 'lucide-react';

interface AdminDashboardProps {
  onLogout?: () => void;
}

const hostels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [menuItems, setMenuItems] = useState({
    breakfast: [
      { id: 1, name: 'Aloo Paratha', rating: 4.2 },
      { id: 2, name: 'Butter Milk', rating: 4.5 },
    ],
    lunch: [
      { id: 3, name: 'Biryani', rating: 4.3 },
      { id: 4, name: 'Dal Fry', rating: 3.8 },
    ],
    dinner: [
      { id: 5, name: 'Roti', rating: 4.0 },
      { id: 6, name: 'Paneer Curry', rating: 4.4 },
    ],
  });
  const [newItemName, setNewItemName] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'feedback', message: 'Students giving positive feedback on Biryani', timestamp: 'Today' },
    { id: 2, type: 'feedback', message: '⭐⭐⭐⭐⭐ Amazing Butter Milk!', timestamp: '2 hours ago' },
    { id: 3, type: 'wastage', message: 'High wastage detected in Dinner', timestamp: '4 hours ago' },
  ]);
  const [studentAnalyticsData] = useState([
    { name: 'Akshat Mathur', wastage: 2100, rank: 1, hostel: 'A' },
    { name: 'Priya Singh', wastage: 1800, rank: 2, hostel: 'B' },
    { name: 'Rohit Patel', wastage: 2300, rank: 3, hostel: 'C' },
    { name: 'Neha Verma', wastage: 1600, rank: 4, hostel: 'D' },
    { name: 'Arjun Reddy', wastage: 2500, rank: 5, hostel: 'E' },
  ]);

  const trendData = [
    { date: 'Mon', wastage: 2400 },
    { date: 'Tue', wastage: 2210 },
    { date: 'Wed', wastage: 2290 },
    { date: 'Thu', wastage: 2000 },
    { date: 'Fri', wastage: 2181 },
    { date: 'Sat', wastage: 2500 },
    { date: 'Sun', wastage: 2100 },
  ];

  const reservationData = [
    { meal: 'Breakfast', students: 245, prepared: 280, wastage: 35 },
    { meal: 'Lunch', students: 380, prepared: 420, wastage: 40 },
    { meal: 'Snacks', students: 150, prepared: 180, wastage: 30 },
    { meal: 'Dinner', students: 320, prepared: 360, wastage: 40 },
  ];

  const handleAddMenuItem = () => {
    if (newItemName.trim()) {
      const newId = Math.max(...Object.values(menuItems).flat().map(item => item.id)) + 1;
      setMenuItems(prev => ({
        ...prev,
        [selectedMeal]: [...prev[selectedMeal as keyof typeof prev], { id: newId, name: newItemName, rating: 0 }]
      }));
      setNewItemName('');
    }
  };

  const handleDeleteMenuItem = (mealType: string, itemId: number) => {
    setMenuItems(prev => ({
      ...prev,
      [mealType]: prev[mealType as keyof typeof prev].filter(item => item.id !== itemId)
    }));
  };

  const handleExportStudentAnalytics = () => {
    const csvContent = `Student Name,Wastage (grams),Rank,Hostel
${studentAnalyticsData.map(s => `${s.name},${s.wastage},${s.rank},${s.hostel}`).join('\n')}`;
    
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
    element.setAttribute('download', 'student_analytics.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-50">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">MessWise Admin</h1>
          <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="w-full bg-white border-b border-blue-100 overflow-x-auto">
        <div className="w-full flex px-6 gap-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'analytics', label: 'Student Analytics', icon: Users },
            { id: 'menu', label: 'Menu', icon: Utensils },
            { id: 'reservations', label: 'Reservations', icon: Calendar },
            { id: 'feedback', label: 'Feedback', icon: MessageSquare },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 flex items-center gap-2 transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon size={18} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="w-full">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="p-6 space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Wastage', value: '15.2 kg', color: 'from-red-500 to-red-600' },
                { label: 'Avg per Student', value: '2.1 kg', color: 'from-orange-500 to-orange-600' },
                { label: 'Active Students', value: '1,240', color: 'from-blue-500 to-blue-600' },
                { label: 'Meals Served Today', value: '3,845', color: 'from-green-500 to-green-600' },
              ].map((stat, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}>
                  <p className="text-sm opacity-90 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Wastage Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="wastage" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Meal Reservations</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reservationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="meal" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#3b82f6" />
                    <Bar dataKey="prepared" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* STUDENT ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Student Wastage Rankings</h3>
                <button
                  onClick={handleExportStudentAnalytics}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-800">Rank</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-800">Student Name</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-800">Wastage (g)</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-800">Hostel</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-800">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentAnalyticsData.map((student) => (
                      <tr key={student.rank} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-4 px-4">
                          <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full">#{student.rank}</span>
                        </td>
                        <td className="py-4 px-4 text-gray-900">{student.name}</td>
                        <td className="py-4 px-4 text-gray-900 font-semibold">{student.wastage}g</td>
                        <td className="py-4 px-4">
                          <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold">Hostel {student.hostel}</span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-blue-600 hover:text-blue-800 font-semibold">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MENU TAB */}
        {activeTab === 'menu' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Manage Daily Menu</h3>

              {/* Add New Item */}
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Add Food Item</h4>
                <div className="flex flex-col md:flex-row gap-4">
                  <select
                    value={selectedMeal}
                    onChange={(e) => setSelectedMeal(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddMenuItem()}
                    placeholder="Enter food item name"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleAddMenuItem}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Add Item
                  </button>
                </div>
              </div>

              {/* Menu Items by Meal Type */}
              <div className="space-y-6">
                {Object.entries(menuItems).map(([mealType, items]) => (
                  <div key={mealType}>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 capitalize border-b border-gray-200 pb-3">{mealType}</h4>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">Rating: {item.rating} ⭐</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition">
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteMenuItem(mealType, item.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RESERVATIONS TAB */}
        {activeTab === 'reservations' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Meal Reservations by Hostel</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {hostels.map((hostel) => (
                  <div key={hostel} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200 hover:shadow-lg transition">
                    <h4 className="text-2xl font-bold text-teal-700 mb-4">Hostel {hostel}</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>Breakfast: <span className="font-semibold">32</span></div>
                      <div>Lunch: <span className="font-semibold">48</span></div>
                      <div>Snacks: <span className="font-semibold">18</span></div>
                      <div>Dinner: <span className="font-semibold">42</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FEEDBACK TAB */}
        {activeTab === 'feedback' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Food Feedback Analysis</h3>
              <div className="space-y-4">
                {[
                  { item: 'Biryani', rating: 4.3, feedbackCount: 48, sentiment: 'Positive' },
                  { item: 'Aloo Paratha', rating: 4.2, feedbackCount: 35, sentiment: 'Positive' },
                  { item: 'Dal Fry', rating: 3.8, feedbackCount: 28, sentiment: 'Mixed' },
                  { item: 'Paneer Curry', rating: 4.4, feedbackCount: 42, sentiment: 'Positive' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.item}</h4>
                        <p className="text-sm text-gray-600">{item.feedbackCount} feedback responses</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-500">{item.rating} ⭐</p>
                        <p className={`text-sm font-semibold ${item.sentiment === 'Positive' ? 'text-green-600' : 'text-orange-600'}`}>
                          {item.sentiment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">System Notifications</h3>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-4 rounded-lg border-l-4 ${
                    notif.type === 'feedback'
                      ? 'bg-blue-50 border-blue-400'
                      : 'bg-red-50 border-red-400'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{notif.message}</p>
                        <p className="text-sm text-gray-600 mt-1">{notif.timestamp}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">×</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Admin Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">System Configuration</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Meal Cutoff Time</label>
                      <input type="time" defaultValue="21:00" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cost per Meal (₹)</label>
                      <input type="number" defaultValue="55" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Wastage Alert Threshold (kg)</label>
                      <input type="number" defaultValue="10" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Email Notifications</h4>
                  <div className="space-y-3">
                    {[
                      'Daily Wastage Report',
                      'High Wastage Alert',
                      'Reservation Summary',
                      'Feedback Digest'
                    ].map((notif, idx) => (
                      <label key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-gray-700">{notif}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
