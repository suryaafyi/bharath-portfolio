'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/lib/projects';

const CAROUSEL_DURATION = 3000; // 3 seconds of carousel
const CENTER_INDEX = 2;

export default function IntroSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'carousel' | 'expanding' | 'done'>('carousel');
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    // Phase 1: scroll carousel fast from right to left for 3s
    const carouselTimer = setTimeout(() => {
      // Phase 2: trigger expansion of center card
      setPhase('expanding');
      // Phase 3: after expansion animation completes, tell parent
      setTimeout(() => {
        setPhase('done');
        setTimeout(onComplete, 100);
      }, 1400);
    }, CAROUSEL_DURATION);

    return () => clearTimeout(carouselTimer);
  }, [onComplete]);

  // Animate the carousel strip moving left continuously
  useEffect(() => {
    if (phase !== 'carousel') return;
    let start: number | null = null;
    let raf: number;

    const speed = 1.2; // px per ms

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      setOffsetX(-(elapsed * speed) % (220 * PROJECTS.length));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const CARD_W = 200;
  const CARD_GAP = 20;
  const CARD_STEP = CARD_W + CARD_GAP;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#0D0D0D',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Brand mark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'carousel' ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.4em',
          color: '#ffffff',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        By Bharath
      </motion.div>

      {/* Carousel strip — only visible during carousel phase */}
      {phase === 'carousel' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${CARD_GAP}px`,
            transform: `translateX(${offsetX}px)`,
            willChange: 'transform',
            position: 'absolute',
            left: '20vw',
          }}
        >
          {/* Triple the cards for seamless loop */}
          {[...PROJECTS, ...PROJECTS, ...PROJECTS].map((project, i) => (
            <div
              key={i}
              style={{
                width: `${CARD_W}px`,
                height: '25vh',
                borderRadius: '10px',
                overflow: 'hidden',
                flexShrink: 0,
                background: '#1a1a1a',
              }}
            >
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.7,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Expanding center video — triggered after carousel */}
      {(phase === 'expanding' || phase === 'done') && (
        <motion.div
          initial={{
            width: `${CARD_W}px`,
            height: '55vh',
            borderRadius: '10px',
          }}
          animate={{
            width: '100vw',
            height: '100vh',
            borderRadius: '0px',
          }}
          transition={{
            duration: 1.4,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{
            position: 'absolute',
            overflow: 'hidden',
            zIndex: 110,
          }}
        >
          <video
            src={PROJECTS[CENTER_INDEX].video}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Dark overlay that fades out — revealing the hero underneath */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'done' ? 0 : 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      )}

      {/* Loading bar */}
      <AnimatePresence>
        {phase === 'carousel' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '48px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '160px',
                height: '1.5px',
                background: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
                borderRadius: '2px',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: CAROUSEL_DURATION / 1000, ease: 'linear' }}
                style={{
                  height: '100%',
                  background: '#E8341C',
                }}
              />
            </div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.3em',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
              }}
            >
              LOADING
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}