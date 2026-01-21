import React from 'react';
import { base44 } from '@/api/base44Client';
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
      <HeroSection />
      <ServicesPreview />
      <AboutPreview />
      <ControllerGeneralPreview />
      <NewsSection posts={posts} />
      <SafetyTips />
    </div>
  );
}