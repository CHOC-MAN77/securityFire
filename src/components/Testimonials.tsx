
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Testimonial {
  id?: number;
  name: string;
  company?: string;
  rating: number;
  message: string;
  service: string;
  created_at?: string;
}

const services = [
  "Audit et Conseil en Sécurité Incendie",
  "Installation et Maintenance de Systèmes de Sécurité Incendie (SSI)",
  "Solutions d'Extinction Automatique",
  "Formation du Personnel",
  "Désenfumage Naturel et Mécanique",
  "Signalisation et Éclairage de Sécurité"
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id' | 'created_at'> & { email: string }>({
    name: '',
    email: '',
    company: '',
    rating: 0,
    message: '',
    service: ''
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);


  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTestimonial({ ...newTestimonial, [name]: name === 'rating' ? parseInt(value, 10) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTestimonial),
      });

      if (response.ok) {
        toast.success('Merci pour votre témoignage ! Il sera examiné avant d\'être publié.');
        setNewTestimonial({ name: '', email: '', company: '', rating: 0, message: '', service: '' });
      } else {
        toast.error('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch (error) {
      toast.error('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 overflow-hidden">
      <ToastContainer />
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-12">
          Ce que nos clients disent de nous
        </h2>

        {testimonials.length > 0 && (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] p-4" key={testimonial.id}>
                    <div className="bg-white h-full p-8 rounded-lg shadow-md flex flex-col">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.message}"</p>
                      <div className="text-right">
                        <p className="font-bold text-primary">{testimonial.name}</p>
                        {testimonial.company && <p className="text-sm text-gray-500">{testimonial.company}</p>}
                        <p className="text-xs text-gray-400 mt-2">{testimonial.service}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="absolute top-1/2 -translate-y-1/2 -left-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition hidden md:block"
              onClick={scrollPrev}
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <button
              className="absolute top-1/2 -translate-y-1/2 -right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition hidden md:block"
              onClick={scrollNext}
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
          </div>
        )}

        <div className="mt-20">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-3xl font-bold text-primary text-center mb-8">Partagez votre expérience</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="relative">
                  <input type="text" id="name" name="name" value={newTestimonial.name} onChange={handleChange} className="peer w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required placeholder=" " />
                  <label htmlFor="name" className="absolute left-4 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">Votre nom</label>
                </div>
                <div className="relative">
                  <input type="email" id="email" name="email" value={newTestimonial.email} onChange={handleChange} className="peer w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required placeholder=" " />
                  <label htmlFor="email" className="absolute left-4 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">Votre email</label>
                </div>
              </div>
              <div className="relative mb-4">
                <input type="text" id="company" name="company" value={newTestimonial.company} onChange={handleChange} className="peer w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder=" " />
                <label htmlFor="company" className="absolute left-4 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">Votre entreprise (facultatif)</label>
              </div>
              <div className="relative mb-4">
                <select id="service" name="service" value={newTestimonial.service} onChange={handleChange} className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="" disabled>Sélectionnez un service</option>
                  {services.map(service => <option key={service} value={service}>{service}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Votre note</label>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <label key={i} className="cursor-pointer">
                      <input type="radio" name="rating" value={i + 1} onChange={handleChange} className="hidden" />
                      <svg className={`w-8 h-8 ${newTestimonial.rating > i ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    </label>
                  ))}
                </div>
              </div>
              <div className="relative mb-6">
                <textarea id="message" name="message" value={newTestimonial.message} onChange={handleChange} className="peer w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={4} required placeholder=" "></textarea>
                <label htmlFor="message" className="absolute left-4 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">Votre avis</label>
              </div>
              <div className="text-center">
                <button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Soumettre mon témoignage
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
