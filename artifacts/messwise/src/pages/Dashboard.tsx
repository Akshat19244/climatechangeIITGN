import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useAnalytics } from "../hooks/useAnalytics"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { Card, CardGrid } from "../components/ui/Card"
import WalletBalance from "../components/features/WalletBalance"
import ImpactIndicator from "../components/features/ImpactIndicator"
import MealPreferences from "../components/features/MealPreferences"
import Button from "../components/ui/Button"
import {
  TrendingUp,
  Calendar,
  Zap,
  Target,
  ArrowRight,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts"

function Dashboard() {
  const { user } = useAuth()
  const { data: analytics } = useAnalytics("week")
  const [mealPrefs, setMealPrefs] = useState([
    { mealType: "breakfast", attending: true, portion: "full" },
    { mealType: "lunch", attending: true, portion: "half" },
    { mealType: "dinner", attending: false, portion: "skip" },
  ])
  const [selectedDate] = useState(new Date().toLocaleDateString())

  const handleMealPreferenceChange = (
    mealType: string,
    attending: boolean,
    portion: string
  ) => {
    setMealPrefs((prev) =>
      prev.map((pref) =>
        pref.mealType === mealType
          ? { ...pref, attending, portion }
          : pref
      )
    )
  }

  // Calculate metrics
  const stats = [
    {
      icon: TrendingUp,
      label: "Reduction",
      value: "15%",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Calendar,
      label: "Streak",
      value: "7 days",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Zap,
      label: "Credits Earned",
      value: "145",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Target,
      label: "Rank",
      value: "#42",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Welcome back,{" "}
              <span className="gradient-text">{user?.name}</span>
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl">
              You&apos;re making a real difference in reducing campus food waste.
              Keep it up and inspire others!
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div
                  key={idx}
                  className={`rounded-xl ${stat.bgColor} backdrop-blur-sm border border-foreground/10 p-4 hover:border-foreground/20 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-medium text-foreground/60 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <Icon size={20} className={stat.color} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Wallet & Impact Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <WalletBalance
                balance={user?.walletBalance || 250}
                earnedToday={35}
                monthlyEarnings={840}
              />
            </div>
            <div className="lg:col-span-2">
              <ImpactIndicator
                mealsSaved={12}
                costSaved={1800}
                waterSaved={32400}
                caloriesSaved={24000}
              />
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Weekly Trend" icon={<TrendingUp size={20} />}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics?.trend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#217DC1"
                    strokeWidth={2}
                    dot={{ fill: "#217DC1", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Wastage by Category" icon={<Target size={20} />}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.byCategory || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="category" stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="amount" fill="#B93D3D" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Meal Preferences & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MealPreferences
                date={selectedDate}
                preferences={mealPrefs}
                onPreferenceChange={handleMealPreferenceChange}
              />
            </div>

            <div className="space-y-4">
              <Card title="Quick Actions" icon={<Zap size={20} />}>
                <div className="space-y-3">
                  <Button variant="secondary" size="sm" className="w-full justify-between">
                    View Analytics <ArrowRight size={16} />
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full justify-between">
                    Leaderboard <ArrowRight size={16} />
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full justify-between">
                    Achievements <ArrowRight size={16} />
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full justify-between">
                    Refer Friends <ArrowRight size={16} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Dashboard
