import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';

const Returns = () => {
    return (
        <>
            <Helmet>
                <title>Returns & Refunds - Malasiyakart</title>
                <meta
                    name="description"
                    content="Read about Malasiyakart's return and refund policies."
                />
            </Helmet>

            <Layout>
                <div className="container-main section-padding">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8 text-center">Returns & Refund Policy</h1>

                        <div className="bg-card border border-border p-8 rounded-xl mb-10">
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <RotateCcw className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-2xl font-semibold">14-Day Return Policy</h2>
                                <p className="text-muted-foreground mt-2 max-w-2xl">
                                    You have 14 days from the date of delivery to request a return for eligible items.
                                    The item must be unused, in the same condition that you received it, and in the original packaging.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mt-8">
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2 mb-4">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        Eligible for Return
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                                        <li>Items that are defective or damaged upon arrival</li>
                                        <li>Incorrect item sent by the seller</li>
                                        <li>Items with significantly different description</li>
                                        <li>Fashion items (if size doesn't fit, depending on seller)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2 mb-4">
                                        <XCircle className="w-5 h-5 text-red-500" />
                                        Non-Returnable Items
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                                        <li>Perishable goods (food, flowers)</li>
                                        <li>Personal hygiene products</li>
                                        <li>Digital downloads and software</li>
                                        <li>Customized or personalized items</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">How to Request a Return</h3>
                                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                    <li>Log in to your account and go to "My Orders"</li>
                                    <li>Select the order and item you wish to return</li>
                                    <li>Click on "Request Return" and fill out the form</li>
                                    <li>Wait for seller approval (usually within 48 hours)</li>
                                    <li>Print the return label and ship the item back</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">Refund Process</h3>
                                <p className="text-muted-foreground">
                                    Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
                                    <br /><br />
                                    If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Returns;
