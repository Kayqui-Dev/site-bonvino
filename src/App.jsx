import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PracticeAreas from './components/PracticeAreas';
import AboutPartners from './components/AboutPartners';
import Manifesto from './components/Manifesto';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Reveal from './components/Reveal';

export default function App() {
  return (
    <div className="min-h-screen bg-navy text-ivory flex flex-col font-sans selection:bg-platinum selection:text-navy">
      {/* Floating Pill Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <PracticeAreas />
        {/* Alternating slide reveals give the scroll a deliberate rhythm */}
        <Reveal from="right">
          <AboutPartners />
        </Reveal>
        <Reveal from="left">
          <Manifesto />
        </Reveal>
        <Reveal from="right">
          <Testimonials />
        </Reveal>
        <Reveal from="left">
          <ContactSection />
        </Reveal>
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Action Button */}
      <WhatsAppFloat />
    </div>
  );
}
