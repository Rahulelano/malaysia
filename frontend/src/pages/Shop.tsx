import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import api from '@/services/api';
import { toast } from 'sonner';

const categories = ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books'];
const priceRanges = ['Under RM100', 'RM100 - RM500', 'RM500 - RM1000', 'Above RM1000'];

const FilterSidebar = () => (
  <div className="space-y-6">
    {/* Categories */}
    <div>
      <h3 className="font-semibold mb-3">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2 cursor-pointer">
            <Checkbox id={category} />
            <span className="text-sm">{category}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Price Range */}
    <div>
      <h3 className="font-semibold mb-3">Price Range</h3>
      <div className="space-y-2">
        {priceRanges.map((range) => (
          <label key={range} className="flex items-center gap-2 cursor-pointer">
            <Checkbox id={range} />
            <span className="text-sm">{range}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Custom Price */}
    <div>
      <h3 className="font-semibold mb-3">Custom Price</h3>
      <div className="flex gap-2 items-center">
        <Input type="number" placeholder="Min" className="w-20" />
        <span className="text-muted-foreground">-</span>
        <Input type="number" placeholder="Max" className="w-20" />
        <Button size="sm" variant="secondary">Go</Button>
      </div>
    </div>

    {/* Rating */}
    <div>
      <h3 className="font-semibold mb-3">Customer Rating</h3>
      <div className="space-y-2">
        {[4, 3, 2, 1].map((rating) => (
          <label key={rating} className="flex items-center gap-2 cursor-pointer">
            <Checkbox id={`rating-${rating}`} />
            <span className="text-sm">{rating}★ & above</span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

const Shop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');

        // Map backend product structure to frontend ProductCard props if needed
        const mappedProducts = data.map((p: any) => ({
          id: p._id,
          name: p.name,
          price: p.price,
          image: p.images && p.images.length > 0 ? p.images[0] : "",
          rating: 4.5, // Default rating as backend doesn't have it yet
          reviews: 0,
          category: p.category,
          discount: 0
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Shop All Products - Malasiyakart</title>
        <meta
          name="description"
          content="Browse thousands of products from trusted sellers. Find electronics, fashion, home goods and more at the best prices."
        />
      </Helmet>

      <Layout>
        <div className="container-main section-padding">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">Shop</span>
          </nav>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <FilterSidebar />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{products.length > 0 ? 1 : 0}-{products.length}</span> of{' '}
                  <span className="font-medium text-foreground">{products.length}</span> products
                </p>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterSidebar />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="hidden sm:flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-secondary' : ''}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-secondary' : ''}`}
                    >
                      <LayoutList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="text-center py-12">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No products found.</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="secondary" size="sm">1</Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shop;
