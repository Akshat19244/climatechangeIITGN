import { useState } from "react"
import { MessageCircle, Send } from "lucide-react"
import { WASTAGE_CATEGORIES } from "../../lib/constants"
import { cn } from "../../lib/utils"

interface WastageTrackerProps {
  onSubmit?: (data: WastageData) => void
  isLoading?: boolean
}

interface WastageData {
  amount: number
  category: string
  reason: string
  mealType: string
}

export function WastageTracker({ onSubmit, isLoading = false }: WastageTrackerProps) {
  const [amount, setAmount] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [reason, setReason] = useState("")
  const [mealType, setMealType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount && selectedCategory && mealType) {
      onSubmit?.({
        amount: parseFloat(amount),
        category: selectedCategory,
        reason,
        mealType,
      })
      // Reset form
      setAmount("")
      setSelectedCategory("")
      setReason("")
      setMealType("")
    }
  }

  return (
    <div className="rounded-xl bg-background/30 backdrop-blur-sm border border-foreground/10 p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Report Wastage
        </h3>
        <p className="text-sm text-foreground/60">
          Help us track and reduce food waste. Your feedback makes a difference.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Meal Type Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Meal Type
          </label>
          <div className="flex gap-2 flex-wrap">
            {["breakfast", "lunch", "dinner"].map((meal) => (
              <button
                key={meal}
                type="button"
                onClick={() => setMealType(meal)}
                className={cn(
                  "px-4 py-2 rounded-lg border-2 transition-all duration-200 capitalize",
                  mealType === meal
                    ? "border-primary bg-primary/20 text-primary font-medium"
                    : "border-foreground/20 bg-background/20 text-foreground hover:border-primary/50"
                )}
              >
                {meal}
              </button>
            ))}
          </div>
        </div>

        {/* Wastage Amount */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Amount (grams)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 100"
            className="w-full px-4 py-2 rounded-lg border-2 border-foreground/20 bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <div className="space-y-2">
            {WASTAGE_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200",
                  selectedCategory === category.id
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-foreground/20 bg-background/20 text-foreground hover:border-primary/50"
                )}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span>{category.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <MessageCircle size={16} />
            Additional Notes (Optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Help us understand what happened..."
            rows={3}
            className="w-full px-4 py-2 rounded-lg border-2 border-foreground/20 bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!amount || !selectedCategory || !mealType || isLoading}
          className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 active:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Send size={16} />
          {isLoading ? "Submitting..." : "Report Wastage"}
        </button>
      </form>
    </div>
  )
}

export default WastageTracker
