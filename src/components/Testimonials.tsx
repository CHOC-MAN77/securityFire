
import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id?: number;
  name: string;
  company?: string;
  rating: number;
  message: string;
  service: string;
  created_at?: string;
}

const staticTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'M. Dubois',
    company: 'Syndic de copropriété "Le Chêne"',
    rating: 5,
    message: 'Intervention rapide et efficace pour la maintenance de notre système d\'alarme incendie. Un professionnel de confiance que je recommande.',
    service: 'Maintenance de systèmes d\'alarme',
  },
  {
    id: 2,
    name: 'Mme. Leclerc',
    company: 'Gérante du restaurant "La Belle Époque"',
    rating: 5,
    message: 'L\'installation des nouvelles portes coupe-feu a été réalisée avec un grand professionnalisme et dans le respect des délais. Le travail est impeccable.',
    service: 'Installation de portes coupe-feu',
  },
  {
    id: 3,
    name: 'Julien Martin',
    company: 'Directeur de l\'école "Les Petits Curieux"',
    rating: 4,
    message: 'Le système de désenfumage fonctionne parfaitement. L\'équipe a été très à l\'écoute de nos besoins spécifiques. Très satisfait du service.',
    service: 'Installation de système de désenfumage',
  },
];

export default function Testimonials() {
  const [testimonials] = useState<Testimonial[]>(staticTestimonials);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-20 bg-gray-50 overflow-hidden">
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
                    <div className="bg-white h-full p-8 rounded-lg shadow-md flex flex-col relative">
                      <Quote className="absolute top-4 left-4 w-12 h-12 text-gray-100" />
                      <div className="flex items-center mb-4 z-10">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 italic mb-6 flex-grow z-10">"{testimonial.message}"</p>
                      <div className="text-right z-10">
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
      </div>
    </section>
  );
}
