import { InputHTMLAttributes } from "react"
import { cn } from "../../lib/utils"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = ({
  label,
  error,
  helperText,
  className,
  type = "text",
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border-2 border-foreground/20 bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-200",
          error && "border-warning focus:border-warning focus:ring-warning/20",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-warning font-medium">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-foreground/60">{helperText}</p>
      )}
    </div>
  )
}

export default Input
