import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function runtimeSecondsToHours(runtimeSeconds: number) {
  // expected format 3h 30m
  const hours = Math.floor(runtimeSeconds / 3600)
  const minutes = Math.floor((runtimeSeconds % 3600) / 60)
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`
}

export function formatCurrency(amount: number) {
  // format but dont convert, all the values will saved and mantained as USA Dólar
  // we need keep only 5 numbers on view, check this example $332.99M
  const absAmount = Math.abs(amount)

  // Billions: $XXX.XXB
  if (absAmount >= 1_000_000_000) {
    const billions = amount / 1_000_000_000
    return `$${billions.toFixed(2)}B`
  }

  // Millions: $XXX.XXM (example: $332.99M which shows 5 digits: 33299)
  if (absAmount >= 1_000_000) {
    const millions = amount / 1_000_000
    return `$${millions.toFixed(2)}M`
  }

  // Thousands: $XXX.XXK
  if (absAmount >= 1_000) {
    const thousands = amount / 1_000
    return `$${thousands.toFixed(2)}K`
  }

  // Regular format: $XXXX.XX
  return `$${amount.toFixed(2)}`
}

export function getEmbedUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    const videoId = urlObj.searchParams.get('v')

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }

    return url
  } catch {
    return url
  }
}
