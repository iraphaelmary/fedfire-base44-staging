import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Flame, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1E3A5F] text-white">
      {/* Emergency Banner */}
      <div className="bg-[#C41E3A] py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <span className="font-semibold text-lg">In case of fire emergency, call:</span>
          <a href="tel:112" className="text-2xl font-bold hover:text-[#D4AF37] transition-colors">
            112 (National Emergency Number)
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#C41E3A] rounded-full flex items-center justify-center">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Federal Fire Service</h3>
                <p className="text-sm text-gray-400">Nigeria</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The Federal Fire Service is committed to protecting lives and property through 
              fire prevention, firefighting, and rescue operations across Nigeria.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-[#D4AF37]">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', page: 'About' },
                { name: 'Our Services', page: 'Services' },
                { name: 'Departments', page: 'Departments' },
                { name: 'News & Updates', page: 'Blog' },
                { name: 'Contact Us', page: 'Contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={createPageUrl(link.page)}
                    className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-[#D4AF37]">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C41E3A] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Federal Fire Service Headquarters,<br />
                  Central Business District,<br />
                  Abuja, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C41E3A]" />
                <a href="tel:112" className="text-gray-300 hover:text-white text-sm">
                  Emergency: 112
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C41E3A]" />
                <a href="mailto:info@fedfire.gov.ng" className="text-gray-300 hover:text-white text-sm">
                  info@fedfire.gov.ng
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-[#D4AF37]">Follow Us</h4>
            <p className="text-gray-300 text-sm mb-4">
              Stay connected with us on social media for the latest updates and safety tips.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C41E3A] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Federal Fire Service of Nigeria. All rights reserved.</p>
          <p>A service of the Federal Ministry of Interior</p>
        </div>
      </div>
    </footer>
  );
}