import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SellerFees = () => {
    return (
        <>
            <Helmet>
                <title>Seller Fees & Pricing - Malasiyakart</title>
                <meta
                    name="description"
                    content="Understand Malasiyakart's commission rates and seller fees."
                />
            </Helmet>

            <Layout>
                <div className="container-main section-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-3xl font-bold mb-4">Seller Fees & Pricing</h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Simple, transparent pricing. No setup fees. No monthly fees.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Basic Plan */}
                            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors relative overflow-hidden">
                                <h3 className="text-xl font-bold mb-2">Commission Fee</h3>
                                <div className="text-4xl font-bold mb-1 text-primary">2%</div>
                                <p className="text-sm text-muted-foreground mb-6">per transaction</p>

                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        No listing fees
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Payment processing included
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Fraud protection
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Access to seller tools
                                    </li>
                                </ul>
                            </div>

                            {/* Payment Processing */}
                            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-primary/20 text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                                    HOT
                                </div>
                                <h3 className="text-xl font-bold mb-2">Payment Fee</h3>
                                <div className="text-4xl font-bold mb-1 text-primary">1%</div>
                                <p className="text-sm text-muted-foreground mb-6">payment gateway</p>

                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Secure transactions
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Accept all major cards
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        FPX banking support
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        E-wallet integration
                                    </li>
                                </ul>
                            </div>

                            {/* Withdrawal Fee */}
                            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
                                <h3 className="text-xl font-bold mb-2">Withdrawal</h3>
                                <div className="text-4xl font-bold mb-1 text-primary">RM 0</div>
                                <p className="text-sm text-muted-foreground mb-6">per withdrawal</p>

                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Fast bank transfers
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Weekly auto-payouts
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Detailed reports
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        No hidden charges
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 bg-muted/30 p-8 rounded-xl text-center">
                            <h2 className="text-2xl font-bold mb-4">Total Cost to You</h2>
                            <p className="text-lg mb-6">
                                Maximum <span className="font-bold text-primary">3%</span> per successful sale. You keep <span className="font-bold text-primary">97%</span> of your earnings.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button asChild size="lg">
                                    <Link to="/seller/register">Start Selling Now</Link>
                                </Button>
                                <Button variant="outline" asChild size="lg">
                                    <Link to="/contact">Contact Sales</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default SellerFees;
