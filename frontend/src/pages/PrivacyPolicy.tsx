import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy - Malasiyakart</title>
                <meta name="description" content="Malasiyakart Privacy Policy" />
            </Helmet>

            <Layout>
                <div className="container-main section-padding">
                    <div className="max-w-4xl mx-auto prose dark:prose-invert">
                        <h1>Privacy Policy</h1>
                        <p className="lead">Last updated: January 20, 2026</p>

                        <p>
                            At Malasiyakart, accessible from www.malasiyakart.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Malasiyakart and how we use it.
                        </p>

                        <h2>1. Information We Collect</h2>
                        <p>
                            We collect several different types of information for various purposes to provide and improve our Service to you.
                        </p>
                        <ul>
                            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, First name and last name, Phone number, Address, State, Province, ZIP/Postal code, City.</li>
                            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
                        </ul>

                        <h2>2. Use of Data</h2>
                        <p>
                            Malasiyakart uses the collected data for various purposes:
                        </p>
                        <ul>
                            <li>To provide and maintain the Service</li>
                            <li>To notify you about changes to our Service</li>
                            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                            <li>To provide customer care and support</li>
                            <li>To provide analysis or valuable information so that we can improve the Service</li>
                            <li>To monitor the usage of the Service</li>
                        </ul>

                        <h2>3. Transfer of Data</h2>
                        <p>
                            Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
                        </p>

                        <h2>4. Security of Data</h2>
                        <p>
                            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                        </p>

                        <h2>5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <ul>
                            <li>By email: support@malasiyakart.com</li>
                            <li>By visiting this page on our website: <a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default PrivacyPolicy;
