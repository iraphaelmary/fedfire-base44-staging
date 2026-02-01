import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Stat1 from "../../../src/assets/stat1.jpg";
import Stat2 from "../../../src/assets/stat2.jpg";
import Stat3 from "../../../src/assets/stat3.jpg";
import Stat4 from "../../../src/assets/stat4.jpg";

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
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#1E3A5F] to-[#0F1E30]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-3 md:space-y-4">
                <img
                  src={Stat1}
                  alt="Fire Service Training"
                  className="w-full h-32 md:h-48 object-cover rounded-xl md:rounded-2xl"
                />
                <img
                  src={Stat2}
                  alt="Fire Truck"
                  className="w-full h-48 md:h-64 object-cover rounded-xl md:rounded-2xl"
                />
              </div>
              <div className="space-y-3 md:space-y-4 pt-6 md:pt-8">
                <img
                  src={Stat3}
                  alt="Firefighters"
                  className="w-full h-48 md:h-64 object-cover rounded-xl md:rounded-2xl"
                />
                <img
                  src={Stat4}
                  alt="Modern Building"
                  className="w-full h-32 md:h-48 object-cover rounded-xl md:rounded-2xl"
                />
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-[#C41E3A] text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-2xl">
              <p className="text-2xl md:text-4xl font-bold">60+</p>
              <p className="text-xs md:text-sm">Years of Service</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#D4AF37] font-semibold text-xs md:text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4 md:mb-6">
              Protecting Lives & Property Across Nigeria
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              The Federal Fire Service (FFS) is a federal government agency
              under the Federal Ministry of Interior, established to prevent and
              combat fires, provide rescue services, and protect lives and
              property throughout Nigeria.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 md:gap-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                to={createPageUrl("About")}
                className="inline-flex items-center justify-center gap-2 bg-[#C41E3A] text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-[#A01830] transition-colors"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link
                to={createPageUrl("ControllerGeneral")}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base border border-white/20 hover:bg-white/20 transition-colors"
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