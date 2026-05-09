'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContactSection() {
  return (
    <div
      id="contact"
      style={{
        background: '#EFEFED',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top content area */}
      <div
        style={{
          padding: '80px 48px 60px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '40px',
          alignItems: 'start',
        }}
      >
        {/* Col 1+2 — Brand statement + CTA */}
        <div style={{ gridColumn: '1 / 3' }}>
          {/* Availability badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '28px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 8px rgba(34,197,94,0.6)',
              }}
            />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                color: '#1a1a1a',
                opacity: 0.5,
                textTransform: 'uppercase' as const,
              }}
            >
              Available for new projects
            </span>
          </div>

          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: '#1a1a1a',
              maxWidth: '480px',
              marginBottom: '32px',
              fontWeight: 400,
            }}
          >
            We work with people & brands who value authenticity, craft, and
            cinematic storytelling — translating vision into visuals that
            resonate and last.
          </p>

          {/* SPEAK TO US */}
          <Link
            href="mailto:crzee23@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#1a1a1a',
                textTransform: 'uppercase' as const,
              }}
            >
              SPEAK TO US
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#E8341C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '2px',
                flexShrink: 0,
              }}
            >
              <span style={{ color: '#fff', fontSize: '14px' }}>→</span>
            </div>
          </Link>
        </div>

        {/* Col 3 — Navigation */}
        {/* <div>
          <p
            style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: '#1a1a1a',
              opacity: 0.4,
              textTransform: 'uppercase' as const,
              marginBottom: '24px',
            }}
          >
            NAVIGATION
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '4px' }}>
            {[
              { label: 'WHAT WE DO', href: '#work' },
              { label: 'ABOUT', href: '#about' },
              { label: 'CONTACT', href: '#contact' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.4,
                  display: 'block',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div> */}

        {/* Col 4 — Contact + Connect + Brand mark */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '36px',
          }}
        >
          {/* Contact */}
          <div>
            <p
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: '#1a1a1a',
                opacity: 0.4,
                textTransform: 'uppercase' as const,
                marginBottom: '12px',
              }}
            >
              CONTACT
            </p>
            <a
              href="mailto:crzee23@gmail.com"
              style={{
                fontSize: '14px',
                color: '#1a1a1a',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                display: 'block',
                fontWeight: 400,
              }}
            >
              hello@bharath.com
            </a>
          </div>

          {/* Connect */}
          <div>
            <p
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: '#1a1a1a',
                opacity: 0.4,
                textTransform: 'uppercase' as const,
                marginBottom: '14px',
              }}
            >
              CONNECT
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const }}>
              <SocialIcon
                name="Instagram"
                href="https://www.instagram.com/bybharatth"
                path="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M2 2h20v20H2z"
              />
              <SocialIcon
                name="LinkedIn"
                href="https://www.linkedin.com/in/bharath-m-a34507316"
                path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"
              />
              <SocialIcon
                name="X"
                href="https://x.com/theduskdaawnn"
                path="M18 6L6 18M6 6l12 12"
              />
              <SocialIcon
                name="YouTube"
                href="https://www.youtube.com/@bybharatth"
                path="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M10 15V9l5.2 3z"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div
        style={{
          padding: '20px 48px',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap' as const,
          gap: '12px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            color: '#1a1a1a',
            opacity: 0.35,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            fontWeight: 500,
          }}
        >
          © 2026 COPYRIGHT. ALL RIGHTS RESERVED.
        </span>
        <span
          style={{
            fontSize: '11px',
            color: '#1a1a1a',
            opacity: 0.35,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            fontWeight: 500,
          }}
        >
          BUILT WITH OBSESSION.
        </span>
      </div>

      {/* Full-width wordmark */}
      <div style={{ overflow: 'hidden', lineHeight: 0.85 }}>
        <h1
          style={{
            fontSize: 'clamp(80px, 18vw, 280px)',
            fontWeight: 900,
            color: '#1a1a1a',
            letterSpacing: '-0.03em',
            whiteSpace: 'nowrap' as const,
            margin: 0,
            padding: '0 20px',
            lineHeight: 0.85,
            userSelect: 'none' as const,
          }}
        >
          BHARATH.
        </h1>
      </div>
    </div>
  );
}

function SocialIcon({
  name,
  href,
  path,
}: {
  name: string;
  href: string;
  path: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      title={name}
      style={{
        width: '40px',
        height: '40px',
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1a1a1a',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path} />
      </svg>
    </motion.a>
  );
}