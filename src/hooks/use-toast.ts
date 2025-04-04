
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import type * as ToastPrimitives from '@radix-ui/react-toast';

import { toast as sonner } from 'sonner';

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

type ToastActionElement = React.ReactElement<typeof ToastPrimitives.Action>;

type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: 'default' | 'destructive';
};

const ToastContext = createContext<{
  toasts: Toast[];
  toast: (props: ToastProps) => void;
  dismiss: (toastId?: string) => void;
}>({
  toasts: [],
  toast: () => {},
  dismiss: () => {},
});

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    const toast = (props: ToastProps) => {
      sonner({
        ...props,
      });
    };

    return {
      toast,
      dismiss: sonner.dismiss,
    };
  }

  return context;
};

export const toast = (props: ToastProps) => {
  sonner({
    ...props,
  });
};
