import { useState } from "react"
import { ChevronLeft, ChevronRight, Save } from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import MealPreferences from "../components/features/MealPreferences"
import Button from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { formatDate } from "../lib/utils"

interface MealPref {
  mealType: "breakfast" | "lunch" | "dinner"
  attending: boolean
  portion: "full" | "half" | "skip"
}

function MealPreference() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [preferences, setPreferences] = useState<MealPref[]>([
    { mealType: "breakfast", attending: true, portion: "full" },
    { mealType: "lunch", attending: true, portion: "full" },
    { mealType: "dinner", attending: true, portion: "half" },
  ])
  const [isSaving, setIsSaving] = useState(false)

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const handleNextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleMealPreferenceChange = (
    mealType: string,
    attending: boolean,
    portion: string
  ) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.mealType === mealType
          ? { ...pref, attending, portion }
          : pref
      )
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Show success message (you could add a toast here)
      console.log("Preferences saved for", formatDate(currentDate), preferences)
    } finally {
      setIsSaving(false)
    }
  }

  const dateString = formatDate(currentDate)
  const isToday =
    currentDate.toDateString() === new Date().toDateString()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Plan Your <span className="gradient-text">Meals</span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl">
            Set your meal preferences in advance to reduce food waste and earn credits.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Date Selector */}
          <Card className="mb-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <button
                onClick={handlePreviousDay}
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="text-center">
                <p className="text-sm font-medium text-foreground/60 mb-1">
                  {isToday ? "Today" : "Selected Date"}
                </p>
                <h2 className="text-3xl font-bold gradient-text">{dateString}</h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToday}
                  disabled={isToday}
                  className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Today
                </button>
                <button
                  onClick={handleNextDay}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </Card>

          {/* Meal Preferences */}
          <div className="mb-8">
            <MealPreferences
              date={dateString}
              preferences={preferences}
              onPreferenceChange={handleMealPreferenceChange}
            />
          </div>

          {/* Information Box */}
          <Card className="mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How it works
                </h3>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span>
                      <strong>Set your preferences:</strong> Tell us which meals
                      you&apos;ll attend and how much you want
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0"></span>
                    <span>
                      <strong>Earn credits:</strong> Get rewarded for reducing
                      food waste
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>
                      <strong>Track impact:</strong> See how much you&apos;ve
                      contributed to sustainability
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0"></span>
                    <span>
                      <strong>Climb the leaderboard:</strong> Compete with
                      friends and win prizes
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Tips */}
          <Card title="Pro Tips" className="mb-8">
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <strong className="text-foreground">Plan ahead:</strong> Set preferences for the
                next 7 days to maximize accuracy
              </li>
              <li>
                <strong className="text-foreground">Be honest:</strong> Accurate preferences help us
                reduce waste campus-wide
              </li>
              <li>
                <strong className="text-foreground">Update when needed:</strong> You can always modify
                your preferences until 8 PM the day before
              </li>
            </ul>
          </Card>

          {/* Save Button */}
          <div className="flex items-center gap-4 justify-end">
            <Button variant="ghost" size="lg">
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              isLoading={isSaving}
              disabled={isSaving}
              className="gap-2"
            >
              <Save size={18} />
              Save Preferences
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default MealPreference
