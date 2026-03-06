import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        // Implementation for tracking logic would go here
        console.log('Tracking order:', orderId);
        alert(`Checking status for order: ${orderId} (This is a demo)`);
    };

    return (
        <>
            <Helmet>
                <title>Track Order - Malasiyakart</title>
                <meta
                    name="description"
                    content="Track your Malasiyakart order status."
                />
            </Helmet>

            <Layout>
                <div className="container-main section-padding min-h-[60vh] flex flex-col items-center justify-center">
                    <div className="max-w-xl w-full text-center">
                        <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
                        <p className="text-muted-foreground mb-8">
                            Enter your Order ID (e.g. MK-12345678) to see your current order status.
                        </p>

                        <form onSubmit={handleTrack} className="flex gap-2 mb-8">
                            <Input
                                placeholder="Enter Order ID"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="h-12 text-lg"
                            />
                            <Button type="submit" size="lg" className="h-12 px-8">
                                <Search className="w-5 h-5 mr-2" />
                                Track
                            </Button>
                        </form>

                        <div className="bg-muted/50 p-6 rounded-lg text-left text-sm text-center">
                            <p className="text-muted-foreground">
                                Don't know your order ID? Check the confirmation email we sent you or log in to view your
                                <a href="/orders" className="text-primary hover:underline ml-1">Order History</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default TrackOrder;
