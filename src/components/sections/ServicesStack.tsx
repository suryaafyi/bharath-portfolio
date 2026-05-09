'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Video\nEditing",
    description: "The craft behind every story. We turn raw footage into cinematic experiences.",
    tag: "CUTS / TRANSITIONS / COLOR",
    video: "/videos/stack-01.mp4",
    bg: "#0D0D0D",
    color: "#ffffff",
  },
  {
    title: "Motion\nDesign",
    description: "When still isn't enough. Elevating brands with fluid, purposeful animation.",
    tag: "2D / 3D / KINETIC",
    video: "/videos/stack-02.mp4",
    bg: "#EFEFED",
    color: "#1a1a1a",
  },
  {
    title: "Typography",
    description: "Words that move you. Literally. Narrative-driven motion typography.",
    tag: "EDITORIAL / BOLD / REVEALS",
    video: "/videos/stack-03.mp4",
    bg: "#E8341C",
    color: "#ffffff",
  },
  {
    title: "Longform\nContent",
    description: "The full story, told with patience. Documentaries, interviews, and deep dives.",
    tag: "YOUTUBE / DOCS / INTERVIEWS",
    video: "/videos/stack-04.mp4",
    bg: "#1a1a1a",
    color: "#ffffff",
  },
  {
    title: "Shortform\nContent",
    description: "Every second earns its place. High-impact content for the modern scroll.",
    tag: "REELS / TIKTOK / SHORTS",
    video: "/videos/stack-05.mp4",
    bg: "#EFEFED",
    color: "#1a1a1a",
  },
];

export default function ServicesStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const cards = gsap.utils.toArray('.service-card') as HTMLElement[];
  //   if (cards.length === 0) return;

  //   cards.forEach((card, i) => {
  //     ScrollTrigger.create({
  //       trigger: card,
  //       start: 'top top',
  //       pin: true,
  //       pinSpacing: false,
  //       end: () => `+=${window.innerHeight}`,
  //     });

  //     if (i < cards.length - 1) {
  //       gsap.to(card, {
  //         scale: 0.96,
  //         opacity: 0.6,
  //         scrollTrigger: {
  //           trigger: cards[i + 1],
  //           start: 'top bottom',
  //           end: 'top top',
  //           scrub: true,
  //         },
  //       });
  //     }
  //   });

  //   return () => {
  //     ScrollTrigger.getAll().forEach((t) => t.kill());
  //   };
  // }, []);

  useEffect(() => {
    const cards = gsap.utils.toArray('.service-card') as HTMLElement[];
    if (cards.length === 0) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: i === cards.length - 1, // only last card gets spacing
          end: () => `+=${window.innerHeight}`,
        });

        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.96,
            opacity: 0.7,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          });
        }
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      style={{
        position: 'relative',
        zIndex: 20,
      }}
    >
      {SERVICES.map((service, i) => (
        <div
          key={i}
          className="service-card"
          style={{
            height: '100vh',
            width: '100%',
            backgroundColor: service.bg,
            color: service.color,
            zIndex: i + 1,
            borderRadius: i === 0 ? '0' : '32px 32px 0 0',
            overflow: 'hidden',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
          }}
        >
          {/* Inner layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              height: '100%',
              paddingLeft: '48px',
              paddingRight: '48px',
              paddingTop: '80px',
              paddingBottom: '60px',
              gap: '40px',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}
          >
            {/* LEFT — text */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '24px',
              }}
            >
              {/* Tag */}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.25em',
                  opacity: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                {service.tag}
              </span>

              {/* Title */}
              <h2
                style={{
                  fontSize: 'clamp(52px, 8vw, 120px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.88,
                  margin: 0,
                  whiteSpace: 'pre-line',
                }}
              >
                {service.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: '17px',
                  lineHeight: 1.65,
                  opacity: 0.75,
                  maxWidth: '380px',
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {service.description}
              </p>
            </div>

            {/* RIGHT — video */}
            <div
              style={{
                position: 'relative',
                height: '65vh',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.2)',
                flexShrink: 0,
              }}
            >
              <video
                src={service.video}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Subtle index number watermark */}
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              right: '48px',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              opacity: 0.2,
              textTransform: 'uppercase',
            }}
          >
            0{i + 1} / 0{SERVICES.length}
          </div>
        </div>
      ))}
    </section>
  );
}