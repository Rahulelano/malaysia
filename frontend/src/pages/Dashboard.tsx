import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, LogOut, Settings, CreditCard, MapPin, Store, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        // Seller specific items
        ...(user?.role === 'seller' ? [
            { icon: Store, label: 'Seller Dashboard', path: '/seller/dashboard', description: 'Overview of your shop' },
            { icon: Package, label: 'My Products', path: '/seller/products', description: 'Manage your product listings' },
            { icon: TrendingUp, label: 'Add Product', path: '/seller/products/new', description: 'List a new product' },
        ] : []),
        // Common items
        { icon: Package, label: 'My Orders', path: '/orders', description: 'View and track your orders' },
        { icon: Heart, label: 'Wishlist', path: '/wishlist', description: 'Your saved products' },
        { icon: MapPin, label: 'Addresses', path: '/profile/addresses', description: 'Manage shipping addresses' },
        { icon: CreditCard, label: 'Payment Methods', path: '/profile/payments', description: 'Manage saved cards' },
        { icon: Settings, label: 'Account Settings', path: '/profile/settings', description: 'Update your profile' },
    ];

    if (!user) {
        return <div className="p-8 text-center"><p>Please log in to view dashboard.</p><Button onClick={() => navigate('/login')}>Login</Button></div>;
    }

    return (
        <>
            <Helmet>
                <title>My Dashboard - Malasiyakart</title>
            </Helmet>
            <Layout>
                <div className="container-main section-padding">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="lg:w-64 flex-shrink-0">
                            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{user.name}</h3>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                        <span className="text-xs uppercase bg-secondary px-2 py-0.5 rounded">{user.role}</span>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <nav className="space-y-1">
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            to={item.path}
                                            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.label}
                                        </Link>
                                    ))}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors mt-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1">
                            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">12</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Wishlist Items</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">4</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Reviews</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">8</div>
                                    </CardContent>
                                </Card>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {menuItems.map((item) => (
                                    <Link key={item.label} to={item.path}>
                                        <Card className="h-full hover:border-primary transition-colors cursor-pointer group">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                                                    <item.icon className="h-5 w-5" />
                                                    {item.label}
                                                </CardTitle>
                                                <CardDescription>{item.description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                                <div className="bg-card border border-border rounded-xl overflow-hidden">
                                    <div className="p-4 text-center text-muted-foreground">
                                        <p>No recent orders found.</p>
                                        <Button variant="link" asChild>
                                            <Link to="/shop">Start Shopping</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Dashboard;
