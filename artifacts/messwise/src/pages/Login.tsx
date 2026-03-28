import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Lock, User, Leaf } from "lucide-react"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [rollNumber, setRollNumber] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Mock authentication - replace with actual API call
      if (rollNumber && password) {
        const mockUser = {
          id: "user123",
          rollNumber,
          name: rollNumber.toUpperCase(),
          email: `${rollNumber}@iitgn.ac.in`,
          role: rollNumber === "admin" ? "admin" : "student",
          walletBalance: 250,
        }

        login(mockUser, "mock-jwt-token-" + Date.now())

        // Navigate based on role
        if (mockUser.role === "admin") {
          navigate("/admin")
        } else {
          navigate("/dashboard")
        }
      } else {
        setError("Please fill in all fields")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
              <Leaf size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">MessWise</h1>
              <p className="text-white/80 text-sm">Reduce Food Waste</p>
            </div>
          </div>
          <p className="text-white/60 text-sm mt-2">
            Making sustainability tasty at IIT Gandhinagar
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Roll Number Field */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-3">
                <User size={18} />
                Roll Number
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="e.g., 22110001"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200 backdrop-blur-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-3">
                <Lock size={18} />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200 backdrop-blur-sm"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-warning/20 border border-warning/30 rounded-lg p-3 text-warning text-sm">
                {error}
              </div>
            )}

            {/* Demo Credentials */}
            <div className="bg-white/10 rounded-lg p-4 text-white/80 text-sm space-y-1">
              <p className="font-medium text-white">Demo Credentials:</p>
              <p>Student: Roll Number: 22110001 | Password: password</p>
              <p>Admin: Roll Number: admin | Password: password</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              disabled={isLoading}
              className="w-full bg-white text-primary hover:bg-white/90"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/60 text-sm">
            <p>Protected by MessWise Security</p>
            <p className="text-xs mt-2">
              Only registered IIT Gandhinagar students can access this platform
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
