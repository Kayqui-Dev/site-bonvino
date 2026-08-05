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

export default function App() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col font-sans selection:bg-champagne selection:text-obsidian">
      {/* Floating Pill Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <PracticeAreas />
        <AboutPartners />
        <Manifesto />
        <Testimonials />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Action Button */}
      <WhatsAppFloat />
    </div>
  );
}
