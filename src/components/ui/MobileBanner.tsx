'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show if on mobile and not dismissed in this session
        const isMobile = window.innerWidth <= 768;
        const isDismissed = sessionStorage.getItem('mobile_banner_dismissed');
        
        if (isMobile && !isDismissed) {
            setIsVisible(true);
        }
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('mobile_banner_dismissed', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 2000,
                        background: '#E8341C',
                        color: '#ffffff',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        boxShadow: '0 4px 20px rgba(232, 52, 28, 0.3)',
                    }}
                >
                    <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 600, 
                        letterSpacing: '0.05em',
                        textAlign: 'center',
                        lineHeight: 1.4
                    }}>
                        FOR THE FULL CINEMATIC EXPERIENCE, VIEW ON A DESKTOP.
                    </span>
                    <button 
                        onClick={dismiss}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '12px',
                            cursor: 'pointer',
                            flexShrink: 0
                        }}
                    >
                        ✕
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
