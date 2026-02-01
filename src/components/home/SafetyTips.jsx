import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, Building2, Car, Lightbulb, Phone } from 'lucide-react';

const tips = [
  {
    icon: Home,
    title: 'Home Safety',
    tips: [
      'Install smoke detectors on every floor',
      'Keep fire extinguishers accessible',
      'Never leave cooking unattended',
      'Create a family escape plan',
    ],
  },
  {
    icon: Building2,
    title: 'Office Safety',
    tips: [
      'Know your emergency exits',
      'Keep corridors clear of obstacles',
      'Report electrical hazards immediately',
      'Participate in fire drills',
    ],
  },
  {
    icon: Car,
    title: 'Vehicle Safety',
    tips: [
      'Keep a fire extinguisher in your car',
      'Never smoke while refueling',
      'Regular vehicle maintenance',
      'Check electrical wiring regularly',
    ],
  },
];

export default function SafetyTips() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[#C41E3A] font-semibold text-xs md:text-sm uppercase tracking-wider">
            Stay Safe
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mt-3 mb-4">
            Fire Safety Tips
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Prevention is better than cure. Learn these essential fire safety
            tips to protect yourself, your family, and your property.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {tips.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-100"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#C41E3A]/10 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6">
                <section.icon className="w-6 h-6 md:w-7 md:h-7 text-[#C41E3A]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#1E3A5F] mb-3 md:mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {section.tips.map((tip, tipIdx) => (
                  <li key={tipIdx} className="flex items-start gap-2 md:gap-3">
                    <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-600">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Emergency Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#C41E3A] to-[#8B0000] rounded-xl md:rounded-2xl p-6 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-3 md:gap-4 text-center md:text-left">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-white">
                  In Case of Emergency
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  Call the National Emergency Number immediately
                </p>
              </div>
            </div>
            <a
              href="tel:08032003557"
              className="flex items-center gap-2 md:gap-3 bg-white text-[#C41E3A] px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-lg md:text-xl hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6" />
              Dial 08032003557
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}