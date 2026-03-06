import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Package, Upload, DollarSign, Layers, FileText, Image as ImageIcon } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';

const AddProduct = () => {
    const { user } = useAuth();
    const isUnverifiedSeller = user?.role === 'seller' && !user?.isVerified;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        image: '',
        stock: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (value: string) => {
        setFormData({ ...formData, category: value });
    };

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            // Use direct axios call if api instance adds conflicting headers, 
            // but usually a good axios instance handles formData correctly by letting browser set boundary
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await api.post('/upload', formData, config);

            // Backend returns path like '/uploads/image.jpg'
            setFormData(prev => ({ ...prev, image: data }));
            setUploading(false);
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error('Image upload failed');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
                stock: parseInt(formData.stock),
                images: [formData.image]
            };

            await api.post('/products', productData);
            toast.success('Product created successfully!');
            navigate('/seller/products');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Add New Product - Malasiyakart Seller Center</title>
            </Helmet>

            <Layout>
                <div className="container-main section-padding">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <DashboardSidebar />

                        <div className="flex-1">
                            <div className="max-w-2xl">
                                <div className="mb-6">
                                    <h1 className="text-3xl font-bold">Add New Product</h1>
                                    <p className="text-muted-foreground">List a new product to your shop</p>
                                </div>

                                <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                                    {isUnverifiedSeller && (
                                        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3 text-amber-800">
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            <div>
                                                <p className="font-bold">Account Pending Approval</p>
                                                <p className="text-sm">Your account is currently under review by our admin team. You will be able to publish products once your account has been approved.</p>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-4">
                                            <h2 className="text-xl font-semibold flex items-center gap-2 text-primary">
                                                <Package className="w-5 h-5" />
                                                Basic Information
                                            </h2>

                                            <div className="space-y-2">
                                                <Label htmlFor="name">Product Name</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="e.g. Wireless Noise Cancelling Headphones"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isUnverifiedSeller}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    name="description"
                                                    placeholder="Describe your product features and specifications..."
                                                    className="min-h-[120px]"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isUnverifiedSeller}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h2 className="text-xl font-semibold flex items-center gap-2 text-primary">
                                                    <DollarSign className="w-5 h-5" />
                                                    Pricing & Inventory
                                                </h2>

                                                <div className="space-y-2">
                                                    <Label htmlFor="originalPrice">Original Price (RM)</Label>
                                                    <Input
                                                        id="originalPrice"
                                                        name="originalPrice"
                                                        type="number"
                                                        min="0.01"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        value={formData.originalPrice}
                                                        onChange={handleChange}
                                                        disabled={isUnverifiedSeller}
                                                    />
                                                    <p className="text-xs text-muted-foreground">Set higher than Price to show discount.</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="price">Sale Price (RM)</Label>
                                                    <Input
                                                        id="price"
                                                        name="price"
                                                        type="number"
                                                        min="0.01"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        value={formData.price}
                                                        onChange={handleChange}
                                                        required
                                                        disabled={isUnverifiedSeller}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="stock">Stock Quantity</Label>
                                                    <Input
                                                        id="stock"
                                                        name="stock"
                                                        type="number"
                                                        min="1"
                                                        placeholder="Available units"
                                                        value={formData.stock}
                                                        onChange={handleChange}
                                                        required
                                                        disabled={isUnverifiedSeller}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h2 className="text-xl font-semibold flex items-center gap-2 text-primary">
                                                    <Layers className="w-5 h-5" />
                                                    Categorization
                                                </h2>

                                                <div className="space-y-2">
                                                    <Label>Category</Label>
                                                    <Select onValueChange={handleCategoryChange} required disabled={isUnverifiedSeller}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Electronics">Electronics</SelectItem>
                                                            <SelectItem value="Fashion">Fashion</SelectItem>
                                                            <SelectItem value="Home & Living">Home & Living</SelectItem>
                                                            <SelectItem value="Beauty">Beauty</SelectItem>
                                                            <SelectItem value="Sports">Sports</SelectItem>
                                                            <SelectItem value="Books">Books</SelectItem>
                                                            <SelectItem value="Toys">Toys</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="image-upload" className="flex items-center gap-2">
                                                        Product Image
                                                    </Label>
                                                    <div className="flex items-center gap-4">
                                                        <Input
                                                            id="image-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={uploadFileHandler}
                                                            className="cursor-pointer"
                                                            disabled={isUnverifiedSeller}
                                                        />
                                                        {uploading && <div className="text-xs text-muted-foreground animate-pulse">Uploading...</div>}
                                                    </div>

                                                    {formData.image && (
                                                        <div className="mt-2 relative w-full h-32 bg-muted rounded-md overflow-hidden border border-border">
                                                            <img
                                                                src={formData.image}
                                                                alt="Product Preview"
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Button type="submit" size="lg" className="w-full btn-primary" disabled={loading || uploading || isUnverifiedSeller}>
                                                {loading ? 'Publishing...' : isUnverifiedSeller ? 'Pending Approval' : 'Publish Product'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default AddProduct;
