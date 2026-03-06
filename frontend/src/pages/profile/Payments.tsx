import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Payments = () => {
    return (
        <>
            <Helmet>
                <title>Payment Methods - Malasiyakart</title>
            </Helmet>
            <Layout>
                <div className="container-main section-padding">
                    <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>
                    <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                        <p>No payment methods saved.</p>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Payments;
