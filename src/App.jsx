import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PracticeAreas from './components/PracticeAreas';
import AboutPartners from './components/AboutPartners';
import Manifesto from './components/Manifesto';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Reveal from './components/Reveal';

export default function App() {
  return (
    <div className="min-h-screen bg-navy text-ivory flex flex-col font-sans selection:bg-platinum selection:text-navy">
      <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
      {/* Floating Pill Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main id="main-content" tabIndex={-1} className="min-w-0 flex-grow">
        <Hero />
        <PracticeAreas />
        <Reveal>
          <AboutPartners />
        </Reveal>
        <Reveal>
          <Manifesto />
        </Reveal>
        <Reveal>
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
