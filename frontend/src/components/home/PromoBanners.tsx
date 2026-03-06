import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'New Seller Bonus',
    subtitle: 'Start selling today & get RM500 credits',
    cta: 'Register Now',
    link: '/seller/register',
    bgClass: 'bg-gradient-to-br from-primary to-primary/80',
    textClass: 'text-primary-foreground',
  },
  {
    id: 2,
    title: 'Free Shipping',
    subtitle: 'On all orders above RM150',
    cta: 'Shop Now',
    link: '/shop',
    bgClass: 'bg-gradient-to-br from-accent to-accent/80',
    textClass: 'text-accent-foreground',
  },
  {
    id: 3,
    title: 'Exclusive App Deals',
    subtitle: 'Get extra 10% off on app orders',
    cta: 'Download App',
    link: '/app',
    bgClass: 'bg-gradient-to-br from-success to-success/80',
    textClass: 'text-success-foreground',
  },
];

const PromoBanners = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-main">
        <div className="grid md:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              to={banner.link}
              className={`${banner.bgClass} ${banner.textClass} rounded-xl p-6 group hover:shadow-medium transition-shadow duration-200`}
            >
              <h3 className="text-xl font-bold mb-1">{banner.title}</h3>
              <p className="text-sm opacity-90 mb-4">{banner.subtitle}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all duration-200">
                {banner.cta}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
