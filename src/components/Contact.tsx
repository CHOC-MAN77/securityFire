
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send,  } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    requestType: 'Installation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSubmitted(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          phone: '',
          requestType: 'Installation',
          message: ''
        });
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Contactez-nous</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Une question, un projet, ou simplement besoin d'un conseil ? Nous sommes là pour vous aider.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg text-center shadow-md transform hover:scale-105 transition-transform duration-300">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-primary mb-2">Par téléphone</h3>
            <a href="tel:+33 6 36 11 52 63" className="text-lg text-gray-800 hover:text-primary transition-colors">+33 6 36 11 52 63</a>
          </div>

          <div className="bg-white p-8 rounded-lg text-center shadow-md transform hover:scale-105 transition-transform duration-300">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-primary mb-2">Par email</h3>
            <a href="mailto:besi.services.incendie@gmail.com" className="text-lg text-gray-800 hover:text-primary transition-colors break-all">
              besi.services.incendie@gmail.com
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg text-center shadow-md transform hover:scale-105 transition-transform duration-300">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-primary mb-2">Horaires d'ouverture</h3>
            <p className="text-lg text-gray-800">Lundi – Vendredi<br />8:30 – 18:00</p>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-8">Formulaire de contact</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="peer w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary" required placeholder=" " />
                    <label htmlFor="firstName" className="absolute left-4 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">Prénom</label>
                  </div>
                  <div className="relative">
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="peer w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary" required placeholder=" " />
                    <label htmlFor="lastName" className="absolute left-4 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">Nom</label>
                  </div>
                </div>

                <div className="relative">
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="peer w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary" placeholder=" " />
                  <label htmlFor="company" className="absolute left-4 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">Société (facultatif)</label>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="peer w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary" required placeholder=" " />
                    <label htmlFor="email" className="absolute left-4 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">Email</label>
                  </div>
                  <div className="relative">
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="peer w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary" placeholder=" " />
                    <label htmlFor="phone" className="absolute left-4 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">Téléphone</label>
                  </div>
                </div>

                <div className="relative">
                  <select id="requestType" name="requestType" value={formData.requestType} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary" required>
                    <option>Installation</option>
                    <option>Maintenance</option>
                    <option>Formation</option>
                    <option>Devis</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div className="relative">
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="peer w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary" rows={5} required placeholder=" "></textarea>
                  <label htmlFor="message" className="absolute left-4 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">Votre message</label>
                </div>

                {submitted && (
                  <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg">
                    Merci ! Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.
                  </div>
                )}

                {error && (
                  <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg">
                    Une erreur s'est produite. Veuillez vérifier vos informations et réessayer.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Envoyer le message
                </button>
              </form>
            </div>

            <div>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                        <h3 className="font-bold text-primary mb-2">Notre adresse</h3>
                        <p className="text-gray-800">40 Avenue du Président Allende<br />91100 Corbeil-Essonnes</p>
                        <p className="text-sm text-gray-500 mt-2">SIRET : 123 456 789 00010</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2638.6044179098317!2d2.473624411351657!3d48.598272718857835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5e726dc9f91af%3A0x751ef5834804f490!2s40%20Av.%20du%20Pr%C3%A9sident%20Allende%2C%2091100%20Corbeil-Essonnes!5e0!3m2!1sfr!2sfr!4v1766245477114!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Carte BESI"
                ></iframe>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
