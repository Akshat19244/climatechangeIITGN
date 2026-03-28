import { Users, DollarSign, Droplets, Activity } from "lucide-react"
import { formatNumber, formatCurrency } from "../../lib/utils"

interface ImpactIndicatorProps {
  mealsSaved: number
  costSaved: number
  waterSaved: number
  caloriesSaved: number
}

export function ImpactIndicator({
  mealsSaved,
  costSaved,
  waterSaved,
  caloriesSaved,
}: ImpactIndicatorProps) {
  const impacts = [
    {
      icon: Users,
      label: "Meals Saved",
      value: formatNumber(mealsSaved),
      color: "text-success",
      bgColor: "bg-success/10",
      subtext: "potential meals from waste",
    },
    {
      icon: DollarSign,
      label: "Cost Saved",
      value: formatCurrency(costSaved),
      color: "text-accent",
      bgColor: "bg-accent/10",
      subtext: "economic value preserved",
    },
    {
      icon: Droplets,
      label: "Water Saved",
      value: formatNumber(waterSaved),
      color: "text-primary",
      bgColor: "bg-primary/10",
      subtext: "liters of water conserved",
    },
    {
      icon: Activity,
      label: "Calories Saved",
      value: formatNumber(caloriesSaved),
      color: "text-warning",
      bgColor: "bg-warning/10",
      subtext: "kcal of nutrition preserved",
    },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Your Impact</h3>
        <p className="text-sm text-foreground/60">
          Real-world positive change from reducing food waste
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {impacts.map((impact) => {
          const Icon = impact.icon
          return (
            <div
              key={impact.label}
              className={`rounded-xl ${impact.bgColor} backdrop-blur-sm border border-foreground/10 p-6 hover:border-foreground/20 transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-foreground/60 mb-1">
                    {impact.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {impact.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${impact.bgColor}`}>
                  <Icon size={24} className={impact.color} />
                </div>
              </div>
              <p className="text-xs text-foreground/50">{impact.subtext}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImpactIndicator
