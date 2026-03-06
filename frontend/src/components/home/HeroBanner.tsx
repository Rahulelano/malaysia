import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import api from '@/services/api';

interface BannerSlide {
  _id: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  bgColor: string;
  textColor: string;
  image?: string;
}

const HeroBanner = () => {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await api.get('/hero');
        setSlides(data);
      } catch (error) {
        console.error('Failed to fetch hero slides', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  if (loading) {
    return <div className="h-[280px] sm:h-[350px] lg:h-[420px] bg-secondary animate-pulse" />;
  }

  if (slides.length === 0) return null;

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[280px] sm:h-[350px] lg:h-[420px]">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${index === currentSlide
              ? 'opacity-100 translate-x-0'
              : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
              }`}
          >
            {/* Background Layer */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}>
              {slide.image && (
                <>
                  <img
                    src={slide.image?.startsWith('http') ? slide.image : slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Subtle dark overlay for text contrast on image slides */}
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
                </>
              )}
            </div>

            {/* Content Layer */}
            <div className="relative h-full container-main flex items-center px-4 md:px-8">
              <div className="max-w-2xl animate-slide-up">
                <h2 className={`text-3xl sm:text-5xl lg:text-7xl font-black mb-4 leading-tight drop-shadow-lg ${slide.image ? 'text-white' : slide.textColor}`}>
                  {slide.title}
                </h2>
                <p className={`text-lg sm:text-xl md:text-2xl mb-8 font-medium drop-shadow-md ${slide.image ? 'text-gray-100' : slide.textColor}`}>
                  {slide.subtitle}
                </p>
                <Link to={slide.link}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-10 py-7 text-lg shadow-xl hover:scale-105 transition-transform group">
                    {slide.cta}
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-card transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-card transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentSlide
              ? 'bg-primary w-6'
              : 'bg-primary/30 hover:bg-primary/50'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
