import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import SEO from '@/components/SEO';

export default function Layout({ children }) {
  const location = useLocation();
  const hideLayoutPaths = ['/forgot-password', '/reset-password', '/login', '/signup'];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO />
      {!shouldHideLayout && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!shouldHideLayout && <Footer />}
    </div>
  );
}