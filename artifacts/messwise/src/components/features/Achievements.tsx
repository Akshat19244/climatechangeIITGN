import { Award, Lock } from "lucide-react"
import { Card } from "../ui/Card"
import { BADGES } from "../../lib/constants"

interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
  unlockedAt?: Date
  progress?: number
  progressMax?: number
}

interface AchievementsProps {
  achievements: Achievement[]
  title?: string
}

export function Achievements({
  achievements,
  title = "Achievements & Badges",
}: AchievementsProps) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length

  return (
    <Card title={title} icon={<Award size={20} />}>
      <div className="space-y-6">
        {/* Progress Summary */}
        <div className="bg-background/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Badges Unlocked
            </span>
            <span className="text-lg font-bold text-primary">
              {unlockedCount}/{totalCount}
            </span>
          </div>
          <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-lg p-4 text-center transition-all duration-300 border-2 ${
                achievement.unlocked
                  ? "bg-primary/10 border-primary/30 hover:border-primary/50"
                  : "bg-foreground/5 border-foreground/10 opacity-60"
              }`}
            >
              <div className="flex justify-center mb-3">
                {achievement.unlocked ? (
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Award size={24} className="text-primary" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                    <Lock size={24} className="text-foreground/40" />
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-foreground mb-1">
                {achievement.name}
              </h4>
              <p className="text-xs text-foreground/60 mb-3">
                {achievement.description}
              </p>

              {/* Progress Bar for Locked Achievements */}
              {!achievement.unlocked && achievement.progress !== undefined && (
                <div className="space-y-1">
                  <div className="w-full h-1 bg-foreground/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (achievement.progress / (achievement.progressMax || 100)) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-foreground/50">
                    {achievement.progress}/{achievement.progressMax}
                  </p>
                </div>
              )}

              {achievement.unlocked && achievement.unlockedAt && (
                <p className="text-xs text-success font-medium">
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm font-medium text-foreground mb-2">
            💡 Pro Tips to Unlock Badges
          </p>
          <ul className="text-xs text-foreground/70 space-y-1 list-disc list-inside">
            <li>Maintain a 7-day streak of zero wastage</li>
            <li>Save 10 meals from going to waste</li>
            <li>Rank in the top 10 campus contributors</li>
            <li>Refer 5 friends to MessWise</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}

// Mock achievement data generator
export function generateMockAchievements(): Achievement[] {
  return BADGES.map((badge, index) => ({
    id: badge.id,
    name: badge.name,
    description: badge.description,
    unlocked: index === 0, // First badge unlocked
    unlockedAt: index === 0 ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : undefined,
    progress: index > 0 ? Math.floor(Math.random() * 100) : undefined,
    progressMax: 100,
  }))
}

export default Achievements
