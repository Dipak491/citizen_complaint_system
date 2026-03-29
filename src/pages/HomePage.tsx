import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategorySection from '../components/home/CategorySection';
import PromotionSection from '../components/home/PromotionSection';
import TestimonialSection from '../components/home/TestimonialSection';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <PromotionSection />
      <TestimonialSection />
    </Layout>
  );
};

export default HomePage;