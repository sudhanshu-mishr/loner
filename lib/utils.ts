import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function absoluteUrl(path = '/') { return `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}${path}`; }
export function initials(name?: string | null) { return (name ?? 'L').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(); }
