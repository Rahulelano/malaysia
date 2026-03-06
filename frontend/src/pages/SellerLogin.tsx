import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Store } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

import { useAuth } from '@/contexts/AuthContext';

const SellerLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // For now, seller login uses the same endpoint. 
            // The backend could be updated to check for 'role' or just allow login and then check role in dashboard.
            await login({ email, password });
            navigate('/seller/dashboard');
        } catch (error) {
            // Error handled in AuthContext
        }
    };

    return (
        <>
            <Helmet>
                <title>Seller Login - Malasiyakart</title>
                <meta name="description" content="Login to your Malasiyakart Seller Center" />
            </Helmet>

            <Layout>
                <div className="container-main section-padding">
                    <div className="max-w-md mx-auto">
                        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Store className="w-8 h-8 text-primary" />
                                </div>
                                <h1 className="text-2xl font-bold mb-2">Seller Center</h1>
                                <p className="text-muted-foreground">
                                    Login to manage your shop and orders
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative mt-1.5">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="seller@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative mt-1.5">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10 pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <Checkbox id="remember" />
                                        <span className="text-sm">Remember me</span>
                                    </label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button type="submit" className="w-full btn-primary" size="lg">
                                    Login to Seller Center
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm">
                                <p className="text-muted-foreground">
                                    Don't have a seller account yet?{' '}
                                    <Link to="/seller/register" className="text-primary hover:underline font-medium">
                                        Register as Seller
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default SellerLogin;
