'use client';

import { motion } from 'framer-motion';

export default function AboutHero() {
    return (
        <section
            style={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
                background: '#1a1a1a',
            }}
        >
            {/* Background image */}
            <div style={{ position: 'absolute', inset: 0 }}>
                <img
                    src="/images/bharath-img.png"
                    alt="Behind the scenes"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.75,
                    }}
                />
                {/* Gradient bottom */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.2) 60%, transparent 100%)',
                    }}
                />
            </div>

            {/* Content pinned to bottom left */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '60px',
                    left: '5vw',
                    right: '5vw',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    alignItems: 'flex-end',
                    gap: '40px',
                }}
            >
                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                    style={{
                        fontSize: 'clamp(52px, 8vw, 120px)',
                        fontWeight: 700,
                        color: '#ffffff',
                        letterSpacing: '-0.03em',
                        lineHeight: 0.92,
                        margin: 0,
                    }}
                >
                    Our journey<br />so far.
                </motion.h1>

                {/* Body text — bottom right */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.55 }}
                    style={{
                        fontSize: '16px',
                        lineHeight: 1.75,
                        color: '#ffffff',
                        opacity: 0.75,
                        maxWidth: '480px',
                        margin: 0,
                    }}
                >
                    We are a video editing studio where craft and obsession matter most.
                    Bharath and his network of creatives have built this by blending
                    technical mastery with a truly personal approach — bringing every
                    client's vision to life, one frame at a time.
                </motion.p>
            </div>
        </section>
    );
}