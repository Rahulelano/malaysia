import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const CheckoutSuccess = () => {
    const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;

    return (
        <>
            <Helmet>
                <title>Order Confirmed - Malasiyakart</title>
            </Helmet>
            <Layout>
                <div className="container-main section-padding">
                    <div className="max-w-2xl mx-auto text-center py-16">
                        <div className="mb-6 flex justify-center">
                            <div className="h-24 w-24 bg-success/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="h-12 w-12 text-success" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
                        <p className="text-muted-foreground text-lg mb-8">
                            Thank you for your purchase. Your order has been received and is being processed.
                        </p>

                        <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-muted-foreground">Order ID</span>
                                <span className="font-mono font-medium">{orderId}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-muted-foreground">Date</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Email</span>
                                <span>user@example.com</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/orders">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    View Order Details
                                </Button>
                            </Link>
                            <Link to="/shop">
                                <Button className="btn-primary w-full sm:w-auto gap-2">
                                    <ShoppingBag className="w-4 h-4" />
                                    Continue Shopping
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default CheckoutSuccess;
