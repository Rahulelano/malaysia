import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import OptimizedImage from '@/components/common/OptimizedImage';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'sale' | 'new' | 'bestseller';
  seller?: string;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge,
  seller,
}: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(id);

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name,
        image,
        price,
        originalPrice: originalPrice || price,
        rating,
        reviewCount,
        seller: seller || 'Malasiyakart Seller',
        category: 'General', // Default or passed prop
        inStock: true, // Default
      });
    }
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      image,
      price,
      originalPrice: originalPrice || price,
      seller: seller || 'Malasiyakart Seller',
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(e);
    navigate('/checkout');
  };

  return (
    <div
      className="card-product group relative h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist button */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-card transition-colors"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={cn(
            'w-4 h-4 transition-colors',
            isWishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground'
          )}
        />
      </button>

      {/* Badge */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span
            className={cn(
              'text-xs font-medium px-2 py-1 rounded',
              badge === 'sale' && 'bg-destructive text-destructive-foreground',
              badge === 'new' && 'bg-primary text-primary-foreground',
              badge === 'bestseller' && 'bg-accent text-accent-foreground'
            )}
          >
            {badge === 'sale' && `${discount}% OFF`}
            {badge === 'new' && 'NEW'}
            {badge === 'bestseller' && 'BESTSELLER'}
          </span>
        </div>
      )}

      {/* Image */}
      <Link to={`/product/${id}`} className="block aspect-[4/3] overflow-hidden bg-secondary">
        <OptimizedImage
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col">
        {seller && (
          <p className="text-xs text-muted-foreground mb-1">{seller}</p>
        )}

        <Link to={`/product/${id}`} className="flex-1">
          <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-rating text-rating" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="text-[11px] text-muted-foreground">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap mt-auto">
          <span className="price-current text-base">RM {price.toFixed(2)}</span>
          {originalPrice && (
            <>
              <span className="price-original text-xs line-through">RM {originalPrice.toFixed(2)}</span>
              <span className="price-discount text-xs text-destructive">{discount}% off</span>
            </>
          )}
        </div>

        {/* Buttons (visible on hover) */}
        <div
          className={cn(
            'mt-2 transition-all duration-200 grid grid-cols-2 gap-2',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none h-0 overflow-hidden'
          )}
        >
          <Button size="sm" variant="outline" className="gap-1.5 text-[10px] h-8 px-2" onClick={handleAddToCart}>
            <ShoppingCart className="w-3 h-3" />
            Cart
          </Button>
          <Button size="sm" className="gap-1.5 text-[10px] h-8 px-2" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
