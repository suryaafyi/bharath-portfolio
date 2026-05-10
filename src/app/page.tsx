'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroSplash from '@/components/sections/IntroSplash';
import Hero from '@/components/sections/Hero';
import Navbar from '@/components/layout/Navbar';
import TypographySection from '@/components/sections/TypographySection';
import WorkGrid from '@/components/sections/WorkGrid';
import ClientMarquee from '@/components/sections/ClientMarquee';
import ServicesStack from '@/components/sections/ServicesStack';
import Testimonials from '@/components/sections/Testimonials';
import ContactSection from '@/components/sections/ContactSection';
import AboutPreview from '@/components/sections/AboutPreview';

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('splash_shown');
    if (!hasShown) {
      setShowSplash(true);
    }
    setIsReady(true);

    // Clear hash from URL on load
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splash_shown', 'true');
  };

  if (!isReady) return <div style={{ height: '100vh', background: '#0D0D0D' }} />;

  return (
    <main style={{ minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <IntroSplash key="splash" onComplete={handleSplashComplete} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Navbar />
            <Hero />
            <TypographySection />
            <WorkGrid />
            <ClientMarquee />
            <AboutPreview />
            <ServicesStack />
            <Testimonials />
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}