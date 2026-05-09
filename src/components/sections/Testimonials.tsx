'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: 'Mia',
    role: 'floofy socials',
    photo: '/images/mia.jpeg',
    text: 'You absolutely nailed the vibe I was going for. Clean, sharp, and genuinely impressive work',
    tilt: '-3deg',
    photoSide: 'left',
  },
  {
    name: 'Arrad',
    role: 'Ourselves Podcast - Host',
    photo: '/images/ourselves-podcast.png',
    text: 'This is fire. You landed exactly on the clean aesthetic I had in mind.',
    tilt: '2deg',
    photoSide: 'right',
  },
  {
    name: 'Jack',
    role: 'WeFoundrs',
    photo: '/images/wefoundrs.png',
    text: 'Really good work. Strong execution, fast turnaround, and great creative instincts.',
    tilt: '-2deg',
    photoSide: 'left',
  },
  {
    name: 'Wil Brown',
    role: 'Vantage Marketing Canada',
    photo: '/images/vantage.png',
    text: 'Working with Bharath elevated our entire content strategy. His understanding of rhythm, pacing, and visual storytelling is genuinely rare.',
    tilt: '3deg',
    photoSide: 'right',
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
        {/* "EMOTION IN MOTION" stamp — top right */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '5vw',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            border: '1.5px solid #E8341C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 90 90" width="90" height="90">
            <path
              id="circle-text"
              d="M 45,45 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
              fill="none"
            />
            <text fontSize="9" fontWeight="500" letterSpacing="3" fill="#E8341C">
              <textPath href="#circle-text">
                EMOTION · IN · MOTION ·
              </textPath>
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
  const isLeft = testimonial.photoSide === 'left';

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
      {/* Photo card */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          order: isLeft ? 1 : 2,
          flexShrink: 0,
          width: 'clamp(220px, 25vw, 360px)',
        }}
      >
        {/* Photo */}
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

        {/* Name + role */}
        <div>
          <p
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '4px',
              letterSpacing: '-0.01em',
            }}
          >
            {testimonial.name}
          </p>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: '#1a1a1a',
              opacity: 0.45,
              textTransform: 'uppercase',
            }}
          >
            {testimonial.role}
          </p>
        </div>
      </motion.div>

      {/* Quote card — appears on hover */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 20,
          scale: hovered ? 1 : 0.95,
        }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        style={{
          order: isLeft ? 2 : 1,
          background: '#1a1a1a',
          borderRadius: '12px',
          padding: '40px 36px',
          maxWidth: 'clamp(260px, 30vw, 420px)',
          alignSelf: 'center',
          transform: `rotate(${index % 2 === 0 ? '1.5deg' : '-1.5deg'})`,
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontSize: 'clamp(18px, 2vw, 26px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.35,
            letterSpacing: '-0.02em',
          }}
        >
          "{testimonial.text}"
        </p>
        <div
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#ffffff',
              opacity: 0.7,
            }}
          >
            {testimonial.name}
          </p>
        </div>
      </motion.div>
    </div>
  );
}