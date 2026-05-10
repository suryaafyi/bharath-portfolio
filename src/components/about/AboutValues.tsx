'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
    {
        tag: 'COLLABORATIVE SPIRIT',
        title: 'Create together,\nalways',
        body: 'Our strength comes from our relationships. Respecting our clients and trusting the creative process delivers work that genuinely connects with an audience.',
        image: '/images/collab-sprit.jpeg',
        bg: '#EFEFED',
        textColor: '#1a1a1a',
        imageLeft: false,
    },
    {
        tag: 'GENUINE PASSION',
        title: 'Care about\nevery frame',
        body: 'Our passion shows in the details. From pacing and rhythm to colour grading and sound design, every decision is made with care and intent. We are driven by a genuine love of the craft.',
        image: 'https://pub-abc9673bee79483f90f3afd3e4864cd6.r2.dev/frame.MOV',
        bg: '#EFEFED',
        textColor: '#1a1a1a',
        imageLeft: true,
    },
    {
        tag: 'EXCEPTIONAL QUALITY',
        title: 'Raise the\nstandard',
        body: 'By combining advanced technical craftsmanship with cinematic vision, we create work that doesn\'t just impress — it resonates. Every frame is refined to hold attention and elevate the brands we work with.',
        image: 'https://pub-abc9673bee79483f90f3afd3e4864cd6.r2.dev/excep-quality.MP4',
        bg: '#EFEFED',
        textColor: '#1a1a1a',
        imageLeft: false,
    },
    {
        tag: 'STORYTELLING FIRST',
        title: 'Every edit\ntells a story',
        body: 'Before we touch the timeline, we understand the narrative. Great editing isn\'t about the tools — it\'s about knowing which moments matter, which to cut, and which to let breathe. Story always leads.',
        image: 'https://pub-abc9673bee79483f90f3afd3e4864cd6.r2.dev/story-telling.mp4',
        bg: '#EFEFED',
        textColor: '#1a1a1a',
        imageLeft: true,
    },
    {
        tag: 'BUILT ON TRUST',
        title: 'Reliable.\nEvery time.',
        body: 'Deadlines are sacred. Communication is constant. We treat every project — whether it\'s a 30-second reel or a 30-minute documentary — with the same level of professionalism and commitment. Trust is earned frame by frame.',
        image: 'https://pub-abc9673bee79483f90f3afd3e4864cd6.r2.dev/build-on-trust.mp4',
        bg: '#EFEFED',
        textColor: '#1a1a1a',
        imageLeft: false,
    }
];

export default function AboutValues() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        const ctx = gsap.context(() => {
            const totalWidth = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: () => `+=${totalWidth}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ overflow: 'hidden', background: '#1a1a1a' }}
        >
            <div
                ref={trackRef}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: `${VALUES.length * 100}vw`,
                }}
            >
                {VALUES.map((value, i) => (
                    <ValueSlide key={i} value={value} index={i} />
                ))}
            </div>
        </div>
    );
}

function ValueSlide({
    value,
    index,
}: {
    value: (typeof VALUES)[0];
    index: number;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                flexShrink: 0,
                display: 'grid',
                gridTemplateColumns: value.imageLeft ? '1fr 1fr' : '1fr 1fr',
                background: '#1a1a1a',
                padding: '32px',
                gap: '32px',
                boxSizing: 'border-box',
            }}
        >
            {/* Text card */}
            <div
                style={{
                    order: value.imageLeft ? 2 : 1,
                    background: value.bg,
                    borderRadius: '12px',
                    padding: '48px 48px 48px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                {/* Tag top */}
                <span
                    style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.2em',
                        color: value.textColor,
                        opacity: 0.45,
                        textTransform: 'uppercase',
                    }}
                >
                    {value.tag}
                </span>

                {/* Title + body bottom */}
                <div>
                    <h2
                        style={{
                            fontSize: 'clamp(36px, 4.5vw, 68px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.0,
                            color: value.textColor,
                            marginBottom: '24px',
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {value.title}
                    </h2>
                    <p
                        style={{
                            fontSize: '15px',
                            lineHeight: 1.75,
                            color: value.textColor,
                            opacity: 0.6,
                            maxWidth: '400px',
                        }}
                    >
                        {value.body}
                    </p>
                </div>
            </div>

            {/* Image/Video */}
            <div
                onMouseEnter={() => {
                    if (videoRef.current) videoRef.current.muted = false;
                }}
                onMouseLeave={() => {
                    if (videoRef.current) videoRef.current.muted = true;
                }}
                style={{
                    order: value.imageLeft ? 1 : 2,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#333',
                }}
            >
                {value.image.toLowerCase().endsWith('.mp4') ||
                    value.image.toLowerCase().endsWith('.mov') ? (
                    <video
                        ref={videoRef}
                        src={value.image}
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
                ) : (
                    <img
                        src={value.image}
                        alt={value.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                )}
            </div>
        </div>
    );
}