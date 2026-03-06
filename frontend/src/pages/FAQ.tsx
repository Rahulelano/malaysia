import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
    return (
        <>
            <Helmet>
                <title>FAQ - Malasiyakart</title>
                <meta
                    name="description"
                    content="Frequently asked questions about Malasiyakart orders, shipping, returns, and account management."
                />
            </Helmet>

            <Layout>
                <div className="container-main section-padding">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="item-1" className="bg-card border border-border px-4 rounded-lg">
                                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                                <AccordionContent>
                                    You can track your order by clicking on the 'Track Order' link in the footer or by visiting your orders page in your dashboard. You'll need your order ID and email address.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="bg-card border border-border px-4 rounded-lg">
                                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                                <AccordionContent>
                                    We accept all major credit cards (Visa, Mastercard), online banking via FPX, and e-wallets including GrabPay and Boost.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="bg-card border border-border px-4 rounded-lg">
                                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                                <AccordionContent>
                                    Shipping times vary depending on the seller and your location. typically, local deliveries take 2-5 business days. International shipping can take 7-14 business days.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="bg-card border border-border px-4 rounded-lg">
                                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                                <AccordionContent>
                                    Most items can be returned within 14 days of receipt if they are unused and in original packaging. Please check the specific return policy on the product page as it may vary by seller.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5" className="bg-card border border-border px-4 rounded-lg">
                                <AccordionTrigger>How do I become a seller?</AccordionTrigger>
                                <AccordionContent>
                                    Click on 'Become a Seller' in the footer or header menu. You'll need to register for a seller account and provide necessary business documentation.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default FAQ;
