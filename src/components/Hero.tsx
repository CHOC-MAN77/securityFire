
import { useState } from 'react';
import { Flame, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Nos services', href: '#services' },
  { label: 'À propos', href: '#about' },
  { label: 'Témoignages', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Hero() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center text-white flex flex-col" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col flex-grow">
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <a href="#" className="flex items-center gap-2" onClick={() => scrollTo('#hero')}>
              <Flame className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight">BESI</span>
            </a>

            <nav className="hidden md:flex items-center">
              <ul className="flex gap-8">
                {navItems.map(item => (
                  <li key={item.label}>
                    <a href={item.href} onClick={(e) => { e.preventDefault(); scrollTo(item.href); }} className="font-semibold text-lg hover:text-primary transition-colors duration-300">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <button className="md:hidden p-2" onClick={() => setMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/80 backdrop-blur-sm"
            >
              <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <ul className="flex flex-col gap-4">
                  {navItems.map(item => (
                    <li key={item.label}>
                      <a href={item.href} onClick={(e) => { e.preventDefault(); scrollTo(item.href); }} className="block font-semibold text-lg hover:text-primary transition-colors duration-300 py-2">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-grow flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-shadow-lg">
                Votre Expert en Sécurité Incendie
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">
                Des solutions complètes pour la protection des entreprises, commerces et copropriétés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button onClick={() => scrollTo('#contact')} className="bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Obtenir un Devis Gratuit
                </button>
                <button onClick={() => scrollTo('#services')} className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-primary transition-all duration-300">
                  Découvrir nos services
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
