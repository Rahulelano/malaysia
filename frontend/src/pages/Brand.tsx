import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, BadgeCheck } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Brand = () => {
    const { slug } = useParams();
    const brandName = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Brand';

    // Mock products based on brand
    const products = [
        {
            id: '101',
            name: `${brandName} Premium Pro Max`,
            price: 2499,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
            seller: `${brandName} Official Store`
        },
        {
            id: '102',
            name: `${brandName} Ultra Slim`,
            price: 1299,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
            seller: 'Retail King'
        },
        {
            id: '103',
            name: `${brandName} Essential`,
            price: 899,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
            seller: `${brandName} Official Store`
        },
        {
            id: '104',
            name: `${brandName} Lite`,
            price: 499,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
            seller: 'Mega Gadgets'
        }
    ];

    return (
        <>
            <Helmet>
                <title>{`${brandName} Store - Malasiyakart`}</title>
            </Helmet>
            <Layout>
                {/* Brand Banner / Header */}
                <div className="bg-primary/5 py-12">
                    <div className="container-main text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-4">
                            <span className="text-2xl font-bold px-4">{brandName}</span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                            Simply the Best from {brandName}
                            <BadgeCheck className="w-6 h-6 text-blue-500 fill-blue-500/10" />
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Shop 100% authentic {brandName} products with official warranty and support.
                        </p>
                    </div>
                </div>

                <div className="container-main section-padding">
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-muted-foreground">{products.length} Products found</p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter className="w-4 h-4" />
                                Filter
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        Sort by: Best Match
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Best Match</DropdownMenuItem>
                                    <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                                    <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                                    <DropdownMenuItem>Newest Arrivals</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link key={product.id} to={`/product/${product.id}`} className="group">
                                <div className="card-product h-full flex flex-col">
                                    <div className="aspect-square relative overflow-hidden bg-muted">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <p className="text-xs text-muted-foreground mb-1">{product.seller}</p>
                                        <h3 className="font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <div className="mt-auto">
                                            <span className="font-semibold">RM {product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Brand;
