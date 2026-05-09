'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Hide when scrolling DOWN, show when scrolling UP
    if (latest > lastScrollY && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 80);
    setLastScrollY(latest);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: '-100%', opacity: 0 },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '48px',
        paddingRight: '48px',
        paddingTop: '28px',
        paddingBottom: '28px',
        backgroundColor: isScrolled ? 'rgba(13,13,13,0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        transition: 'background-color 0.5s ease',
      }}
    >
      {/* Brand Name */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
          BHARATH
        </span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#E8341C' }}>.</span>
      </Link>

      {/* Nav Items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <NavLink href="#services">WHAT WE DO</NavLink>
        {/* <NavLink href="#about">OUR JOURNEY</NavLink> */}

        <Link href="#contact" style={{ display: 'flex', alignItems: 'center', height: '38px', textDecoration: 'none' }}>
          <div style={{
            height: '100%',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRight: 'none',
            backgroundColor: 'transparent',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#ffffff', letterSpacing: '0.1em' }}>
              TAKE THE NEXT STEP
            </span>
          </div>
          <div style={{
            height: '100%',
            width: '38px',
            backgroundColor: '#E8341C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '16px', color: '#ffffff', lineHeight: 1 }}>→</span>
          </div>
        </Link>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{
        height: '38px',
        border: '1px solid rgba(255,255,255,0.6)',
        backgroundColor: 'transparent',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '11px', fontWeight: 500, color: '#ffffff', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
          {children}
        </span>
      </div>
    </Link>
  );
}