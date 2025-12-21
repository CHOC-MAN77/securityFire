
import { Flame, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const navLinks = [
    { label: 'Nos services', href: '#services' },
    { label: 'À propos', href: '#about' },
    { label: 'Témoignages', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    { label: 'Installation & maintenance alarme incendie', href: '#services' },
    { label: 'Maintenance portes coupe-feu', href: '#services' },
    { label: 'Maintenance blocs de secours', href: '#services' },
    { label: 'Installation système de désenfumage', href: '#services' },
    { label: 'Maintenance extincteurs', href: '#services' },
    { label: 'Audit et conseil', href: '#services' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={scrollToTop}>
              <Flame className="w-9 h-9 text-primary" />
              <span className="text-2xl font-bold text-white">BESI</span>
            </div>
            <p className="text-gray-400 mb-6">
              Votre partenaire de confiance pour une sécurité incendie complète et certifiée.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com/company/besi-fr" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/besi" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-primary transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Nos Prestations</h4>
            <ul className="space-y-3">
              {serviceLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-primary transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Informations de contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <a href="tel:+33 6 36 11 52 63" className="hover:text-primary transition-colors duration-300">+33 6 36 11 52 63</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <a href="mailto:besi.services.incendie@gmail.com" className="hover:text-primary transition-colors duration-300 break-all">besi.services.incendie@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>40 Avenue du Président Allende<br />91100 Corbeil-Essonnes</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center md:flex md:justify-between">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} BESI. Tous droits réservés.</p>
          <div className="flex gap-6 justify-center md:justify-end mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors duration-300">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
