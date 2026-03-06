import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const SellerProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!user) return;
            try {
                // Fetch products where seller = current user
                // Backend needs to support filtering by seller query param
                const { data } = await api.get(`/products?seller=${user._id}`);
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                toast.error('Failed to load your products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete product');
        }
    };

    return (
        <>
            <Helmet>
                <title>My Products - Malasiyakart Seller Center</title>
            </Helmet>
            <Layout>
                <div className="container-main section-padding">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <DashboardSidebar />

                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold">My Products</h1>
                                <Link to="/seller/products/new">
                                    <Button className="gap-2">
                                        <Plus className="w-4 h-4" /> Add New Product
                                    </Button>
                                </Link>
                            </div>

                            {loading ? (
                                <div className="text-center py-12">Loading products...</div>
                            ) : products.length === 0 ? (
                                <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
                                    <p>No products found.</p>
                                    <p className="mt-2 text-sm">Start by adding your first product.</p>
                                </div>
                            ) : (
                                <div className="bg-card border border-border rounded-xl overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-secondary/50 border-b border-border">
                                                <tr>
                                                    <th className="p-4 font-medium">Product</th>
                                                    <th className="p-4 font-medium">Category</th>
                                                    <th className="p-4 font-medium">Price</th>
                                                    <th className="p-4 font-medium">Stock</th>
                                                    <th className="p-4 font-medium text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {products.map((product) => (
                                                    <tr key={product._id} className="hover:bg-secondary/20 transition-colors">
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-12 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0">
                                                                    {product.images && product.images[0] ? (
                                                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                                                                    )}
                                                                </div>
                                                                <span className="font-medium line-clamp-1">{product.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 text-muted-foreground">{product.category}</td>
                                                        <td className="p-4 font-medium">RM {product.price.toFixed(2)}</td>
                                                        <td className="p-4">
                                                            <span className={`px-2 py-1 rounded text-xs ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                {product.stock} in stock
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                {/* <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                                                                    <Edit className="w-4 h-4" />
                                                                </Button> */}
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 hover:text-destructive"
                                                                    onClick={() => handleDelete(product._id)}
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default SellerProducts;
