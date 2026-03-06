import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/services/api';
import ProductCard from '@/components/products/ProductCard';

const DealsOfTheDay = () => {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await api.get('/products');
        // Filter products that have a discount (originalPrice > price)
        const deals = data
          .filter((p: any) => p.originalPrice && p.originalPrice > p.price)
          .slice(0, 4)
          .map((p: any) => ({
            id: p._id,
            name: p.name,
            image: p.images && p.images.length > 0 ? p.images[0] : "",
            price: p.price,
            originalPrice: p.originalPrice,
            rating: 4.5,
            reviewCount: 0,
            badge: 'sale' as const,
            seller: 'Malasiyakart Seller'
          }));
        setProducts(deals);
      } catch (error) {
        console.error("Failed to fetch deals", error);
      }
    };

    fetchDeals();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  if (products.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Deals of the Day</h2>
            <p className="text-muted-foreground mt-1">Limited time offers at best prices</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Countdown timer */}
            <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="font-mono font-semibold">
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </span>
            </div>

            <Link to="/shop">
              <Button variant="ghost" className="gap-2 text-primary hover:text-primary">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;
