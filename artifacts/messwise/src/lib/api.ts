import { API_BASE_URL } from "./constants"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  message: string
  status: number
  data?: unknown
}

/**
 * Generic fetch wrapper with error handling and auth
 */
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit & { method?: string } = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const token = localStorage.getItem("auth_token")

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw {
      message: errorData.error || "An error occurred",
      status: response.status,
      data: errorData,
    } as ApiError
  }

  return response.json()
}

/**
 * Get user data
 */
export async function getUser() {
  return apiCall("/user")
}

/**
 * Get meal preferences for a date
 */
export async function getMealPreferences(date: string) {
  return apiCall(`/meals/preferences?date=${date}`)
}

/**
 * Update meal preferences
 */
export async function updateMealPreference(
  date: string,
  mealType: string,
  attending: boolean,
  portion: string
) {
  return apiCall("/meals/preferences", {
    method: "POST",
    body: JSON.stringify({ date, mealType, attending, portion }),
  })
}

/**
 * Get analytics data
 */
export async function getAnalytics(timeRange: string) {
  return apiCall(`/analytics?range=${timeRange}`)
}

/**
 * Get wallet balance
 */
export async function getWalletBalance() {
  return apiCall("/wallet/balance")
}

/**
 * Get transaction history
 */
export async function getTransactionHistory(limit: number = 10) {
  return apiCall(`/wallet/transactions?limit=${limit}`)
}

/**
 * Get campus-wide statistics
 */
export async function getCampusStats() {
  return apiCall("/stats/campus")
}

/**
 * Get leaderboard
 */
export async function getLeaderboard(limit: number = 10) {
  return apiCall(`/leaderboard?limit=${limit}`)
}

/**
 * Login
 */
export async function login(rollNumber: string, password: string) {
  const response = await apiCall<{ token: string; user: unknown }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ rollNumber, password }),
  })

  if (response.token) {
    localStorage.setItem("auth_token", response.token)
  }

  return response
}

/**
 * Logout
 */
export function logout() {
  localStorage.removeItem("auth_token")
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("auth_token")
}

/**
 * Get auth token
 */
export function getAuthToken(): string | null {
  return localStorage.getItem("auth_token")
}
