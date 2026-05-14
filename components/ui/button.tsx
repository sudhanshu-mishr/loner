import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50', { variants: { variant: { default: 'bg-primary text-primary-foreground shadow-glow hover:bg-primary/90', secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80', ghost: 'hover:bg-secondary/70', danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90', outline: 'border border-border bg-transparent hover:bg-secondary/60' }, size: { sm: 'h-9 px-4', md: 'h-11 px-5', lg: 'h-14 px-7 text-base', icon: 'size-11 p-0' } }, defaultVariants: { variant: 'default', size: 'md' } });
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => { const Comp = asChild ? Slot : 'button'; return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />; });
Button.displayName = 'Button';
export { buttonVariants };
