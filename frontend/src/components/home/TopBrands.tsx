import { Link } from 'react-router-dom';

const brands = [
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', slug: 'apple' },
  { name: 'Samsung', logo: 'https://images.unsplash.com/photo-1587817229766-65fa3f8fda04?w=100&h=100&fit=crop', slug: 'samsung' },
  { name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop', slug: 'nike' },
  { name: 'Sony', logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop', slug: 'sony' },
  { name: 'Dyson', logo: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100&h=100&fit=crop', slug: 'dyson' },
  { name: 'Canon', logo: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop', slug: 'canon' },
];

const TopBrands = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-main">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Top Brands</h2>
          <p className="text-muted-foreground mt-1">Shop from authorized brand stores</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              to={`/brand/${brand.slug}`}
              className="group bg-card rounded-lg border border-border p-6 flex items-center justify-center hover:border-primary/50 hover:shadow-soft transition-all duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBrands;
