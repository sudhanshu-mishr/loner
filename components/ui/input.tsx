import * as React from 'react';
import { cn } from '@/lib/utils';
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => <input ref={ref} className={cn('h-11 w-full rounded-2xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-primary', className)} {...props} />);
Input.displayName = 'Input';
