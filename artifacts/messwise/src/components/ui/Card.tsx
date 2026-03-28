import { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  icon?: ReactNode
}

export const Card = ({ children, className, title, icon }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-background/40 backdrop-blur-sm border border-foreground/10 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <div className="text-primary text-xl">{icon}</div>}
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      )}
      {children}
    </div>
  )
}

interface CardGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
}

export const CardGrid = ({ children, columns = 2 }: CardGridProps) => {
  const colMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn("grid gap-6", colMap[columns])}>
      {children}
    </div>
  )
}

export default Card
