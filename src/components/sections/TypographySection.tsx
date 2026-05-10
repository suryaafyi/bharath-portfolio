'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const R2 = 'https://pub-abc9673bee79483f90f3afd3e4864cd6.r2.dev';

export default function TypographySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lines = section.querySelectorAll('.type-line');
    const visuals = section.querySelectorAll('.inline-visual');

    const ctx = gsap.context(() => {
      // Lines fade in on scroll
      gsap.fromTo(
        lines,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Each visual expands individually as user scrolls to it
      visuals.forEach((visual) => {
        gsap.fromTo(
          visual,
          {
            width: '0px',
            opacity: 0,
            borderRadius: '4px',
          },
          {
            width: 'clamp(100px, 12vw, 200px)',
            opacity: 1,
            borderRadius: '8px',
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visual,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.5,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const textStyle: React.CSSProperties = {
    fontSize: 'clamp(36px, 6.5vw, 100px)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1.05,
    color: '#1a1a1a',
    display: 'inline',
  };

  const visualStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '0px',
    height: 'clamp(65px, 8vw, 130px)',
    borderRadius: '4px',
    overflow: 'hidden',
    verticalAlign: 'middle',
    margin: '0 0.2em',
    position: 'relative',
    top: '-0.05em',
    flexShrink: 0,
    background: '#1a1a1a',
  };

  const lineFlexStyle: React.CSSProperties = {
    opacity: 0,
    marginBottom: '0.05em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25em',
    flexWrap: 'wrap',
  };

  const lineCenterStyle: React.CSSProperties = {
    opacity: 0,
    marginBottom: '0.05em',
    textAlign: 'center',
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#EFEFED',
        padding: '140px 8vw',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Line 1 */}
        <div className="type-line" style={lineCenterStyle}>
          <span style={textStyle}>We craft edits for</span>
        </div>

        {/* Line 2 — visual · brands · visual */}
        <div className="type-line" style={lineFlexStyle}>
          <span className="inline-visual" style={visualStyle}>
            <video
              src={`${R2}/typo-01.mp4`}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </span>
          <span style={textStyle}>brands</span>
          <span className="inline-visual" style={visualStyle}>
            <video
              src={`${R2}/typo-02.mp4`}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </span>
        </div>

        {/* Line 3 */}
        <div className="type-line" style={lineCenterStyle}>
          <span style={textStyle}>that want to be remembered.</span>
        </div>

        {/* Line 4 — Every frame · visual · is a decision. */}
        <div className="type-line" style={lineFlexStyle}>
          <span style={textStyle}>Every frame</span>
          <span className="inline-visual" style={visualStyle}>
            <video
              src={`${R2}/typo-03.mp4`}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </span>
          <span style={textStyle}>is a decision.</span>
        </div>

        {/* Line 5 — Every cut · visual · is intentional. */}
        <div className="type-line" style={lineFlexStyle}>
          <span style={textStyle}>Every cut</span>
          <span className="inline-visual" style={visualStyle}>
            <video
              src={`${R2}/typo-04.mp4`}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </span>
          <span style={textStyle}>is intentional.</span>
        </div>
      </div>
    </section>
  );
}