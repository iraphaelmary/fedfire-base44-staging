import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(pageName) {
  if (!pageName) return "/";
  // Convert "Page Name" to "/page-name"
  return `/${pageName.toLowerCase().replace(/\s+/g, "-")}`;
} 


export const isIframe = window.self !== window.top;
