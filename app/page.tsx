'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Features from '@/components/Features'
import Products from '@/components/Products'
import Footer from '@/components/Footer'
import StartupAnimation from '@/components/StartupAnimation'

export default function Home() {
  const [showStartup, setShowStartup] = useState(true)
  const [hasShownStartup, setHasShownStartup] = useState(false)

  useEffect(() => {
    // Check if startup animation has been shown in this session
    const startupShown = sessionStorage.getItem('startupAnimationShown')
    if (startupShown) {
      setShowStartup(false)
      setHasShownStartup(true)
    }
  }, [])

  const handleStartupComplete = () => {
    setShowStartup(false)
    setHasShownStartup(true)
    // Mark startup as shown for this session
    sessionStorage.setItem('startupAnimationShown', 'true')
  }

  // Show startup animation only on first load
  if (showStartup && !hasShownStartup) {
    return <StartupAnimation onComplete={handleStartupComplete} />
  }

  return (
    <div className="relative overflow-x-hidden">
      {/* SEO-friendly semantic HTML structure */}
      <header>
        <Navbar />
      </header>
      
      <main>
        <section aria-label="Hero section">
          <Hero />
        </section>
        
        <section aria-label="About Racan AI">
          <About />
        </section>
        
        <section aria-label="Features and capabilities">
          <Features />
        </section>
        
        <section aria-label="Products and services">
          <Products />
        </section>
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  )
}