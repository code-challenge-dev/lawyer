import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resizeTextarea(this: HTMLTextAreaElement) {
  this.style.height = 'auto'
  this.style.height = `${this.scrollHeight}px`
}
