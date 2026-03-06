import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryStrip from '@/components/home/CategoryStrip';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import DealsOfTheDay from '@/components/home/DealsOfTheDay';
import TopBrands from '@/components/home/TopBrands';
import PromoBanners from '@/components/home/PromoBanners';
import TrustBadges from '@/components/home/TrustBadges';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Malasiyakart - Malaysia's Trusted Multi-Vendor Marketplace</title>
        <meta
          name="description"
          content="Shop from thousands of trusted sellers on Malasiyakart. Discover electronics, fashion, home goods and more with secure payments and fast delivery across Malaysia."
        />
        <meta
          name="keywords"
          content="online shopping, Malaysia marketplace, electronics, fashion, home goods, Malasiyakart"
        />
      </Helmet>

      <Layout>
        <HeroBanner />
        <CategoryStrip />
        <TrustBadges />
        <FeaturedProducts />
        <DealsOfTheDay />
        <TopBrands />
        <PromoBanners />
      </Layout>
    </>
  );
};

export default Index;
