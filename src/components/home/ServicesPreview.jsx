import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Flame, Shield, AlertTriangle, Users, Building2, FileCheck, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Flame,
    title: 'Fire Fighting',
    description: 'Professional firefighting operations using modern equipment and trained personnel.',
    color: 'bg-red-500',
  },
  {
    icon: Shield,
    title: 'Fire Prevention',
    description: 'Comprehensive fire safety inspections, audits, and prevention programs.',
    color: 'bg-blue-500',
  },
  {
    icon: AlertTriangle,
    title: 'Rescue Operations',
    description: 'Emergency rescue services including vehicle extrication and confined space rescue.',
    color: 'bg-orange-500',
  },
  {
    icon: Users,
    title: 'Public Education',
    description: 'Fire safety awareness campaigns and training for communities and organizations.',
    color: 'bg-green-500',
  },
  {
    icon: Building2,
    title: 'Safety Certification',
    description: 'Fire safety certification for buildings, facilities, and public spaces.',
    color: 'bg-purple-500',
  },
  {
    icon: FileCheck,
    title: 'Fire Investigation',
    description: 'Professional investigation of fire incidents to determine causes and prevent future occurrences.',
    color: 'bg-teal-500',
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E3A5F] mt-3 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            The Federal Fire Service provides comprehensive fire protection services 
            to safeguard lives and property across Nigeria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to={createPageUrl('Services')}
            className="inline-flex items-center gap-2 text-[#C41E3A] font-semibold hover:gap-4 transition-all"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}