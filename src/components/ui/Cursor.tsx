'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

type CursorType = 'default' | 'play' | 'video' | 'link' | 'view';

export default function Cursor() {
  const [cursorType, setCursorType] = useState<CursorType>('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isHeroVideo = target.closest('[data-cursor="play"]');
      const isSectionVideo = target.closest('video:not([data-cursor="play"])');
      const isView = target.closest('[data-cursor="view"]');
      const isClickable = target.closest('a, button, [data-cursor="link"]');

      if (isHeroVideo) {
        setCursorType('play');
      } else if (isView) {
        setCursorType('view');
      } else if (isSectionVideo) {
        setCursorType('video'); // expand + invert, no text
      } else if (isClickable) {
        setCursorType('link');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  const isHovered = cursorType !== 'default';

  const getSize = () => {
    switch (cursorType) {
      case 'play': return 80;
      case 'view': return 100;
      case 'video': return 56;
      case 'link': return 48;
      default: return 12;
    }
  };

  const getBg = () => {
    switch (cursorType) {
      case 'default': return '#E8341C';
      default: return '#F2F0EB'; // inverted light on hover
    }
  };

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[10000] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: getSize(),
        height: getSize(),
        backgroundColor: getBg(),
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250 }}
    >
      {cursorType === 'play' && (
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#111111',
            userSelect: 'none',
          }}
        >
          PLAY
        </span>
      )}
      {cursorType === 'view' && (
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#111111',
            userSelect: 'none',
          }}
        >
          VIEW
        </span>
      )}
    </motion.div>
  );
}