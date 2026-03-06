import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import api from '@/services/api';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');

        // Map backend product structure to frontend ProductCard props
        const mappedProducts = data.slice(0, 8).map((p: any) => ({
          id: p._id,
          name: p.name,
          price: p.price,
          image: p.images && p.images.length > 0 ? p.images[0] : "",
          rating: 4.5,
          reviews: 0,
          category: p.category,
          discount: 0
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-1">Top picks from trusted sellers</p>
          </div>
          <Link to="/shop">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
