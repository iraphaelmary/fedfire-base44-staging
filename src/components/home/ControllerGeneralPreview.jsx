import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Award, ArrowRight, Quote } from 'lucide-react';

export default function ControllerGeneralPreview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974"
                alt="Controller General"
                className="w-full max-w-md mx-auto rounded-xl md:rounded-2xl shadow-2xl"
              />
              {/* Decorative elements */}
              <div className="hidden md:block absolute -top-4 -left-4 w-24 h-24 bg-[#D4AF37]/20 rounded-full blur-2xl" />
              <div className="hidden md:block absolute -bottom-4 -right-4 w-32 h-32 bg-[#C41E3A]/20 rounded-full blur-2xl" />
              
              {/* Badge */}
              <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 bg-[#1E3A5F] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl shadow-lg">
                <p className="text-xs md:text-sm font-medium text-[#D4AF37]">Controller General</p>
                <p className="text-xs text-gray-300 hidden md:block">Federal Fire Service</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#C41E3A] font-semibold text-xs md:text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E3A5F] mt-3 mb-2">
              Dr. Jaji Olajide Abdulganiyu, mni
            </h2>
            <p className="text-[#D4AF37] font-medium text-base md:text-lg mb-4 md:mb-6">
              Controller General of Federal Fire Service
            </p>

            <div className="relative mb-6 md:mb-8">
              <Quote className="absolute -top-2 -left-2 w-6 h-6 md:w-8 md:h-8 text-[#C41E3A]/20" />
              <p className="text-gray-600 text-sm md:text-lg leading-relaxed italic pl-4 md:pl-6">
                "Our commitment to protecting lives and property remains unwavering. 
                Through modernization, training, and community engagement, we are building 
                a fire service that Nigerians can rely on in their time of need."
              </p>
            </div>

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Dr. Jaji Olajide Abdulganiyu is a distinguished fire service professional 
                with over three decades of experience. Under his leadership, the Federal 
                Fire Service has undergone significant modernization and expansion.
              </p>
              
              <div className="flex flex-wrap gap-2 md:gap-4">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" />
                  <span className="text-xs md:text-sm text-gray-700">Ph.D. in Public Administration</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" />
                  <span className="text-xs md:text-sm text-gray-700">Member, National Institute (mni)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                to={createPageUrl('ControllerGeneral')}
                className="inline-flex items-center justify-center gap-2 bg-[#C41E3A] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base hover:bg-[#A01830] transition-all hover:gap-4"
              >
                View Full Profile
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link
                to={createPageUrl('Leadership')}
                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-[#1E3A5F] px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base hover:bg-gray-200 transition-colors"
              >
                Meet Our Leadership Team
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}