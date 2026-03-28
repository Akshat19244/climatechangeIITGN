import { Wallet, TrendingUp, Gift } from "lucide-react"
import { formatCurrency } from "../../lib/utils"

interface WalletBalanceProps {
  balance: number
  earnedToday: number
  monthlyEarnings: number
}

export function WalletBalance({
  balance,
  earnedToday,
  monthlyEarnings,
}: WalletBalanceProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm border border-foreground/10 p-8 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-sm font-medium text-foreground/60 mb-2">Wallet Balance</p>
          <h3 className="text-4xl font-bold gradient-text mb-2">
            {formatCurrency(balance)}
          </h3>
          <p className="text-sm text-foreground/60">Available credits</p>
        </div>
        <div className="p-4 bg-primary/20 rounded-xl">
          <Wallet size={32} className="text-primary" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-accent" />
            <p className="text-xs font-medium text-foreground/60">Today&apos;s Earnings</p>
          </div>
          <p className="text-xl font-bold text-foreground">+{formatCurrency(earnedToday)}</p>
        </div>
        <div className="bg-background/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gift size={16} className="text-success" />
            <p className="text-xs font-medium text-foreground/60">This Month</p>
          </div>
          <p className="text-xl font-bold text-foreground">+{formatCurrency(monthlyEarnings)}</p>
        </div>
      </div>
    </div>
  )
}

export default WalletBalance
