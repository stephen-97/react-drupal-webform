import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import '@/styles/global.scss'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'react-drupal-webform demos',
  description:
    "This website showcases a few example Webforms built using the react-drupal-webform package. The forms displayed here are for demonstration purposes only and don't perform any real submission or send data to a backend.",

  openGraph: {
    title: 'react-drupal-webform demos',
    description:
      "This website showcases a few example Webforms built using the react-drupal-webform package. The forms displayed here are for demonstration purposes only and don't perform any real submission or send data to a backend.",
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'react-drupal-webform demos',
    description:
      "This website showcases a few example Webforms built using the react-drupal-webform package. The forms displayed here are for demonstration purposes only and don't perform any real submission or send data to a backend.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ height: '100%', position: 'relative' }}
    >
      <head>
        {/* ✅ Charge le SDK Google Maps AVANT le rendu des composants */}
        <Script
          id="google-maps-script"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ height: '100%', position: 'relative' }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
