// Meal types
export const MEAL_TYPES = ["breakfast", "lunch", "dinner"] as const
export type MealType = (typeof MEAL_TYPES)[number]

// Portion sizes
export const PORTION_SIZES = ["full", "half", "skip"] as const
export type PortionSize = (typeof PORTION_SIZES)[number]

// User roles
export const USER_ROLES = ["student", "admin", "staff"] as const
export type UserRole = (typeof USER_ROLES)[number]

// API endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

// Analytics time ranges
export const TIME_RANGES = [
  { value: "day", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
] as const

// Wastage categories
export const WASTAGE_CATEGORIES = [
  { id: "too-much", label: "Served Too Much", color: "rgb(239, 68, 68)" },
  { id: "taste", label: "Taste Preference", color: "rgb(249, 115, 22)" },
  { id: "health", label: "Health Reasons", color: "rgb(59, 130, 246)" },
  { id: "quality", label: "Quality Issues", color: "rgb(168, 85, 247)" },
  { id: "other", label: "Other", color: "rgb(107, 114, 128)" },
] as const

// Impact metrics
export const IMPACT_METRICS = {
  mealsPerKG: 2.5,
  costPerKG: 150,
  caloriesPerKG: 2000,
  waterUsagePerKG: 2700, // liters
}

// Wallet credit rules
export const CREDIT_RULES = {
  noWastageBonus: 10,
  participationPoints: 5,
  referralBonus: 50,
  dailyStreak: 25,
}

// Student achievements/badges
export const BADGES = [
  { id: "first-step", name: "First Step", description: "Record your first meal preference" },
  { id: "zero-waste-day", name: "Zero Waste Day", description: "Go a full day without food waste" },
  { id: "eco-warrior", name: "Eco Warrior", description: "Save 10 meals from wastage" },
  { id: "leader", name: "Campus Leader", description: "Rank in top 10 students for lowest waste" },
  { id: "mentor", name: "Mentor", description: "Refer 5 students to MessWise" },
]

// Email templates
export const EMAIL_TEMPLATES = {
  welcome: "welcome",
  weeklyReport: "weekly_report",
  achievement: "achievement",
  reminder: "reminder",
}
