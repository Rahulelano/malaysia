import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Check,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import OptimizedImage from '@/components/common/OptimizedImage';
import api from '@/services/api';

const ProductDetail = () => {
  // Hooks must be called in the exact same order every render
  const { id } = useParams();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = id && product ? isInWishlist(product.id || product._id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        // Map backend response if needed, for now assuming similar structure or adapting
        const mappedProduct = {
          id: data._id,
          name: data.name,
          price: data.price,
          originalPrice: data.price, // Assuming no discount logic in backend yet
          image: data.images && data.images.length > 0 ? data.images[0] : "",
          images: data.images || [],
          description: data.description,
          seller: "Seller", // Placeholder
          rating: 4.5,
          reviewCount: 0,
          inStock: data.stock > 0,
          highlights: ["Fast Delivery", "Genuine Product"], // Placeholder
          specifications: {} // Placeholder
        };
        setProduct(mappedProduct);
        setSelectedImage(0);
        setQuantity(1);
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container-main section-padding text-center py-20">
          <p>Loading product details...</p>
        </div>
      </Layout>
    )
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-main section-padding text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button className="btn-primary">Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      seller: product.seller,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const images = (product.images && product.images.length > 0) ? product.images : [product.image];

  return (
    <>
      <Helmet>
        <title>{`${product.name} - Malasiyakart`}</title>
        <meta name="description" content={product.description?.slice(0, 160) || product.name} />
      </Helmet>

      <Layout>
        <div className="container-main section-padding">
          {/* Breadcrumb */}
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-muted-foreground mb-6 overflow-hidden whitespace-nowrap">
            <Link to="/" className="hover:text-primary flex-shrink-0">Home</Link>
            <span className="mx-2 flex-shrink-0">/</span>
            <Link to="/shop" className="hover:text-primary flex-shrink-0">Shop</Link>
            <span className="mx-2 flex-shrink-0">/</span>
            <span className="text-foreground truncate">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-secondary rounded-xl overflow-hidden relative">
                {images[selectedImage] ? (
                  <OptimizedImage
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        'w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors',
                        selectedImage === index
                          ? 'border-primary'
                          : 'border-transparent hover:border-border'
                      )}
                    >
                      <OptimizedImage
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Product Info */}
              <div>
                {/* Seller */}
                <p className="text-sm text-primary font-medium mb-2">{product.seller}</p>

                {/* Title */}
                <h1 className="text-2xl lg:text-3xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 bg-success text-success-foreground px-2 py-1 rounded text-sm font-medium">
                    <span>{product.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {product.reviewCount.toLocaleString()} ratings
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold">RM {product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        RM {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-success font-semibold">{discount}% off</span>
                    </>
                  )}
                </div>

                {/* Highlights */}
                {product.highlights && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Highlights</h3>
                    <ul className="space-y-2">
                      {product.highlights.map((highlight: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button size="lg" className="flex-1 gap-2 btn-accent" onClick={handleAddToCart} disabled={!product.inStock}>
                    <ShoppingCart className="w-5 h-5" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <Button size="lg" className="flex-1 btn-primary" onClick={handleBuyNow} disabled={!product.inStock}>
                    Buy Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleWishlistToggle}
                  >
                    <Heart
                      className={cn(
                        'w-5 h-5',
                        isWishlisted && 'fill-destructive text-destructive'
                      )}
                    />
                  </Button>
                  <Button size="lg" variant="outline">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* Delivery Info */}
                <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Free Delivery</p>
                      <p className="text-xs text-muted-foreground">
                        Delivery by Jan 8-10
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">7 Days Return</p>
                      <p className="text-xs text-muted-foreground">
                        Easy returns for peace of mind
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">1 Year Warranty</p>
                      <p className="text-xs text-muted-foreground">
                        Official manufacturer warranty
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-12">
              <Tabs defaultValue="description">
                <TabsList className="w-full justify-start border-b border-border rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="specifications"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    Reviews ({product.reviewCount})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <div className="prose prose-sm max-w-none">
                    {(product.description || '').split('\n\n').map((paragraph: string, index: number) => (
                      <p key={index} className="text-muted-foreground mb-4">
                        {paragraph}
                      </p>
                    ))}
                    {!product.description && (
                      <p className="text-muted-foreground italic">No description available.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="specifications" className="mt-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {product.specifications ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-3 border-b border-border"
                        >
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-medium">{value as string}</span>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8 text-muted-foreground italic">
                        No specifications available for this product.
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Reviews coming soon...</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetail;
