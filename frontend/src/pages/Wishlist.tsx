import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import OptimizedImage from '@/components/common/OptimizedImage';

import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

const Wishlist = () => {
    const { items, removeFromWishlist } = useWishlist();
    const { addItem } = useCart();

    const handleAddToCart = (item: any) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            originalPrice: item.originalPrice,
            image: item.image,
            seller: item.seller,
        });
    };

    if (items.length === 0) {
        return (
            <>
                <Helmet>
                    <title>My Wishlist - Malasiyakart</title>
                </Helmet>
                <Layout>
                    <div className="container-main section-padding text-center py-20">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
                        <p className="text-muted-foreground mb-8">
                            Explore more and shortlist some items.
                        </p>
                        <Link to="/shop">
                            <Button size="lg" className="btn-primary">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                </Layout>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>{`My Wishlist (${items.length}) - Malasiyakart`}</title>
            </Helmet>
            <Layout>
                <div className="container-main section-padding">
                    <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        My Wishlist
                        <span className="text-muted-foreground font-normal text-lg ml-2">({items.length} items)</span>
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map((item) => (
                            <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200">
                                <div className="relative aspect-square overflow-hidden group">
                                    <OptimizedImage
                                        src={item.image}
                                        alt={item.name}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {!item.inStock && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm">Out of Stock</span>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white text-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Remove from wishlist"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="p-4 flex flex-col flex-1">
                                    <Link to={`/product/${item.id}`} className="flex-1">
                                        <h3 className="font-medium line-clamp-2 mb-2 hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="font-bold text-lg">RM {item.price.toLocaleString()}</span>
                                        {item.originalPrice > item.price && (
                                            <span className="text-sm text-muted-foreground line-through">
                                                RM {item.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    <Button
                                        className="w-full gap-2"
                                        variant={item.inStock ? "default" : "secondary"}
                                        disabled={!item.inStock}
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Wishlist;
