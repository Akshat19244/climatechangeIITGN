import { useState } from "react"
import { UtensilsCrossed, CheckCircle, XCircle } from "lucide-react"
import { cn } from "../../lib/utils"

interface MealPreference {
  mealType: "breakfast" | "lunch" | "dinner"
  attending: boolean
  portion: "full" | "half" | "skip"
}

interface MealPreferencesProps {
  date: string
  preferences: MealPreference[]
  onPreferenceChange: (mealType: string, attending: boolean, portion: string) => void
  isLoading?: boolean
}

export function MealPreferences({
  date,
  preferences,
  onPreferenceChange,
  isLoading = false,
}: MealPreferencesProps) {
  const mealLabels = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
  }

  const portionOptions = [
    { value: "full", label: "Full" },
    { value: "half", label: "Half" },
    { value: "skip", label: "Skip" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <UtensilsCrossed size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Meal Preferences</h3>
          <p className="text-sm text-foreground/60">{date}</p>
        </div>
      </div>

      <div className="space-y-4">
        {(["breakfast", "lunch", "dinner"] as const).map((mealType) => {
          const pref = preferences.find((p) => p.mealType === mealType)
          const attending = pref?.attending ?? true
          const portion = pref?.portion ?? "full"

          return (
            <div
              key={mealType}
              className="rounded-xl bg-background/30 backdrop-blur-sm border border-foreground/10 p-6 hover:border-foreground/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-foreground">
                  {mealLabels[mealType]}
                </h4>
                <button
                  onClick={() =>
                    onPreferenceChange(mealType, !attending, portion)
                  }
                  disabled={isLoading}
                  className="transition-all duration-200"
                >
                  {attending ? (
                    <CheckCircle
                      size={24}
                      className="text-success hover:text-success/80"
                    />
                  ) : (
                    <XCircle
                      size={24}
                      className="text-warning hover:text-warning/80"
                    />
                  )}
                </button>
              </div>

              {attending && (
                <div className="flex flex-wrap gap-2">
                  {portionOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        onPreferenceChange(mealType, true, option.value)
                      }
                      disabled={isLoading}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                        portion === option.value
                          ? "border-primary bg-primary/20 text-primary font-medium"
                          : "border-foreground/20 bg-background/20 text-foreground hover:border-primary/50"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}

              {!attending && (
                <p className="text-sm text-foreground/60 italic">
                  Not attending this meal
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MealPreferences
