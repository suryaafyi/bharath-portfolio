'use client';

import { useState } from 'react';
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

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <main style={{ minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <IntroSplash key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.01 }} // near-instant, splash already covers it
          >
            <Navbar />
            <Hero />
            <TypographySection />
            <WorkGrid />
            <ClientMarquee />
            <ServicesStack />
            <Testimonials />
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}