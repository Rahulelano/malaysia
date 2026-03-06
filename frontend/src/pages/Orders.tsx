import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, CheckCircle2, Truck } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Orders = () => {
    const orders: any[] = [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-success text-success-foreground hover:bg-success/80';
            case 'In Transit': return 'bg-blue-500 text-white hover:bg-blue-600';
            case 'Processing': return 'bg-yellow-500 text-white hover:bg-yellow-600';
            default: return 'bg-secondary text-secondary-foreground';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Delivered': return <CheckCircle2 className="w-4 h-4 mr-1" />;
            case 'In Transit': return <Truck className="w-4 h-4 mr-1" />;
            default: return <Clock className="w-4 h-4 mr-1" />;
        }
    };

    return (
        <>
            <Helmet>
                <title>My Orders - Malasiyakart</title>
            </Helmet>
            <Layout>
                <div className="container-main section-padding">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Package className="w-6 h-6" />
                            My Orders
                        </h1>
                        <Link to="/shop">
                            <Button>Continue Shopping</Button>
                        </Link>
                    </div>

                    {orders.length === 0 ? (
                        <div className="text-center py-16 bg-card border border-border rounded-xl">
                            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-xl font-semibold mb-2">No orders found</h2>
                            <p className="text-muted-foreground mb-6">Looks like you haven't placed any orders yet.</p>
                            <Link to="/shop">
                                <Button>Start Shopping</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="p-4 sm:p-6 border-b border-border bg-secondary/20 flex flex-wrap gap-4 justify-between items-center">
                                        <div className="flex gap-4 sm:gap-8 text-sm">
                                            <div>
                                                <p className="text-muted-foreground mb-1">Order Placed</p>
                                                <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground mb-1">Total</p>
                                                <p className="font-medium">RM {order.total.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground mb-1">Order ID</p>
                                                <p className="font-medium font-mono">{order.id}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to={`/orders/${order.id}`}>
                                                <Button variant="outline" size="sm">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="p-4 sm:p-6">
                                        <div className="flex flex-col sm:flex-row gap-6 items-start justify-between">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge className={`${getStatusColor(order.status)} border-0`}>
                                                        {getStatusIcon(order.status)}
                                                        {order.status}
                                                    </Badge>
                                                    {order.status === 'In Transit' && (
                                                        <span className="text-sm text-muted-foreground">Arriving by April 20</span>
                                                    )}
                                                    {order.status === 'Delivered' && (
                                                        <span className="text-sm text-muted-foreground">Delivered on {new Date(order.date).toLocaleDateString()}</span>
                                                    )}
                                                </div>

                                                <div className="space-y-3">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex gap-4 items-center">
                                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md bg-muted" />
                                                            <div>
                                                                <Link to="#" className="font-medium hover:underline hover:text-primary transition-colors">
                                                                    {item.name}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="w-full sm:w-auto flex flex-col gap-2">
                                                <Button variant="secondary" className="w-full sm:w-auto">Track Package</Button>
                                                <Button variant="outline" className="w-full sm:w-auto">Write a Review</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Orders;
