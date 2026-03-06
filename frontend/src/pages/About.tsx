import { Helmet } from 'react-helmet-async';
import { Users, Store, Package, Globe } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const stats = [
  { icon: Users, value: '2M+', label: 'Active Users' },
  { icon: Store, value: '50K+', label: 'Verified Sellers' },
  { icon: Package, value: '10M+', label: 'Products Listed' },
  { icon: Globe, value: '100+', label: 'Cities Served' },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Malasiyakart</title>
        <meta
          name="description"
          content="Learn about Malasiyakart, Malaysia's trusted multi-vendor marketplace connecting millions of customers with thousands of sellers."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16 lg:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                About <span className="text-primary">Malasiyakart</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Empowering Malaysian businesses and connecting them with millions of
                customers through technology and trust.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Our Story</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                <p>
                  Malasiyakart was founded in 2020 with a simple mission: to make
                  online shopping accessible, trustworthy, and enjoyable for every
                  Malaysian.
                </p>
                <p>
                  What started as a small platform connecting local sellers with
                  customers has grown into Malaysia's leading multi-vendor marketplace,
                  serving millions of customers across the nation.
                </p>
                <p>
                  We believe in empowering local businesses, from small home-based
                  entrepreneurs to established brands. Our platform provides the tools,
                  reach, and support they need to succeed in the digital economy.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">Our Mission</h2>
              <p className="text-muted-foreground">
                To be Malaysia's most trusted marketplace by connecting quality sellers
                with discerning customers through innovative technology, exceptional
                service, and unwavering commitment to trust and transparency.
              </p>

              <h2 className="text-2xl font-bold mb-6 mt-12">Our Values</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Trust First',
                    description:
                      'We verify every seller and protect every transaction to ensure a safe shopping experience.',
                  },
                  {
                    title: 'Customer Obsession',
                    description:
                      'Every decision we make starts with how it benefits our customers.',
                  },
                  {
                    title: 'Seller Success',
                    description:
                      'When our sellers thrive, our marketplace thrives. We invest in their growth.',
                  },
                  {
                    title: 'Innovation',
                    description:
                      'We continuously improve our platform to deliver better experiences.',
                  },
                ].map((value) => (
                  <div key={value.title} className="bg-secondary/50 rounded-xl p-6">
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
