'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const R2 = 'https://pub-abc9673bee79483f90f3afd3e4864cd6.r2.dev';

const PROJECTS = [
  {
    slug: 'podcast-edit',
    title: 'Podcast',
    category: 'LONGFORM EDIT',
    video: `${R2}/long-form-edit.mp4`,
    tall: true,
  },
  {
    slug: 'brand-reel',
    title: 'Brand Motion Reel',
    category: 'MOTION DESIGN',
    video: `${R2}/motion-design.mp4`,
    tall: false,
  },
  {
    slug: 'ugc-campaign',
    title: 'UGC Ad Campaign',
    category: 'SHORT FORM · UGC',
    video: `${R2}/ugc.mp4`,
    tall: false,
  },
  {
    slug: 'typography-ident',
    title: 'Typography Ident',
    category: 'MOTION TYPOGRAPHY',
    video: `${R2}/typography.mp4`,
    tall: true,
  },
  {
    slug: 'commercial-cut',
    title: 'Product Commercial',
    category: 'COMMERCIAL EDIT',
    video: `${R2}/product.mp4`,
    tall: false,
  },
  {
    slug: 'social-series',
    title: 'Social Content Series',
    category: 'REELS · TIKTOK',
    video: `${R2}/social.mp4`,
    tall: false,
  },
];

export default function WorkGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.work-card');
    if (!cards) return;

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#1A1008',
        padding: '100px 48px',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '60px' }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          color: '#E8341C',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          SEE IT IN ACTION
        </p>
        <h2 style={{
          fontSize: 'clamp(48px, 7vw, 110px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
          color: '#ffffff',
        }}>
          A sample of<br />the work.
        </h2>
      </div>

      {/* Grid — 2 columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {PROJECTS.map((project, i) => (
          <WorkCard
            key={project.slug}
            project={project}
            index={i}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
    </section>
  );
}

function WorkCard({
  project,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  project: typeof PROJECTS[0];
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.play().catch(() => { });
      video.muted = false;
    } else if (isOtherHovered) {
      video.pause();
      video.muted = true;
    } else {
      // Default state: playing but muted
      video.play().catch(() => { });
      video.muted = true;
    }
  }, [isHovered, isOtherHovered]);

  return (
    <div
      className="work-card"
      style={{
        display: 'block',
        opacity: 0,
        textDecoration: 'none',
        cursor: 'none',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        transform: isHovered ? 'scale(1.01)' : 'scale(1)',
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Corner brackets + video */}
      <div style={{ position: 'relative' }}>
        {/* Corner brackets */}
        <Bracket position="top-left" />
        <Bracket position="top-right" />
        <Bracket position="bottom-left" />
        <Bracket position="bottom-right" />

        {/* Video container */}
        <div
          style={{
            width: '100%',
            aspectRatio: project.tall ? '3/4' : '16/10',
            overflow: 'hidden',
            borderRadius: '2px',
            position: 'relative',
          }}
        >
          <video
            ref={videoRef}
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: isOtherHovered ? 'grayscale(100%)' : 'grayscale(0%)',
              opacity: isOtherHovered ? 0.4 : 1,
              transition: 'filter 0.4s ease, opacity 0.4s ease',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Project info below card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '16px',
          paddingBottom: '8px',
        }}
      >
        <div>
          <p style={{
            fontSize: 'clamp(18px, 2vw, 26px)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '4px',
          }}>
            {project.title}
          </p>
          <p style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
          }}>
            {project.category}
          </p>
        </div>

        {/* Arrow button */}
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#E8341C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scale(1)' : 'scale(0.8)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <span style={{ color: '#fff', fontSize: '16px' }}>→</span>
        </div>
      </div>
    </div>
  );
}

function Bracket({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const size = 14;
  const thickness = 1.5;
  const color = 'rgba(255,255,255,0.4)';
  const offset = -8;

  const styles: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    zIndex: 2,
  };

  const top = position.includes('top') ? offset : undefined;
  const bottom = position.includes('bottom') ? offset : undefined;
  const left = position.includes('left') ? offset : undefined;
  const right = position.includes('right') ? offset : undefined;

  return (
    <div style={{ ...styles, top, bottom, left, right }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {position === 'top-left' && (
          <>
            <line x1="0" y1="0" x2={size} y2="0" stroke={color} strokeWidth={thickness} />
            <line x1="0" y1="0" x2="0" y2={size} stroke={color} strokeWidth={thickness} />
          </>
        )}
        {position === 'top-right' && (
          <>
            <line x1="0" y1="0" x2={size} y2="0" stroke={color} strokeWidth={thickness} />
            <line x1={size} y1="0" x2={size} y2={size} stroke={color} strokeWidth={thickness} />
          </>
        )}
        {position === 'bottom-left' && (
          <>
            <line x1="0" y1={size} x2={size} y2={size} stroke={color} strokeWidth={thickness} />
            <line x1="0" y1="0" x2="0" y2={size} stroke={color} strokeWidth={thickness} />
          </>
        )}
        {position === 'bottom-right' && (
          <>
            <line x1="0" y1={size} x2={size} y2={size} stroke={color} strokeWidth={thickness} />
            <line x1={size} y1="0" x2={size} y2={size} stroke={color} strokeWidth={thickness} />
          </>
        )}
      </svg>
    </div>
  );
}