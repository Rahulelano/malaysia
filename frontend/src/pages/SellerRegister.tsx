import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Store,
  TrendingUp,
  Shield,
  Truck,
  CreditCard,
  HeadphonesIcon,
  ArrowRight,
  Check,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Reach Millions',
    description: 'Access to millions of active shoppers across Malaysia',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Trusted payment processing and fraud protection',
  },
  {
    icon: Truck,
    title: 'Easy Logistics',
    description: 'Integrated shipping with major carriers nationwide',
  },
  {
    icon: CreditCard,
    title: 'Fast Payouts',
    description: 'Receive payments weekly directly to your bank',
  },
  {
    icon: HeadphonesIcon,
    title: 'Seller Support',
    description: 'Dedicated support team to help you succeed',
  },
  {
    icon: Store,
    title: 'Free Tools',
    description: 'Analytics, inventory management, and marketing tools',
  },
];

const steps = [
  {
    step: 1,
    title: 'Register',
    description: 'Create your seller account with business details',
  },
  {
    step: 2,
    title: 'Verify',
    description: 'Complete verification with required documents',
  },
  {
    step: 3,
    title: 'List Products',
    description: 'Add your products with photos and descriptions',
  },
  {
    step: 4,
    title: 'Start Selling',
    description: 'Go live and start receiving orders',
  },
];

const SellerRegister = () => {
  return (
    <>
      <Helmet>
        <title>Become a Seller - Malasiyakart</title>
        <meta
          name="description"
          content="Start selling on Malasiyakart. Reach millions of customers, enjoy secure payments, and grow your business with Malaysia's trusted marketplace."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16 lg:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                Grow Your Business with{' '}
                <span className="text-primary">Malasiyakart</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of successful sellers on Malaysia's fastest-growing
                marketplace. Start selling today and reach millions of customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register?role=seller">
                  <Button size="lg" className="btn-accent gap-2 text-base px-8 w-full sm:w-auto">
                    Start Selling Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base"
                  onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                RM500 seller credits for new registrations
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="section-padding">
          <div className="container-main">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">
              Why Sell on Malasiyakart?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-soft transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-secondary/50">
          <div className="container-main">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">
              Start Selling in 4 Easy Steps
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="bg-card border border-border rounded-xl p-6 h-full">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-3 w-6 text-primary">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                Simple, Transparent Pricing
              </h2>
              <p className="text-muted-foreground mb-8">
                No monthly fees, no hidden charges. Pay only when you sell.
              </p>

              <div className="bg-card border border-border rounded-xl p-8">
                <div className="text-4xl font-bold text-primary mb-2">5%</div>
                <p className="text-lg font-medium mb-4">Commission per sale</p>
                <ul className="space-y-3 text-left max-w-md mx-auto">
                  {[
                    'No registration fee',
                    'No monthly subscription',
                    'Free product listings',
                    'Free seller dashboard',
                    'Free marketing tools',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/register?role=seller">
                  <Button size="lg" className="btn-accent mt-8 px-12">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container-main text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Start Selling?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join Malasiyakart today and start reaching millions of customers across
              Malaysia. It only takes a few minutes to set up.
            </p>
            <Link to="/register?role=seller">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-base px-8"
              >
                Create Seller Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SellerRegister;
