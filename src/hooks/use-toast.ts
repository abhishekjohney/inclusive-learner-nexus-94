
import { toast as sonnerToast } from 'sonner';
import type * as ToastPrimitives from '@radix-ui/react-toast';

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  // Map variant to sonner's toast type property
  variant?: 'default' | 'destructive';
};

type ToastActionElement = React.ReactElement<typeof ToastPrimitives.Action>;

// Set up a consistent interface for our toast hook
export const useToast = () => {
  const toast = (props: ToastProps) => {
    // Map variant to sonner's toast type
    let toastType: 'default' | 'error' = 'default';
    
    if (props.variant === 'destructive') {
      toastType = 'error';
    }
    
    // Use the appropriate sonner toast function based on type
    if (toastType === 'error') {
      sonnerToast.error(props.title as string, {
        description: props.description as string,
        action: props.action,
      });
    } else {
      sonnerToast(props.title as string, {
        description: props.description as string,
        action: props.action,
      });
    }
  };

  return {
    toast,
    dismiss: sonnerToast.dismiss,
  };
};

// Export a standalone toast function as well
export const toast = (props: ToastProps) => {
  // Map variant to sonner's toast type
  let toastType: 'default' | 'error' = 'default';
  
  if (props.variant === 'destructive') {
    toastType = 'error';
  }
  
  // Use the appropriate sonner toast function based on type
  if (toastType === 'error') {
    sonnerToast.error(props.title as string, {
      description: props.description as string,
      action: props.action,
    });
  } else {
    sonnerToast(props.title as string, {
      description: props.description as string,
      action: props.action,
    });
  }
};
