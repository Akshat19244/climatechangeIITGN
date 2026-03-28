import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { Card, CardGrid } from "../components/ui/Card"
import { Users, TrendingUp, Award, AlertCircle } from "lucide-react"

function AdminDashboard() {
  // Mock data
  const campusStats = [
    { label: "Total Students", value: "1,247", icon: Users, color: "text-primary" },
    { label: "Avg Wastage (kg)", value: "0.42", icon: TrendingUp, color: "text-warning" },
    { label: "Total Saved (kg)", value: "523", icon: Award, color: "text-success" },
    { label: "Active Today", value: "847", icon: AlertCircle, color: "text-accent" },
  ]

  const wastageData = [
    { day: "Mon", wastage: 420, target: 350 },
    { day: "Tue", wastage: 380, target: 350 },
    { day: "Wed", wastage: 340, target: 350 },
    { day: "Thu", wastage: 450, target: 350 },
    { day: "Fri", wastage: 310, target: 350 },
    { day: "Sat", wastage: 390, target: 350 },
    { day: "Sun", wastage: 440, target: 350 },
  ]

  const topStudents = [
    { rank: 1, name: "Aisha Patel", rollNo: "22110045", reduction: "42%", credits: 580 },
    { rank: 2, name: "Rohan Kumar", rollNo: "22110089", reduction: "38%", credits: 520 },
    { rank: 3, name: "Priya Singh", rollNo: "22110123", reduction: "35%", credits: 480 },
    { rank: 4, name: "Vikram Shah", rollNo: "22110167", reduction: "32%", credits: 440 },
    { rank: 5, name: "Sneha Desai", rollNo: "22110201", reduction: "30%", credits: 410 },
  ]

  const systemMetrics = [
    { metric: "API Response Time", value: "45ms", status: "healthy" },
    { metric: "System Uptime", value: "99.8%", status: "healthy" },
    { metric: "Active Sessions", value: "234", status: "healthy" },
    { metric: "Database Load", value: "35%", status: "healthy" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Campus <span className="gradient-text">Overview</span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl">
            Monitor campus-wide food waste reduction efforts and student engagement.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {campusStats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <Card key={idx}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-foreground/60 mb-1">
                        {stat.label}
                      </p>
                      <h3 className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </h3>
                    </div>
                    <Icon size={24} className={stat.color} />
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Charts */}
          <CardGrid columns={2}>
            <Card title="Weekly Campus Wastage">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={wastageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="wastage" fill="#B93D3D" name="Actual (kg)" />
                  <Bar dataKey="target" fill="#22C55E" name="Target (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Trend Analysis">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={wastageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(0,0,0,0.5)" />
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
                    name="Actual (kg)"
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
          </CardGrid>

          {/* Top Students Leaderboard */}
          <div className="mt-12">
            <Card title="Top Contributors" icon={<Award size={20} />}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-foreground/10">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Rank</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Roll No</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Reduction</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topStudents.map((student) => (
                      <tr
                        key={student.rank}
                        className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold">
                            {student.rank}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-foreground">
                          {student.name}
                        </td>
                        <td className="py-3 px-4 text-foreground/60 text-sm">
                          {student.rollNo}
                        </td>
                        <td className="py-3 px-4 text-success font-medium">
                          {student.reduction}
                        </td>
                        <td className="py-3 px-4 text-accent font-medium">
                          {student.credits}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* System Metrics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="System Health">
              <div className="space-y-4">
                {systemMetrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {metric.metric}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {metric.status === "healthy" ? "✓ Healthy" : "⚠ Warning"}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-primary">{metric.value}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Quick Actions">
              <div className="space-y-3">
                <button className="w-full px-4 py-2 rounded-lg bg-primary/20 text-primary font-medium hover:bg-primary/30 transition-colors text-sm">
                  View All Students
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-secondary/20 text-secondary font-medium hover:bg-secondary/30 transition-colors text-sm">
                  Download Report
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-accent/20 text-accent font-medium hover:bg-accent/30 transition-colors text-sm">
                  System Settings
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-warning/20 text-warning font-medium hover:bg-warning/30 transition-colors text-sm">
                  Send Announcement
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AdminDashboard
