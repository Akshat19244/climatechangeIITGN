import { useEffect, useState } from "react"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { cn } from "../../lib/utils"

export type ToastType = "success" | "error" | "info" | "warning"

export interface ToastProps {
  id: string
  message: string
  type?: ToastType
  duration?: number
  onClose?: (id: string) => void
}

export const Toast = ({
  id,
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, id, onClose])

  if (!isVisible) return null

  const styles = {
    success: {
      bg: "bg-success/10",
      border: "border-success/30",
      text: "text-success",
      icon: CheckCircle,
    },
    error: {
      bg: "bg-warning/10",
      border: "border-warning/30",
      text: "text-warning",
      icon: AlertCircle,
    },
    info: {
      bg: "bg-primary/10",
      border: "border-primary/30",
      text: "text-primary",
      icon: Info,
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning/30",
      text: "text-warning",
      icon: AlertCircle,
    },
  }

  const style = styles[type]
  const Icon = style.icon

  return (
    <div
      className={cn(
        "rounded-lg border-2 p-4 flex items-start gap-3 animate-in slide-in-from-top fade-in duration-200",
        style.bg,
        style.border
      )}
    >
      <Icon size={20} className={cn("flex-shrink-0 mt-0.5", style.text)} />
      <p className="flex-1 text-sm font-medium text-foreground">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          onClose?.(id)
        }}
        className="flex-shrink-0 p-1 hover:bg-foreground/10 rounded transition-colors"
      >
        <X size={16} className="text-foreground/60" />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastProps[]
  onRemove: (id: string) => void
}

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={onRemove} />
        </div>
      ))}
    </div>
  )
}

// Custom hook for using toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (
    message: string,
    type: ToastType = "info",
    duration = 3000
  ) => {
    const id = Date.now().toString()
    setToasts((prev) => [
      ...prev,
      { id, message, type, duration, onClose: removeToast },
    ])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return { toasts, addToast, removeToast }
}

export default Toast
