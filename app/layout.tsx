import type { Metadata } from 'next'
import { IBM_Plex_Mono, Manrope } from 'next/font/google'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Racan AI - AI-Powered Fashion Assistant & Ecommerce Platform',
  description: 'Transform your style with Racan AI - the revolutionary AI-powered fashion assistant and ecommerce platform. Get personalized outfit recommendations and discover your perfect fashion identity.',
  keywords: 'AI fashion assistant, fashion AI, personalized styling, smart wardrobe, fashion ecommerce, outfit recommendations, style AI, fashion technology, virtual stylist, AI shopping assistant',
  authors: [{ name: 'Racan AI Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Racan AI - AI-Powered Fashion Assistant & Ecommerce Platform',
    description: 'Transform your style with Racan AI - the revolutionary AI-powered fashion assistant and ecommerce platform.',
    images: ['https://racan-ai.vercel.app/logo.png'],
    url: 'https://racan-ai.vercel.app/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Racan AI - AI-Powered Fashion Assistant & Ecommerce Platform',
    description: 'Transform your style with Racan AI - the revolutionary AI-powered fashion assistant and ecommerce platform.',
    images: ['https://racan-ai.vercel.app/logo.png'],
  },
  alternates: {
    canonical: 'https://racan-ai.vercel.app/',
  },
  verification: {
    google: 'idEK5DNafLXYI0y7gkPWM2qOUJW_0cvHKtbMmJdADU0',
  },
  icons: {
    icon: 'https://i.postimg.cc/50B939gH/Logo.png',
    shortcut: 'https://i.postimg.cc/50B939gH/Logo.png',
    apple: 'https://i.postimg.cc/50B939gH/Logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${manrope.variable}`}>
      <head>
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.postimg.cc" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//i.postimg.cc" />
        <link rel="dns-prefetch" href="//images.pexels.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Racan AI",
              "url": "https://racan-ai.vercel.app",
              "logo": "https://racan-ai.vercel.app/logo.png",
              "description": "AI-powered fashion assistant and ecommerce platform providing personalized style recommendations",
              "foundingDate": "2024",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Kesari Brahmarishendra"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXX-XXX-XXXX",
                "contactType": "customer service",
                "email": "ssbkfdurga17@gmail.com"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Vadodara",
                "addressRegion": "Gujarat",
                "addressCountry": "India",
                "streetAddress": "Parul University"
              },
              "sameAs": [
                "https://www.instagram.com/racan.ai",
                "https://www.facebook.com/racan.ai",
                "https://twitter.com/racan_ai",
                "https://www.linkedin.com/company/racan-ai"
              ]
            })
          }}
        />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1GJQBZRZRS"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1GJQBZRZRS', {
                page_title: 'Racan AI - AI-Powered Fashion Assistant',
                page_location: window.location.href,
                content_group1: 'Fashion AI',
                content_group2: 'Homepage'
              });
            `
          }}
        />
      </head>
      <body className={`${ibmPlexMono.className} text-gray-900 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}