import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-Us", {
    style: 'currency',
    currency: 'USD',
  })
  return formatter.format(price)
}

export function constructMetadata({
  title = 'CaseCobra - custom high-quality phone cases',
  description = 'Create custom high-quality phone cases in seconds',
  image = '/favicon.ico',
  icons = '/favicon.ico',
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@aragas1245@gmail.com',
    },
    icons,
    metadataBase: new URL("https://case-cobra-official.vercel.app")
  }
}