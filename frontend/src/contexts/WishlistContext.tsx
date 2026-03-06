import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define Interface locally or import from a shared types file
export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    rating: number;
    reviewCount: number;
    seller: string;
    inStock: boolean;
    description?: string;
    images?: string[];
    highlights?: string[];
    specifications?: Record<string, string>;
}

interface WishlistContextType {
    items: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Product[]>(() => {
        const savedItems = localStorage.getItem('wishlistItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(items));
    }, [items]);

    const addToWishlist = (product: Product) => {
        setItems((current) => {
            if (current.find((item) => item.id === product.id)) {
                return current;
            }
            toast.success('Added to wishlist');
            return [...current, product];
        });
    };

    const removeFromWishlist = (id: string) => {
        setItems((current) => current.filter((item) => item.id !== id));
        toast.info('Removed from wishlist');
    };

    const isInWishlist = (id: string) => {
        return items.some((item) => item.id === id);
    };

    const clearWishlist = () => {
        setItems([]);
    };

    return (
        <WishlistContext.Provider
            value={{
                items,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
