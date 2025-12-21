import { FileText } from 'lucide-react';

export default function StickyButton() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToContact}
      className="fixed bottom-6 right-6 bg-primary text-white px-6 py-4 rounded-full shadow-xl hover:bg-primary-dark transition-all hover:scale-105 flex items-center gap-2 z-50"
    >
      <FileText className="w-5 h-5" />
      <span className="font-semibold hidden sm:inline">Demander un devis</span>
      <span className="font-semibold sm:hidden">Devis</span>
    </button>
  );
}
