import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Truck, Globe, Clock, AlertCircle } from 'lucide-react';

const Shipping = () => {
    return (
        <>
            <Helmet>
                <title>Shipping Information - Malasiyakart</title>
                <meta
                    name="description"
                    content="Learn about Malasiyakart shipping policies, delivery times, and rates."
                />
            </Helmet>

            <Layout>
                <div className="container-main section-padding">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8 text-center">Shipping Information</h1>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-card border border-border p-6 rounded-xl">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <Truck className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Local Delivery</h3>
                                <p className="text-muted-foreground">
                                    For deliveries within Peninsula Malaysia, expect your items in 2-5 business days. East Malaysia deliveries typically take 5-7 business days.
                                </p>
                            </div>

                            <div className="bg-card border border-border p-6 rounded-xl">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <Globe className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">International Shipping</h3>
                                <p className="text-muted-foreground">
                                    We verify all international sellers. Shipping from overseas normally takes 7-14 business days depending on customs clearance.
                                </p>
                            </div>

                            <div className="bg-card border border-border p-6 rounded-xl">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <Clock className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Processing Time</h3>
                                <p className="text-muted-foreground">
                                    Sellers usually process orders within 1-2 business days. You will receive a tracking number once your order has been handed over to the courier.
                                </p>
                            </div>

                            <div className="bg-card border border-border p-6 rounded-xl">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <AlertCircle className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Shipping Rates</h3>
                                <p className="text-muted-foreground">
                                    Shipping rates are calculated based on weight and distance. You can view the final shipping cost at checkout before payment.
                                </p>
                            </div>
                        </div>

                        <div className="prose max-w-none text-muted-foreground">
                            <h3 className="text-foreground font-semibold text-lg mb-4">Additional Information</h3>
                            <p className="mb-4">
                                Please note that shipping times may be affected by public holidays, weather conditions, or unforeseen circumstances. We work closely with our courier partners (Pos Laju, J&T, DHL) to ensure timely delivery.
                            </p>
                            <p>
                                If you haven't received your order within the estimated timeframe, please contact our Customer Service or reach out to the seller directly via the order page.
                            </p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Shipping;
