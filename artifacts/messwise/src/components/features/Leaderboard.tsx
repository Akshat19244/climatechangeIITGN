import { Trophy, Award, Star } from "lucide-react"
import { Card } from "../ui/Card"

interface LeaderboardEntry {
  rank: number
  name: string
  rollNumber: string
  reduction: number
  credits: number
  badge?: "gold" | "silver" | "bronze"
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  currentUserRank?: number
  title?: string
}

export function Leaderboard({
  entries,
  currentUserRank,
  title = "Campus Leaderboard",
}: LeaderboardProps) {
  const getBadgeIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={20} className="text-yellow-500" />
    if (rank === 2) return <Award size={20} className="text-gray-400" />
    if (rank === 3) return <Award size={20} className="text-orange-600" />
    return null
  }

  return (
    <Card title={title} icon={<Trophy size={20} />}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-foreground/10">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Rank</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Roll No</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">Reduction</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">Credits</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.rank}
                className={cn(
                  "border-b border-foreground/5 hover:bg-foreground/5 transition-colors",
                  currentUserRank === entry.rank && "bg-primary/10 border-primary/30"
                )}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {getBadgeIcon(entry.rank) || (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-sm">
                        {entry.rank}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-foreground">{entry.name}</div>
                </td>
                <td className="py-3 px-4 text-foreground/60 text-sm">
                  {entry.rollNumber}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-success font-medium">{entry.reduction}%</span>
                    <Star size={14} className="text-success" />
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="text-accent font-bold">{entry.credits}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentUserRank && currentUserRank > entries.length && (
        <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-sm text-foreground/80">
            You are currently ranked <span className="font-bold text-accent">#{currentUserRank}</span> on campus. Keep reducing wastage to climb higher!
          </p>
        </div>
      )}
    </Card>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

export default Leaderboard
