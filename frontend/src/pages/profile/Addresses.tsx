import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Addresses = () => {
    return (
        <>
            <Helmet>
                <title>My Addresses - Malasiyakart</title>
            </Helmet>
            <Layout>
                <div className="container-main section-padding">
                    <h1 className="text-2xl font-bold mb-6">My Addresses</h1>
                    <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                        <p>No addresses saved yet.</p>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Addresses;
