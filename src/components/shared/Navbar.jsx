import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ChevronDown, Phone, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', page: 'Home' },
  { name: 'About Us', page: 'About', subLinks: [
    { name: 'Our History', page: 'History' },
    { name: 'Controller General', page: 'ControllerGeneral' },
    { name: 'Leadership', page: 'Leadership' },
  ]},
  { name: 'Services', page: 'Services' },
  { name: 'Departments', page: 'Departments' },
  { name: 'News & Blog', page: 'Blog' },
  { name: 'Contact', page: 'Contact' },
  { name: 'Admin', page: 'AdminDashboard' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1E3A5F] text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>Federal Fire Service of Nigeria - Protecting Lives & Property</span>
          <div className="flex items-center gap-4">
            <a href="tel:112" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
              <Phone className="w-4 h-4" />
              Emergency: 112
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C41E3A] to-[#8B0000] rounded-full flex items-center justify-center">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-[#1E3A5F] text-lg leading-tight">Federal Fire Service</h1>
                <p className="text-xs text-gray-500">Federal Republic of Nigeria</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div 
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={createPageUrl(link.page)}
                    className="px-4 py-2 text-[#1E3A5F] hover:text-[#C41E3A] font-medium transition-colors flex items-center gap-1"
                  >
                    {link.name}
                    {link.subLinks && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {link.subLinks && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 min-w-[200px] border border-gray-100"
                        >
                          {link.subLinks.map((sub) => (
                            <Link
                              key={sub.name}
                              to={createPageUrl(sub.page)}
                              className="block px-4 py-2 text-gray-700 hover:bg-[#C41E3A]/5 hover:text-[#C41E3A] transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Emergency Button */}
            <a
              href="tel:112"
              className="hidden md:flex items-center gap-2 bg-[#C41E3A] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#A01830] transition-colors"
            >
              <Phone className="w-4 h-4" />
              Emergency: 112
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#1E3A5F]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      to={createPageUrl(link.page)}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-[#1E3A5F] hover:bg-gray-50 rounded-lg font-medium"
                    >
                      {link.name}
                    </Link>
                    {link.subLinks && (
                      <div className="ml-4 space-y-1">
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.name}
                            to={createPageUrl(sub.page)}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-gray-600 hover:text-[#C41E3A]"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <a
                  href="tel:112"
                  className="flex items-center justify-center gap-2 bg-[#C41E3A] text-white px-5 py-3 rounded-lg font-semibold mt-4"
                >
                  <Phone className="w-4 h-4" />
                  Emergency: 112
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}