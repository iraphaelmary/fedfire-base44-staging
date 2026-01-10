import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

const highlights = [
  'Over 60 years of dedicated service to Nigeria',
  'Presence in all 36 states and FCT',
  'Modern firefighting equipment and vehicles',
  'Professionally trained personnel',
  'ISO certified fire safety standards',
  '24/7 emergency response capability',
];

export default function AboutPreview() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1E3A5F] to-[#0F1E30]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931"
                  alt="Fire Service Training"
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=2080"
                  alt="Fire Truck"
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=2015"
                  alt="Firefighters"
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
                  alt="Modern Building"
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#C41E3A] text-white p-6 rounded-2xl shadow-2xl">
              <p className="text-4xl font-bold">60+</p>
              <p className="text-sm">Years of Service</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-6">
              Protecting Lives & Property Across Nigeria
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              The Federal Fire Service (FFS) is a federal government agency under the 
              Federal Ministry of Interior, established to prevent and combat fires, 
              provide rescue services, and protect lives and property throughout Nigeria.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={createPageUrl('About')}
                className="inline-flex items-center justify-center gap-2 bg-[#C41E3A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A01830] transition-colors"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={createPageUrl('ControllerGeneral')}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                Meet the Controller General
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}