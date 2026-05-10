'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: 'Mia',
    role: 'Floofy Socials',
    photo: '/images/mia.jpeg',
    text: 'You absolutely nailed the vibe I was going for. Clean, sharp, and genuinely impressive work',
    tilt: '-3deg',
    photoSide: 'left',
    video: 'https://pub-abc9673bee79483f90f3afd3e4864cd6.r2.dev/mia-testimonial.MP4',
  },
  {
    name: 'Arrad',
    role: 'Ourselves Podcast — Host',
    photo: '/images/ourselves-podcast.png',
    text: 'This is fire. You landed exactly on the clean aesthetic I had in mind.',
    tilt: '2deg',
    photoSide: 'right',
    video: null,
  },
  {
    name: 'Jack',
    role: 'WeFoundrs',
    photo: '/images/wefoundrs.png',
    text: 'Really good work. Strong execution, fast turnaround, and great creative instincts.',
    tilt: '-2deg',
    photoSide: 'left',
    video: null,
  },
  {
    name: 'Wil Brown',
    role: 'Vantage Marketing Canada',
    photo: '/images/vantage.png',
    text: 'Working with Bharath elevated our entire content strategy. His understanding of rhythm, pacing, and visual storytelling is genuinely rare.',
    tilt: '3deg',
    photoSide: 'right',
    video: null,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.testimonial-item');
    if (!items) return;

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
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
        background: '#EFEFED',
        padding: '120px 0 160px 0',
        overflow: 'hidden',
      }}
    >
      {/* Heading */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '100px',
          padding: '0 5vw',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '5vw',
            width: '90px',
            height: '90px',
          }}
        >
          <svg viewBox="0 0 90 90" width="90" height="90">
            <path
              id="circle-text"
              d="M 45,45 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
              fill="none"
            />
            <text fontSize="9" fontWeight="500" letterSpacing="3" fill="#E8341C">
              <textPath href="#circle-text">EMOTION · IN · MOTION ·</textPath>
            </text>
          </svg>
        </div>

        <h2
          style={{
            fontSize: 'clamp(64px, 11vw, 150px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            color: '#1a1a1a',
            marginBottom: '32px',
          }}
        >
          Stories<br />worth<br />sharing.
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#1a1a1a',
            opacity: 0.55,
            maxWidth: '520px',
            margin: '0 auto',
          }}
        >
          The most rewarding part of bringing a story to life is seeing the
          impact it makes. We're delighted to share these experiences from the
          clients and collaborators who make our work so meaningful.
        </p>
      </div>

      {/* Testimonial items */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '80px',
          padding: '0 5vw',
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <TestimonialItem key={i} testimonial={t} index={i} />
        ))}
      </div>
    </section>
  );
}

function TestimonialItem({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [videoExpanded, setVideoExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLeft = testimonial.photoSide === 'left';

  const showCard = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setHovered(true);
  };

  const scheduleHide = () => {
    // Don't hide if video is expanded
    if (videoExpanded) return;
    hideTimer.current = setTimeout(() => {
      setHovered(false);
    }, 5000);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // When video expands, cancel any hide timer and keep card visible
  useEffect(() => {
    if (videoExpanded) {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      setHovered(true);
    }
  }, [videoExpanded]);

  useEffect(() => {
    if (videoExpanded && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [videoExpanded]);

  const handleVideoEnd = () => {
    setVideoExpanded(false);
    setIsPlaying(false);
    // Start the hide timer after video ends
    scheduleHide();
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleCollapseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setVideoExpanded(false);
    setIsPlaying(false);
    scheduleHide();
  };

  return (
    <div
      className="testimonial-item"
      style={{
        opacity: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        gap: '40px',
        position: 'relative',
      }}
    >
      {/* Photo + name */}
      <motion.div
        onMouseEnter={showCard}
        onMouseLeave={scheduleHide}
        style={{
          order: isLeft ? 1 : 2,
          flexShrink: 0,
          width: 'clamp(220px, 25vw, 360px)',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '3/4',
            borderRadius: '8px',
            overflow: 'hidden',
            transform: `rotate(${testimonial.tilt})`,
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            marginBottom: '16px',
            background: '#ccc',
          }}
        >
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.6s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        </div>
        <p style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: '4px',
          letterSpacing: '-0.01em',
        }}>
          {testimonial.name}
        </p>
        <p style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          color: '#1a1a1a',
          opacity: 0.45,
          textTransform: 'uppercase' as const,
        }}>
          {testimonial.role}
        </p>
      </motion.div>

      {/* Quote / Video card */}
      <motion.div
        onMouseEnter={showCard}
        onMouseLeave={scheduleHide}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 20,
          scale: hovered ? 1 : 0.95,
          pointerEvents: hovered ? 'auto' : 'none',
        }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        style={{
          order: isLeft ? 2 : 1,
          background: '#1a1a1a',
          borderRadius: '12px',
          overflow: 'hidden',
          maxWidth: 'clamp(260px, 32vw, 460px)',
          width: '100%',
          alignSelf: 'center',
          transform: videoExpanded
            ? 'rotate(0deg)'
            : `rotate(${index % 2 === 0 ? '1.5deg' : '-1.5deg'})`,
          position: 'relative',
          transition: 'transform 0.4s ease',
          flexShrink: 0,
        }}
      >
        <AnimatePresence mode="wait">
          {!videoExpanded ? (
            <motion.div
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '40px 36px', position: 'relative' }}
            >
              <p style={{
                fontSize: 'clamp(17px, 1.8vw, 24px)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.4,
                letterSpacing: '-0.02em',
                marginBottom: '24px',
              }}>
                "{testimonial.text}"
              </p>

              <div style={{
                paddingTop: '20px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                marginBottom: testimonial.video ? '16px' : '0',
              }}>
                <p style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#ffffff',
                  opacity: 0.7,
                }}>
                  {testimonial.name}
                </p>
              </div>

              {testimonial.video && (
                <button
                  onClick={() => setVideoExpanded(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: '4px',
                  }}
                >
                  <div style={{
                    width: '52px',
                    height: '36px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#333',
                    position: 'relative',
                  }}>
                    <video
                      src={testimonial.video}
                      muted
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.35)',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                        <polygon points="2,1 11,6 2,11" />
                      </svg>
                    </div>
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <p style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#ffffff',
                      marginBottom: '2px',
                    }}>
                      Hear it from {testimonial.name}
                    </p>
                    <p style={{
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.05em',
                    }}>
                      TAP TO WATCH
                    </p>
                  </div>

                  <div style={{ marginLeft: 'auto', color: '#E8341C', fontSize: '16px' }}>→</div>
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{ position: 'relative', width: '100%' }}
            >
              <video
                ref={videoRef}
                src={testimonial.video!}
                playsInline
                onEnded={handleVideoEnd}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  maxHeight: '70vh',
                  objectFit: 'cover',
                }}
              />

              {/* Controls overlay — sits ON the video */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '14px',
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 55%, rgba(0,0,0,0.6) 100%)',
                  pointerEvents: 'none',
                }}
              >
                {/* Top — close button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', pointerEvents: 'auto' }}>
                  <button
                    onClick={handleCollapseVideo}
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Bottom — play/pause + name */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    pointerEvents: 'auto',
                  }}
                >
                  <button
                    onClick={togglePlayPause}
                    style={{
                      background: '#E8341C',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isPlaying ? (
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                        <rect x="0" y="0" width="4" height="14" rx="1" />
                        <rect x="8" y="0" width="4" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                        <polygon points="1,0 12,7 1,14" />
                      </svg>
                    )}
                  </button>

                  <div>
                    <p style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: '2px',
                    }}>
                      {testimonial.name}
                    </p>
                    <p style={{
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.55)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                    }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}