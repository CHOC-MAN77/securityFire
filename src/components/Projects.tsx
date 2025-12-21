import { EmblaCarousel } from './Carousel'

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Nos Réalisations en Images</h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Découvrez un aperçu de nos projets et installations.
          </p>
        </div>

        <EmblaCarousel />

      </div>
    </section>
  );
}
