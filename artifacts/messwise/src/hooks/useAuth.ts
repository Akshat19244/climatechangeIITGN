import { useEffect, useState } from "react"
import { getAuthToken, isAuthenticated, logout as apiLogout } from "../lib/api"

export interface User {
  id: string
  rollNumber: string
  name: string
  email: string
  role: "student" | "admin" | "staff"
  walletBalance: number
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getAuthToken()
        if (token && isAuthenticated()) {
          // In a real app, you'd verify the token with the backend
          // For now, just check if token exists
          const storedUser = localStorage.getItem("user_data")
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize auth")
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = (userData: User, token: string) => {
    setUser(userData)
    localStorage.setItem("auth_token", token)
    localStorage.setItem("user_data", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    apiLogout()
    localStorage.removeItem("user_data")
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
  }
}
