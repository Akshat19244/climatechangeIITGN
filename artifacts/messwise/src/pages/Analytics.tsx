import { useState } from "react"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { Card, CardGrid } from "../components/ui/Card"
import Button from "../components/ui/Button"
import { TrendingDown, Download, Filter } from "lucide-react"

function Analytics() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")

  // Mock data
  const trendData = [
    { date: "Day 1", wastage: 0.3, target: 0.25 },
    { date: "Day 2", wastage: 0.4, target: 0.25 },
    { date: "Day 3", wastage: 0.25, target: 0.25 },
    { date: "Day 4", wastage: 0.45, target: 0.25 },
    { date: "Day 5", wastage: 0.2, target: 0.25 },
    { date: "Day 6", wastage: 0.35, target: 0.25 },
    { date: "Day 7", wastage: 0.15, target: 0.25 },
  ]

  const categoryData = [
    { name: "Too Much Served", value: 40, fill: "#EF4444" },
    { name: "Taste Preference", value: 32, fill: "#F97316" },
    { name: "Health Reasons", value: 16, fill: "#3B82F6" },
    { name: "Quality Issues", value: 8, fill: "#A855F7" },
    { name: "Other", value: 4, fill: "#6B7280" },
  ]

  const mealTypeData = [
    { meal: "Breakfast", yourWastage: 0.5, average: 0.6 },
    { meal: "Lunch", yourWastage: 1.2, average: 1.5 },
    { meal: "Dinner", yourWastage: 0.8, average: 1.0 },
  ]

  const stats = [
    { label: "Total Wastage", value: "2.5 kg", change: "-15%", positive: true },
    { label: "Average Daily", value: "0.35 kg", change: "-10%", positive: true },
    { label: "vs Campus", value: "-20%", change: "Better!", positive: true },
    { label: "This Month", value: "10.5 kg", change: "Last month 12.3 kg", positive: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-8 mb-12 flex-wrap">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                Your <span className="gradient-text">Analytics</span>
              </h1>
              <p className="text-xl text-foreground/60 max-w-2xl">
                Track your food waste reduction journey and environmental impact.
              </p>
            </div>
            <Button variant="secondary" size="lg" className="gap-2 mt-2">
              <Download size={18} />
              Export Report
            </Button>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-4 flex-wrap">
            {(["week", "month", "year"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  timeRange === range
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground/10 text-foreground hover:bg-foreground/20"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, idx) => (
              <Card key={idx}>
                <p className="text-sm font-medium text-foreground/60 mb-2">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </h3>
                <p className={`text-sm font-medium ${stat.positive ? "text-success" : "text-warning"}`}>
                  {stat.change}
                </p>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <CardGrid columns={2}>
            <Card title="Wastage Trend" icon={<TrendingDown size={20} />}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="wastage"
                    stroke="#217DC1"
                    strokeWidth={2}
                    name="Your Wastage (kg)"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#22C55E"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Wastage by Meal Type">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mealTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="meal" stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="yourWastage" fill="#217DC1" name="Your Wastage" />
                  <Bar dataKey="average" fill="#D1D5DB" name="Campus Average" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Wastage by Category">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Key Insights">
              <div className="space-y-4">
                <div className="bg-success/10 rounded-lg p-4 border border-success/20">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Great Progress!
                  </p>
                  <p className="text-sm text-foreground/70">
                    You&apos;ve reduced wastage by 15% compared to last month.
                    Keep this up!
                  </p>
                </div>
                <div className="bg-warning/10 rounded-lg p-4 border border-warning/20">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Improvement Opportunity
                  </p>
                  <p className="text-sm text-foreground/70">
                    Lunch has the highest wastage. Try taking smaller portions.
                  </p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Consistency Pays
                  </p>
                  <p className="text-sm text-foreground/70">
                    Maintain your 7-day streak to unlock exclusive badges!
                  </p>
                </div>
              </div>
            </Card>
          </CardGrid>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Analytics
