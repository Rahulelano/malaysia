import { Link } from 'react-router-dom';
import {
  Smartphone,
  Shirt,
  Sofa,
  Sparkles,
  Dumbbell,
  BookOpen,
  Baby,
  ShoppingBag,
} from 'lucide-react';

const categories = [
  { name: 'Electronics', icon: Smartphone, slug: 'electronics', color: 'bg-blue-50 text-blue-600' },
  { name: 'Fashion', icon: Shirt, slug: 'fashion', color: 'bg-pink-50 text-pink-600' },
  { name: 'Home & Living', icon: Sofa, slug: 'home-living', color: 'bg-amber-50 text-amber-600' },
  { name: 'Beauty', icon: Sparkles, slug: 'beauty', color: 'bg-purple-50 text-purple-600' },
  { name: 'Sports', icon: Dumbbell, slug: 'sports', color: 'bg-green-50 text-green-600' },
  { name: 'Books', icon: BookOpen, slug: 'books', color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Toys & Kids', icon: Baby, slug: 'toys', color: 'bg-orange-50 text-orange-600' },
  { name: 'Grocery', icon: ShoppingBag, slug: 'grocery', color: 'bg-teal-50 text-teal-600' },
];

const CategoryStrip = () => {
  return (
    <section className="py-6 bg-card border-b border-border">
      <div className="container-main">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="flex flex-col items-center gap-2 min-w-[80px] group"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${category.color} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-center whitespace-nowrap relative">
                  {category.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryStrip;
