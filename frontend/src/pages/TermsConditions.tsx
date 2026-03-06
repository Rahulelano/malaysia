import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const TermsConditions = () => {
    return (
        <>
            <Helmet>
                <title>Terms & Conditions - Malasiyakart</title>
                <meta name="description" content="Malasiyakart Terms & Conditions" />
            </Helmet>

            <Layout>
                <div className="container-main section-padding">
                    <div className="max-w-4xl mx-auto prose dark:prose-invert">
                        <h1>Terms and Conditions</h1>
                        <p className="lead">Last updated: January 20, 2026</p>

                        <p>
                            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the www.malasiyakart.com website (the "Service") operated by Malasiyakart ("us", "we", or "our").
                        </p>

                        <h2>1. Accounts</h2>
                        <p>
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>

                        <h2>2. Intellectual Property</h2>
                        <p>
                            The Service and its original content, features and functionality are and will remain the exclusive property of Malasiyakart and its licensors.
                        </p>

                        <h2>3. Links To Other Web Sites</h2>
                        <p>
                            Our Service may contain links to third-party web sites or services that are not owned or controlled by Malasiyakart. Malasiyakart has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
                        </p>

                        <h2>4. Termination</h2>
                        <p>
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>

                        <h2>5. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of Malaysia, without regard to its conflict of law provisions.
                        </p>

                        <h2>6. Changes</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>

                        <h2>7. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us.
                        </p>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default TermsConditions;
