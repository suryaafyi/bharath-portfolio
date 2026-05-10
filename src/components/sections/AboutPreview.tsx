'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPreview() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.about-preview-content',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                background: '#EFEFED',
                padding: '120px 5vw',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '60px',
                    alignItems: 'center',
                    maxWidth: '1400px',
                    margin: '0 auto',
                }}
            >
                {/* Left — two scattered photos */}
                <div style={{ position: 'relative', height: '600px' }}>
                    {/* Main photo — bottom left */}
                    <motion.div
                        initial={{ opacity: 0, x: -40, rotate: -4 }}
                        whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                        viewport={{ once: true }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '62%',
                            aspectRatio: '3/4',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                            background: '#1a1a1a',
                        }}
                    >
                        <motion.video
                            src="https://pub-abc9673bee79483f90f3afd3e4864cd6.r2.dev/about-preview-01.MP4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

                    {/* Secondary photo — top right */}
                    <motion.div
                        initial={{ opacity: 0, x: 40, rotate: 3 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 2 }}
                        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                        viewport={{ once: true }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '55%',
                            aspectRatio: '4/3',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                            background: '#1a1a1a',
                        }}
                    >
                        <img
                            src="/images/about-preview-02.png"
                            alt="Timeline editing"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

                    {/* Circular stamp */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '38%',
                            left: '38%',
                            width: '90px',
                            height: '90px',
                            zIndex: 10,
                        }}
                    >
                        <svg viewBox="0 0 90 90" width="90" height="90">
                            <path
                                id="about-stamp"
                                d="M 45,45 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
                                fill="none"
                            />
                            <text fontSize="8.5" fontWeight="500" letterSpacing="3.2" fill="#E8341C">
                                <textPath href="#about-stamp">
                                    CAPTURING · HUMAN · SPIRIT ·
                                </textPath>
                            </text>
                        </svg>
                    </div>
                </div>

                {/* Right — text */}
                <div className="about-preview-content">
                    <h2
                        style={{
                            fontSize: 'clamp(40px, 5.5vw, 82px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.0,
                            color: '#1a1a1a',
                            marginBottom: '28px',
                        }}
                    >
                        Let Bharath's vision<br />drive yours.
                    </h2>

                    <p
                        style={{
                            fontSize: '16px',
                            lineHeight: 1.75,
                            color: '#1a1a1a',
                            opacity: 0.65,
                            maxWidth: '480px',
                            marginBottom: '40px',
                        }}
                    >
                        The editor behind every frame has poured years of obsession into
                        understanding what makes content stop thumbs and move hearts. Through
                        relentless craft and a cinematic eye, Bharath translates raw footage
                        into stories that resonate — for creators, brands, and everything
                        in between.
                    </p>

                    <Link
                        href="/about"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '14px',
                            textDecoration: 'none',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '12px',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                color: '#1a1a1a',
                                textTransform: 'uppercase',
                            }}
                        >
                            DISCOVER THE JOURNEY
                        </span>
                        <div
                            style={{
                                width: '38px',
                                height: '38px',
                                backgroundColor: '#E8341C',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '2px',
                                flexShrink: 0,
                            }}
                        >
                            <span style={{ color: '#fff', fontSize: '15px' }}>→</span>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}