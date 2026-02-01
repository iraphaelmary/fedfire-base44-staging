import React from 'react';
import SEO from '@/components/SEO';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import HeroSection from '@/components/home/HeroSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import AboutPreview from '@/components/home/AboutPreview';
import ControllerGeneralPreview from '@/components/home/ControllerGeneralPreview';
import NewsSection from '@/components/home/NewsSection';
import SafetyTips from '@/components/home/SafetyTips';

export default function Home() {
  const posts = useQuery(api.blogPosts.list, { published: true, limit: 4 }) ?? [];

  return (
    <div>
      <SEO
        title="Home"
        description="Welcome to FedFire - Leading Fire Safety & Prevention Resources"
      />
      <HeroSection />
      <ServicesPreview />
      <AboutPreview />
      <ControllerGeneralPreview />
      <NewsSection posts={posts} />
      <SafetyTips />
    </div>
  );
}