'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, Project } from '@/lib/projects';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';

export default function ProjectPage() {
  const { slug } = useParams();
  const router = useRouter();
  const project = PROJECTS.find((p) => p.slug === slug);
  const [isMuted, setIsMuted] = useState(true);

  if (!project) return <div>Project not found</div>;

  return (
    <main className="bg-brand-black min-h-screen text-brand-white">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="fixed top-8 left-8 z-50 flex items-center gap-4 group cursor-none"
        data-cursor="link"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-white/10 group-hover:bg-brand-white group-hover:text-brand-black transition-all duration-300">
          <ArrowLeft size={20} />
        </div>
        <span className="text-[12px] font-medium tracking-[0.2em] uppercase">BACK</span>
      </motion.button>

      {/* Hero Video */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <video
          src={project.video}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black" />
        
        {/* Unmute Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-12 right-12 z-20 flex items-center gap-4 group"
        >
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-white/60 group-hover:text-brand-white transition-colors">
            {isMuted ? 'UNMUTE' : 'MUTE'}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-white/10 group-hover:border-brand-white/30 transition-colors">
            {isMuted ? <VolumeX size={14} className="text-brand-white/60" /> : <Volume2 size={14} className="text-brand-red animate-pulse" />}
          </div>
        </button>
      </section>

      {/* Content Section */}
      <section className="px-[5vw] py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Title & Tag */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[14px] font-medium tracking-[0.3em] text-brand-red uppercase mb-4 block"
            >
              {project.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(40px,6vw,100px)] font-display font-bold leading-[0.9] uppercase"
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Right: Metadata Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 border-l border-brand-white/10 pl-12">
            {[
              { label: 'CLIENT', value: project.client },
              { label: 'PRODUCTION', value: project.production },
              { label: 'EDITOR', value: project.editor },
              { label: 'STYLE', value: project.style },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <span className="text-[10px] font-medium tracking-[0.2em] text-brand-white/40 uppercase mb-2 block">
                  {item.label}
                </span>
                <span className="text-[16px] font-body text-brand-white">
                  {item.value}
                </span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="col-span-2"
            >
              <span className="text-[10px] font-medium tracking-[0.2em] text-brand-white/40 uppercase mb-2 block">
                TOOLS USED
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1 rounded-full border border-brand-white/10 text-[12px] font-body text-brand-white/80">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl"
        >
          <p className="text-[24px] md:text-[32px] font-body leading-[1.4] text-brand-white/90">
            {project.description}
          </p>
        </motion.div>

        {/* Before/After Component (Placeholder for now) */}
        <div className="mt-32 h-[60vh] bg-brand-charcoal rounded-[8px] flex items-center justify-center overflow-hidden relative group">
           <span className="text-brand-white/20 uppercase tracking-[0.5em] text-[12px]">BEFORE / AFTER SLIDER</span>
           {/* In a real scenario, this would be the interactive slider component */}
        </div>

        {/* BTS Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
             <h3 className="text-[12px] font-medium tracking-[0.3em] text-brand-red uppercase mb-8">BEHIND THE SCENES</h3>
             <p className="text-brand-white/60 leading-relaxed font-body">
                The core challenge of this project was maintaining the high-energy pace while ensuring every transition felt physically accurate. We utilized a mix of custom transition presets and frame-by-frame masking to achieve the desired flow.
             </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
             <div>
                <h4 className="text-[10px] font-medium tracking-[0.2em] text-brand-white/40 uppercase mb-4">COLOR GRADE</h4>
                <div className="h-[150px] bg-brand-charcoal rounded-[4px]" />
             </div>
             <div>
                <h4 className="text-[10px] font-medium tracking-[0.2em] text-brand-white/40 uppercase mb-4">AUDIO WAVE</h4>
                <div className="h-[150px] bg-brand-charcoal rounded-[4px]" />
             </div>
          </div>
        </div>

        {/* CTA Banner */}
        <Link href="/#contact" className="mt-48 block group">
          <div className="h-[30vh] border border-brand-white/10 rounded-[8px] flex flex-col items-center justify-center transition-all duration-500 group-hover:bg-brand-white group-hover:border-brand-white">
             <span className="text-brand-white/40 uppercase tracking-[0.3em] text-[12px] mb-4 group-hover:text-brand-black/40 transition-colors">LIKE WHAT YOU SEE?</span>
             <h2 className="text-[clamp(40px,5vw,80px)] font-display font-bold text-brand-white group-hover:text-brand-black uppercase transition-colors">LET'S TALK.</h2>
          </div>
        </Link>
      </section>
    </main>
  );
}
