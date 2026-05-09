'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ROW_1 = [
  { name: 'Floofy Socials', text: 'Floofy Socials' },
  { name: 'Ourselves Podcast', text: 'Ourselves Podcast' },
  { name: 'WeFoundrs', text: 'WeFoundrs' },
  { name: 'Vantage Marketing Canada', text: "Vantage Marketing Canada" }
];

const ROW_2 = [
  { name: 'Vantage Marketing Canada', text: "Vantage Marketing Canada" },
  { name: 'WeFoundrs', text: 'WeFoundrs' },
  { name: 'Ourselves Podcast', text: 'Ourselves Podcast' },
  { name: 'Floofy Socials', text: 'Floofy Socials' }
];

export default function ClientMarquee() {
  return (
    <section
      style={{
        background: '#ffffff',
        padding: '120px 0 100px 0',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Header — left aligned, generous padding */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true }}
        style={{
          paddingLeft: '5vw',
          paddingRight: '5vw',
          marginBottom: '80px',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(56px, 9vw, 130px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 0.92,
            color: '#1a1a1a',
            marginBottom: '28px',
          }}
        >
          In good<br />company.
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.6,
            color: '#1a1a1a',
            opacity: 0.6,
            maxWidth: '480px',
            fontWeight: 400,
          }}
        >
          Big or small, local or international, we bring the same level of care
          to every project. We love working with teams that value honest, human
          connection.
        </p>
      </motion.div>

      {/* Marquee rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        <MarqueeRow items={ROW_1} direction="left" speed={40} />
        <MarqueeRow items={ROW_2} direction="right" speed={35} />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: { name: string; text: string }[];
  direction: 'left' | 'right';
  speed: number;
}) {
  const [paused, setPaused] = useState(false);
  const tripled = [...items, ...items, ...items];

  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '28px 0'
        // borderTop: '1px solid rgba(0,0,0,0.08)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
          ...(paused && { playState: 'paused' }),
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0px',
          width: 'max-content',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {tripled.map((client, i) => (
          <LogoItem key={i} name={client.text} />
        ))}
      </motion.div>
    </div>
  );
}

function LogoItem({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        transition: 'opacity 0.3s ease',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: 'clamp(16px, 1.8vw, 24px)',
          fontWeight: 600,
          letterSpacing: '0.02em',
          color: '#1a1a1a',
          opacity: hovered ? 1 : 0.35,
          transition: 'opacity 0.3s ease',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        {name}
      </span>
    </div>
  );
}