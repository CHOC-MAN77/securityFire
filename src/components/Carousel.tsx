import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import '../carousel.css';
import imageData from '../images.json';

export const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 }, [
    Autoplay({ delay: 2000, stopOnInteraction: false }),
    WheelGesturesPlugin(),
  ]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {imageData.realisationsImages.map((image, index) => (
          <div className="embla__slide" key={index}>
            <img
              src={image.imageUrl}
              alt={image.description}
              className="embla__slide__img"
            />
            <div className="embla__slide__description">
              {image.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
