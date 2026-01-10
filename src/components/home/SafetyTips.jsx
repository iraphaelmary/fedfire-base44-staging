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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">Stay Safe</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E3A5F] mt-3 mb-4">
            Fire Safety Tips
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Prevention is better than cure. Learn these essential fire safety tips to protect yourself, 
            your family, and your property.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tips.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100"
            >
              <div className="w-14 h-14 bg-[#C41E3A]/10 rounded-xl flex items-center justify-center mb-6">
                <section.icon className="w-7 h-7 text-[#C41E3A]" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A5F] mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.tips.map((tip, tipIdx) => (
                  <li key={tipIdx} className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{tip}</span>
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
          className="bg-gradient-to-r from-[#C41E3A] to-[#8B0000] rounded-2xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">In Case of Emergency</h3>
                <p className="text-white/80">Call the National Emergency Number immediately</p>
              </div>
            </div>
            <a
              href="tel:112"
              className="flex items-center gap-3 bg-white text-[#C41E3A] px-8 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-6 h-6" />
              Dial 112
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}