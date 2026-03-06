import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/common/OptimizedImage';
import { Filter, ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import api from '@/services/api';

const Category = () => {
    const { slug } = useParams();
    const categoryName = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Category';
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/products');
                // Filter client side for now as backend might not have category filtering yet
                const filtered = data.filter((p: any) =>
                    p.category.toLowerCase() === categoryName.toLowerCase() ||
                    (categoryName.toLowerCase() === 'electronics' && p.category === 'Electronics') // Fallback matching
                );

                const mappedProducts = filtered.map((p: any) => ({
                    id: p._id,
                    name: p.name,
                    price: p.price,
                    image: p.images && p.images.length > 0 ? p.images[0] : "",
                    seller: "Seller", // Backend needs to populate seller name
                }));
                setProducts(mappedProducts);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName]);


    return (
        <>
            <Helmet>
                <title>{`${categoryName} - Malasiyakart`}</title>
            </Helmet>
            <Layout>
                <div className="bg-secondary/30 py-8">
                    <div className="container-main">
                        <h1 className="text-3xl font-bold">{categoryName}</h1>
                        <p className="text-muted-foreground mt-2">Browse our best collection of {categoryName}</p>
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
                                        Sort by: Featured
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Featured</DropdownMenuItem>
                                    <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                                    <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                                    <DropdownMenuItem>Newest Arrivals</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">Loading products...</div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">No products found in this category.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <Link key={product.id} to={`/product/${product.id}`} className="group">
                                    <div className="card-product h-full flex flex-col">
                                        <div className="aspect-square relative overflow-hidden bg-muted">
                                            {product.image ? (
                                                <OptimizedImage
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                                            )}
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <p className="text-xs text-muted-foreground mb-1">{product.seller}</p>
                                            <h3 className="font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <div className="mt-auto">
                                                <span className="font-semibold">RM {product.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Category;
