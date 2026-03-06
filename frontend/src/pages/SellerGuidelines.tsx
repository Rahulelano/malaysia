import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { CheckCircle2, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SellerGuidelines = () => {
    return (
        <>
            <Helmet>
                <title>Seller Guidelines - Malasiyakart</title>
                <meta
                    name="description"
                    content="Guidelines and policies for selling on Malasiyakart."
                />
            </Helmet>

            <Layout>
                <div className="container-main section-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-3xl font-bold mb-4">Seller Guidelines</h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                To ensure a safe and trustworthy marketplace, all sellers must adhere to the following guidelines.
                            </p>
                        </div>

                        <div className="grid gap-8">
                            {/* Product Listing */}
                            <div className="bg-card border border-border p-6 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">Product Listing Policy</h3>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                <span>Accurate descriptions and authentic images are required.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                <span>Prices must be clear and inclusive of any hidden charges.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                <span>Illegal, counterfeit, or prohibited items are strictly forbidden.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Order Fulfillment */}
                            <div className="bg-card border border-border p-6 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">Order Fulfillment & Shipping</h3>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                <span>Orders must be shipped within 2 business days of confirmation.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                <span>Valid tracking numbers must be provided for all shipments.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                <span>Packaging must be secure to prevent damage during transit.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Service */}
                            <div className="bg-card border border-border p-6 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">Customer Service Standards</h3>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                <span>Respond to customer inquiries within 24 hours.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                <span>Be professional and courteous in all communications.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                <span>Honor your return and refund policies.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-muted-foreground mb-4">
                                Violating these guidelines may result in account suspension or termination.
                            </p>
                            <Button asChild size="lg">
                                <Link to="/seller/register">Agree & Register as Seller</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default SellerGuidelines;
