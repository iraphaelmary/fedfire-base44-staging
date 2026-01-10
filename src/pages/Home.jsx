import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/home/HeroSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import AboutPreview from '@/components/home/AboutPreview';
import ControllerGeneralPreview from '@/components/home/ControllerGeneralPreview';
import NewsSection from '@/components/home/NewsSection';
import SafetyTips from '@/components/home/SafetyTips';

export default function Home() {
  const { data: posts } = useQuery({
    queryKey: ['featured-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ published: true }, '-created_date', 4),
    initialData: [],
  });

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