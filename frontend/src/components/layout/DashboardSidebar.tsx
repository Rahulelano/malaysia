import { useNavigate, useLocation, Link } from 'react-router-dom';
import { User, Package, Heart, LogOut, Settings, CreditCard, MapPin, Store, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';

const DashboardSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    const menuItems = [
        // Seller/Admin specific items
        ...(user.role === 'seller' || user.role === 'admin' ? [
            { icon: Store, label: user.role === 'admin' ? 'Admin Dashboard' : 'Seller Dashboard', path: user.role === 'admin' ? '/admin/dashboard' : '/seller/dashboard', description: 'Overview of your dashboard' },
            { icon: Package, label: 'My Products', path: '/seller/products', description: 'Manage your product listings' },
            { icon: TrendingUp, label: 'Add Product', path: '/seller/products/new', description: 'List a new product' },
        ] : []),
        // Common items
        { icon: Store, label: 'Dashboard', path: '/dashboard', description: 'Main Dashboard' },
        { icon: Package, label: 'My Orders', path: '/orders', description: 'View and track your orders' },
        { icon: Heart, label: 'Wishlist', path: '/wishlist', description: 'Your saved products' },
        { icon: MapPin, label: 'Addresses', path: '/profile/addresses', description: 'Manage shipping addresses' },
        { icon: CreditCard, label: 'Payment Methods', path: '/profile/payments', description: 'Manage saved cards' },
        { icon: Settings, label: 'Account Settings', path: '/profile/settings', description: 'Update your profile' },
    ];

    return (
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
                            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                }`}
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
    );
};

export default DashboardSidebar;
