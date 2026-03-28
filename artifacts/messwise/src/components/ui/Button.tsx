import { ReactNode, ButtonHTMLAttributes } from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  children: ReactNode
}

const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/80",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80",
    ghost: "text-foreground hover:bg-foreground/10 active:bg-foreground/20",
    outline: "border-2 border-primary text-primary hover:bg-primary/10 active:bg-primary/20",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2.5 text-base gap-2",
    lg: "px-6 py-3 text-lg gap-2",
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
