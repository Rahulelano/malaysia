import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Users, Package, ShoppingCart, TrendingUp, Trash2, CheckCircle, Image as ImageIcon, Upload } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import api from '@/services/api';
import { toast } from 'sonner';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        usersCount: 0,
        productsCount: 0,
        ordersCount: 0,
        totalRevenue: 0
    });
    const [users, setUsers] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [heroes, setHeroes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [editingHero, setEditingHero] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const [heroFormData, setHeroFormData] = useState({
        title: '',
        subtitle: '',
        cta: 'Shop Now',
        link: '/shop',
        bgColor: 'from-primary/10 to-primary/5',
        textColor: 'text-foreground',
        image: '',
        isActive: true
    });

    const fetchData = async () => {
        try {
            // Stats, Users, Products
            const [statsRes, usersRes, productsRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/users'),
                api.get('/admin/products')
            ]);
            setStats(statsRes.data);
            setUsers(usersRes.data);
            setProducts(productsRes.data);

            // Fetch hero slides separately (to isolate 404s if any)
            try {
                const heroesRes = await api.get('/admin/hero');
                setHeroes(heroesRes.data);
            } catch (heroErr: any) {
                console.error("Hero API Error:", heroErr);
                if (heroErr.response?.status === 404) {
                    toast.error("Hero API not found. Please restart backend.");
                }
            }
        } catch (error: any) {
            console.error("Failed to fetch admin data", error);
            if (error.response?.status === 401) {
                toast.error("Session expired. Please log in again.");
            } else {
                toast.error("Failed to load dashboard data. Check connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const { data } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setHeroFormData({ ...heroFormData, image: data });
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleHeroSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingHero) {
                await api.put(`/admin/hero/${editingHero._id}`, heroFormData);
                toast.success('Hero slide updated');
            } else {
                await api.post('/admin/hero', heroFormData);
                toast.success('Hero slide created');
            }
            setEditingHero(null);
            setHeroFormData({ title: '', subtitle: '', cta: 'Shop Now', link: '/shop', bgColor: 'from-primary/10 to-primary/5', textColor: 'text-foreground', image: '', isActive: true });
            fetchData();
        } catch (error) {
            toast.error('Failed to save hero slide');
        }
    };

    const deleteHero = async (id: string) => {
        if (!window.confirm('Delete this hero slide?')) return;
        try {
            await api.delete(`/admin/hero/${id}`);
            toast.success('Hero slide removed');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete hero slide');
        }
    };

    const deleteUser = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await api.delete(`/admin/users/${id}`);
            toast.success('User deleted successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const approveSeller = async (id: string) => {
        try {
            await api.put(`/admin/users/${id}/approve`);
            toast.success('Seller approved successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to approve seller');
        }
    };

    const deleteProduct = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/admin/products/${id}`);
            toast.success('Product deleted successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    if (loading) {
        return <div className="p-20 text-center text-primary font-bold animate-pulse">Loading Super Admin Dashboard...</div>;
    }

    const sellers = users.filter(u => u.role === 'seller');
    const pendingSellers = sellers.filter(u => !u.isVerified);

    return (
        <>
            <Helmet>
                <title>Super Admin Dashboard - Malasiyakart</title>
            </Helmet>
            <Layout>
                <div className="container-main section-padding">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold">Super Admin Portal</h1>
                                <p className="text-muted-foreground">Manage your marketplace, sellers, and hero banners</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" asChild>
                                    <Link to="/dashboard">User Dashboard</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex overflow-x-auto border-b border-border pb-1 gap-1">
                            {['overview', 'hero', 'sellers', 'users', 'products'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === tab
                                        ? 'bg-primary/10 text-primary border-b-2 border-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                        }`}
                                >
                                    {tab === 'hero' ? 'Hero Banners' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    {tab === 'sellers' && pendingSellers.length > 0 && (
                                        <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                                            {pendingSellers.length}
                                        </Badge>
                                    )}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats.usersCount}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                                        <Package className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats.productsCount}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats.ordersCount}</div>
                                        <p className="text-xs text-muted-foreground">Mock Data</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">RM {stats.totalRevenue}</div>
                                    </CardContent>
                                </Card>

                                <div className="md:col-span-2">
                                    <Card className="h-full">
                                        <CardHeader>
                                            <CardTitle>Pending Approvals</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {pendingSellers.length === 0 ? (
                                                <p className="text-sm text-muted-foreground">No pending seller approvals.</p>
                                            ) : (
                                                <div className="space-y-4">
                                                    {pendingSellers.slice(0, 5).map(seller => (
                                                        <div key={seller._id} className="flex items-center justify-between border p-3 rounded-lg">
                                                            <div>
                                                                <p className="font-semibold">{seller.name}</p>
                                                                <p className="text-sm text-muted-foreground">{seller.email}</p>
                                                            </div>
                                                            <Button size="sm" onClick={() => approveSeller(seller._id)}>Approve</Button>
                                                        </div>
                                                    ))}
                                                    {pendingSellers.length > 5 && (
                                                        <Button variant="link" onClick={() => setActiveTab('sellers')}>View all</Button>
                                                    )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}

                        {activeTab === 'hero' && (
                            <div className="animate-fade-in space-y-6">
                                <Card className="border-primary/20 shadow-md">
                                    <CardHeader className="bg-primary/5 rounded-t-lg">
                                        <CardTitle className="flex items-center gap-2">
                                            <ImageIcon className="w-5 h-5" />
                                            {editingHero ? 'Edit Hero Slide' : 'Add New Hero Slide'}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <form onSubmit={handleHeroSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold">Slide Title</label>
                                                    <input
                                                        className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                        placeholder="e.g. Mega Summer Sale"
                                                        value={heroFormData.title}
                                                        onChange={e => setHeroFormData({ ...heroFormData, title: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold">Subtitle Description</label>
                                                    <input
                                                        className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                        placeholder="e.g. Up to 70% off on electronics"
                                                        value={heroFormData.subtitle}
                                                        onChange={e => setHeroFormData({ ...heroFormData, subtitle: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold">Button Text (CTA)</label>
                                                    <input
                                                        className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                        value={heroFormData.cta}
                                                        onChange={e => setHeroFormData({ ...heroFormData, cta: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold">Target Link Path</label>
                                                    <input
                                                        className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                        value={heroFormData.link}
                                                        onChange={e => setHeroFormData({ ...heroFormData, link: e.target.value })}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold">Background Image (Optional)</label>
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative flex-1">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                id="hero-image-upload"
                                                                onChange={handleImageUpload}
                                                            />
                                                            <label
                                                                htmlFor="hero-image-upload"
                                                                className="flex items-center justify-center gap-2 w-full p-2.5 border-2 border-dashed rounded-md cursor-pointer hover:bg-secondary/50 transition-colors"
                                                            >
                                                                <Upload className="w-4 h-4" />
                                                                {uploading ? 'Uploading...' : 'Choose File'}
                                                            </label>
                                                        </div>
                                                        {heroFormData.image && (
                                                            <div className="w-12 h-12 rounded border overflow-hidden">
                                                                <img src={heroFormData.image} alt="Preview" className="w-full h-full object-cover" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {heroFormData.image && (
                                                        <p className="text-[10px] text-muted-foreground truncate">{heroFormData.image}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold">Fallback Background Color (Tailwind)</label>
                                                    <input
                                                        className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                        placeholder="e.g. from-blue-500 to-purple-600"
                                                        value={heroFormData.bgColor}
                                                        onChange={e => setHeroFormData({ ...heroFormData, bgColor: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between border-t pt-4">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id="hero-active"
                                                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                                                        checked={heroFormData.isActive}
                                                        onChange={e => setHeroFormData({ ...heroFormData, isActive: e.target.checked })}
                                                    />
                                                    <label htmlFor="hero-active" className="text-sm font-medium cursor-pointer">Set as Active</label>
                                                </div>
                                                <div className="flex gap-3">
                                                    <Button type="submit" disabled={uploading}>
                                                        {editingHero ? 'Update' : 'Create'} Hero Slide
                                                    </Button>
                                                    {editingHero && (
                                                        <Button variant="outline" onClick={() => {
                                                            setEditingHero(null);
                                                            setHeroFormData({ title: '', subtitle: '', cta: 'Shop Now', link: '/shop', bgColor: 'from-primary/10 to-primary/5', textColor: 'text-foreground', image: '', isActive: true });
                                                        }}>Cancel</Button>
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Existing Hero Banners</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-md border overflow-hidden">
                                            <Table>
                                                <TableHeader className="bg-secondary/30">
                                                    <TableRow>
                                                        <TableHead className="w-[120px]">Preview</TableHead>
                                                        <TableHead>Title & Details</TableHead>
                                                        <TableHead className="text-center">Status</TableHead>
                                                        <TableHead className="text-right">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {heroes.map((hero) => (
                                                        <TableRow key={hero._id} className="hover:bg-secondary/20">
                                                            <TableCell>
                                                                <div className={`w-24 h-12 rounded border bg-gradient-to-r relative overflow-hidden ${hero.bgColor}`}>
                                                                    {hero.image && <img src={hero.image} className="absolute inset-0 w-full h-full object-cover" alt="" />}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <p className="font-bold text-sm">{hero.title}</p>
                                                                <p className="text-xs text-muted-foreground truncate max-w-[300px]">{hero.subtitle}</p>
                                                                <p className="text-[10px] text-primary hover:underline cursor-pointer">{hero.link}</p>
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Badge variant={hero.isActive ? 'default' : 'secondary'} className={hero.isActive ? 'bg-green-500 hover:bg-green-600' : ''}>
                                                                    {hero.isActive ? 'ACTIVE' : 'INACTIVE'}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex justify-end gap-1">
                                                                    <Button variant="ghost" size="icon" onClick={() => {
                                                                        setEditingHero(hero);
                                                                        setHeroFormData({
                                                                            title: hero.title,
                                                                            subtitle: hero.subtitle,
                                                                            cta: hero.cta,
                                                                            link: hero.link,
                                                                            bgColor: hero.bgColor,
                                                                            textColor: hero.textColor,
                                                                            image: hero.image || '',
                                                                            isActive: hero.isActive
                                                                        });
                                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                                    }}>
                                                                        <CheckCircle className="w-4 h-4 text-blue-500" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => deleteHero(hero._id)}>
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {heroes.length === 0 && (
                                                        <TableRow>
                                                            <TableCell colSpan={4} className="text-center py-12 text-muted-foreground italic">
                                                                No hero banners found. Create your first one above!
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="animate-fade-in">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>All User Accounts</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-md border">
                                            <Table>
                                                <TableHeader className="bg-secondary/30">
                                                    <TableRow>
                                                        <TableHead>User</TableHead>
                                                        <TableHead>Email</TableHead>
                                                        <TableHead>Role</TableHead>
                                                        <TableHead>Registered</TableHead>
                                                        <TableHead className="text-right">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {users.map((user) => (
                                                        <TableRow key={user._id}>
                                                            <TableCell className="font-medium">{user.name}</TableCell>
                                                            <TableCell>{user.email}</TableCell>
                                                            <TableCell>
                                                                <Badge variant={user.role === 'admin' ? 'default' : user.role === 'seller' ? 'secondary' : 'outline'}>
                                                                    {user.role.toUpperCase()}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                                            <TableCell className="text-right">
                                                                {user.role !== 'admin' && (
                                                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => deleteUser(user._id)}>
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'sellers' && (
                            <div className="animate-fade-in">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Seller Management</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-md border">
                                            <Table>
                                                <TableHeader className="bg-secondary/30">
                                                    <TableRow>
                                                        <TableHead>Seller</TableHead>
                                                        <TableHead>Email</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead>Joined</TableHead>
                                                        <TableHead className="text-right">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {sellers.map((seller) => (
                                                        <TableRow key={seller._id}>
                                                            <TableCell className="font-medium">{seller.name}</TableCell>
                                                            <TableCell>{seller.email}</TableCell>
                                                            <TableCell>
                                                                {seller.isVerified ? (
                                                                    <Badge className="bg-green-500 text-white hover:bg-green-600 border-none">ACTIVE</Badge>
                                                                ) : (
                                                                    <Badge variant="destructive">PENDING</Badge>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="text-sm">{new Date(seller.createdAt).toLocaleDateString()}</TableCell>
                                                            <TableCell className="text-right flex items-center justify-end gap-2">
                                                                {!seller.isVerified && (
                                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 font-bold" onClick={() => approveSeller(seller._id)}>
                                                                        <CheckCircle className="w-4 h-4 mr-1" /> APPROVE
                                                                    </Button>
                                                                )}
                                                                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 h-8 w-8" onClick={() => deleteUser(seller._id)}>
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'products' && (
                            <div className="animate-fade-in">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <CardTitle>Marketplace Products</CardTitle>
                                        <Button asChild size="sm" className="gap-2">
                                            <Link to="/seller/products/new">
                                                <Package className="w-4 h-4" />
                                                New Product
                                            </Link>
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-md border">
                                            <Table>
                                                <TableHeader className="bg-secondary/30">
                                                    <TableRow>
                                                        <TableHead>Product</TableHead>
                                                        <TableHead>Seller</TableHead>
                                                        <TableHead>Price</TableHead>
                                                        <TableHead>Category</TableHead>
                                                        <TableHead className="text-right">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {products.map((product) => (
                                                        <TableRow key={product._id}>
                                                            <TableCell className="font-medium flex items-center gap-2">
                                                                <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden border">
                                                                    <img src={product.images?.[0] || '/placeholder.png'} alt={product.name} className="w-full h-full object-cover" />
                                                                </div>
                                                                <span className="truncate max-w-[200px] font-bold" title={product.name}>{product.name}</span>
                                                            </TableCell>
                                                            <TableCell className="text-sm italic">{product.seller?.name || 'Admin'}</TableCell>
                                                            <TableCell className="font-bold text-primary">RM {product.price}</TableCell>
                                                            <TableCell><Badge variant="outline">{product.category}</Badge></TableCell>
                                                            <TableCell className="text-right">
                                                                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => deleteProduct(product._id)}>
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default AdminDashboard;
