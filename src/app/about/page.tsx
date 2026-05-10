import AboutHero from '@/components/about/AboutHero';
import AboutValues from '@/components/about/AboutValues';
import ContactSection from '@/components/sections/ContactSection';
import Navbar from '@/components/layout/Navbar';

export default function AboutPage() {
    return (
        <main style={{ minHeight: '100vh' }}>
            <Navbar />
            <AboutHero />
            <AboutValues />
            <ContactSection />
        </main>
    );
}