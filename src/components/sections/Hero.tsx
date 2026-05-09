'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '@/lib/projects';
import { Volume2, VolumeX } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STATS = [
  { label: 'VIEWS GENERATED', value: 35, suffix: 'M+' },
  { label: 'FOLLOWERS GAINED', value: 100, suffix: 'K+' },
  { label: 'BRANDS & CREATORS', value: 50, suffix: '+' },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isMuted, setIsMuted] = useState(true);
  const [key, setKey] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
      setKey((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setKey((prev) => prev + 1);
  };

  return (
    <section ref={heroRef} className="relative h-[100vh] w-full overflow-hidden bg-brand-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ clipPath: activeIndex === 2 ? 'inset(0 0 0 0%)' : 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0 0 0%)' }}
            exit={{ clipPath: 'inset(0 100% 0 0%)' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
          >
            <motion.video
              src={PROJECTS[activeIndex].video}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              data-cursor="play"
              style={{ scale: videoScale }}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/30 via-transparent to-brand-black/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-[5vw] pt-[10vh] text-center">
        <motion.div style={{ y: textY }} className="flex flex-col items-center max-w-[80vw]">
          <h1 className="text-[7.5vw] font-display font-bold leading-[0.95] text-brand-white uppercase tracking-tight">
            Frames that refuse <br /> to be forgotten.
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
            className="mt-8 max-w-[560px] text-[16px] leading-[1.5] font-body text-brand-white/70"
          >
            We produce films and motion design that truly connect with your audience.
            High-end video editing for brands that demand cinematic storytelling.
          </motion.p>
        </motion.div>
      </div>

      {/* Stats - Bottom Left */}
      <div className="absolute bottom-[14vh] left-[5vw] z-20 flex gap-8">
        {STATS.map((stat, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="flex flex-col">
              <div className="text-[24px] font-body font-bold text-brand-white leading-none">
                <Counter value={stat.value} />{stat.suffix}
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-white/50 font-body mt-1">
                {stat.label}
              </span>
            </div>
            {i < STATS.length - 1 && (
              <div className="h-8 w-[1px] bg-brand-white/10 ml-4" />
            )}
          </div>
        ))}
      </div>

      {/* Thumbnails - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-end gap-2">
        {PROJECTS.map((project, index) => (
          <div key={project.id} className="flex flex-col gap-2 items-center">
            <button
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "relative h-[65px] w-[90px] overflow-hidden rounded-[8px] border-2 transition-all duration-500",
                activeIndex === index ? "border-brand-white scale-105" : "border-transparent opacity-40 hover:opacity-100"
              )}
            >
              <video
                src={project.video}
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </button>
            {activeIndex === index && (
              <div className="w-full h-[2px] bg-brand-white/20 overflow-hidden rounded-full px-1">
                <motion.div
                  key={key}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 10, ease: 'linear' }}
                  className="h-full bg-brand-white"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sound Toggle - Bottom Right */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-10 right-[5vw] z-20 flex items-center gap-4 group"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-white/60 group-hover:text-brand-white transition-colors">
          {isMuted ? 'SOUND OFF' : 'SOUND ON'}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-white/10 group-hover:border-brand-white/30 transition-colors">
          {isMuted ? <VolumeX size={14} className="text-brand-white/60" /> : <Volume2 size={14} className="text-brand-red animate-pulse" />}
        </div>
      </button>

      {/* Scroll Indicator - Bottom Center (next to thumbnails) */}
      <div className="absolute bottom-10 left-[80%] z-20 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="text-[10px] font-medium tracking-[0.3em] text-brand-white/60 uppercase">SCROLL</span>
        <div className="h-8 w-[1px] bg-brand-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 32] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-brand-white/60"
          />
        </div>
      </div>

    </section>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{count}</span>;
}
