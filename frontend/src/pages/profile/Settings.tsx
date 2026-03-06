import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Settings = () => {
    return (
        <>
            <Helmet>
                <title>Account Settings - Malasiyakart</title>
            </Helmet>
            <Layout>
                <div className="container-main section-padding">
                    <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
                    <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                        <p>Profile settings form will go here.</p>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Settings;
