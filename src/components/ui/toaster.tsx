import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toast, dismiss } = useToast()

  return (
    <ToastProvider>
      {/* Toaster implementation simplified - uses sonner directly */}
      <ToastViewport />
    </ToastProvider>
  )
}
