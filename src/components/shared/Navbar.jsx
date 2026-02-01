import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/lib/utils';
import { Menu, X, ChevronDown, Phone, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { isAdmin, isSuperAdmin } from "@/components/utils/security";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/ffslogo.jpg";
import { LogoutConfirmation } from "./LogoutConfirmation";

const navLinks = [
  { name: 'Home', page: 'Home' },
  {
    name: 'About Us', page: 'About', subLinks: [
      { name: 'Our History', page: 'History' },
      { name: 'Controller General', page: 'ControllerGeneral' },
      { name: 'Leadership', page: 'Leadership' },
    ]
  },
  { name: 'Services', page: 'Services' },
  { name: 'Departments', page: 'Departments' },
  { name: 'News & Blog', page: 'Blog' },
  { name: 'Contact', page: 'Contact' },
];

export default function Navbar() {
  const { logout, isAuthenticated, token } = useAuth();
  const currentUser = useQuery(api.users.viewer, { token: token ?? undefined });
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setIsOpen(false);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  return (
    <div className="overflow-x-hidden">
      <LogoutConfirmation
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
      />

      {/* Top Bar */}
      <div className="bg-[#1E3A5F] text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>
            Federal Fire Service of Nigeria - Protecting Lives & Property
          </span>
          <div className="flex items-center gap-4">
            <a
              href="tel:08032003557"
              className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-4 h-4" />
              Emergency: 08032003557
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-md"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to={createPageUrl("Home")}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-transparent flex items-center justify-center">
                <img
                  src={logo}
                  alt="logo"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-[#1E3A5F] text-lg leading-tight">
                  Federal Fire Service
                </h1>
                <p className="text-xs text-gray-500">
                  Federal Republic of Nigeria
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() =>
                    link.subLinks && setActiveDropdown(link.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={createPageUrl(link.page)}
                    className="px-4 py-2 text-[#1E3A5F] hover:text-[#C41E3A] font-semibold text-sm transition-all flex items-center gap-1 relative overflow-hidden"
                  >
                    <span>{link.name}</span>
                    {link.subLinks && <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />}

                    {/* Hover indicator bar */}
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#C41E3A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {isAdmin(currentUser) && (
                <div className="flex items-center gap-6 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                  {isSuperAdmin(currentUser) && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 text-[#1E3A5F] hover:text-[#C41E3A] text-sm font-semibold transition-colors"
                    >
                      <Settings className="w-4 h-4 text-[#C41E3A]" />
                      <span>Admin</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 text-gray-500 hover:text-red-600 text-sm font-semibold transition-colors border-l pl-4 border-gray-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}

              <a
                href="tel:08032003557"
                className="hidden xl:flex items-center gap-2 bg-[#C41E3A] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm shadow-red-900/10 hover:bg-[#A01830] transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                Emergency: 08032003557
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#1E3A5F]"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[80%] bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setIsOpen(false)} className="p-2 text-[#1E3A5F]">
                  <X className="w-6 h-6" />
                </button>
              </div>
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

                {isAdmin(currentUser) && (
                  <>
                    {isSuperAdmin(currentUser) && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-[#1E3A5F] hover:bg-gray-50 rounded-lg font-medium border-t mt-2"
                      >
                        <Settings className="w-5 h-5" />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogoutClick}
                      className="w-full flex items-center gap-2 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg font-medium"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                )}

                <a
                  href="tel:08032003557"
                  className="flex items-center justify-center gap-2 bg-[#C41E3A] text-white px-5 py-3 rounded-lg font-semibold mt-4 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  Emergency: 08032003557
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
