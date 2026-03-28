import { useState, useEffect } from "react"

export interface WastageData {
  date: string
  amount: number
  category: string
  mealType: string
}

export interface AnalyticsData {
  totalWastage: number
  averageDailyWastage: number
  trend: Array<{ date: string; amount: number }>
  byCategory: Array<{ category: string; amount: number }>
  comparisonWithAverage: number
  mealsWasted: number
  costOfWastage: number
  waterWasted: number
}

export function useAnalytics(timeRange: "day" | "week" | "month" | "year" = "month") {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Mock data - replace with actual API call
        const mockData: AnalyticsData = {
          totalWastage: 2.5,
          averageDailyWastage: 0.35,
          trend: [
            { date: "Mon", amount: 0.3 },
            { date: "Tue", amount: 0.4 },
            { date: "Wed", amount: 0.25 },
            { date: "Thu", amount: 0.45 },
            { date: "Fri", amount: 0.2 },
            { date: "Sat", amount: 0.35 },
            { date: "Sun", amount: 0.5 },
          ],
          byCategory: [
            { category: "Too Much", amount: 1.0 },
            { category: "Taste", amount: 0.8 },
            { category: "Health", amount: 0.4 },
            { category: "Quality", amount: 0.2 },
            { category: "Other", amount: 0.1 },
          ],
          comparisonWithAverage: -15,
          mealsWasted: 6,
          costOfWastage: 375,
          waterWasted: 6750,
        }

        setData(mockData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch analytics")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeRange])

  return { data, isLoading, error }
}
