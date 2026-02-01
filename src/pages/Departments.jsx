import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, Shield, GraduationCap, Users, FileText, Briefcase, 
  Building2, Truck, Search, Globe, Stethoscope, Wrench 
} from 'lucide-react';
import servicesBg from "../../src/assets/services-bg.jpg";

const departments = [
  {
    icon: Flame,
    name: 'Operations Department',
    head: 'Deputy Controller General (Operations)',
    description: 'Responsible for all firefighting and emergency response operations across Nigeria. Coordinates deployment of resources and personnel during emergencies.',
    functions: [
      'Fire suppression operations',
      'Emergency response coordination',
      'Incident command management',
      'Resource deployment',
    ],
    color: 'bg-red-500',
  },
  {
    icon: Shield,
    name: 'Fire Prevention Department',
    head: 'Deputy Controller General (Prevention)',
    description: 'Oversees all fire prevention activities including inspections, certifications, and public safety campaigns.',
    functions: [
      'Fire safety inspections',
      'Building plan approvals',
      'Fire safety certifications',
      'Code enforcement',
    ],
    color: 'bg-blue-500',
  },
  {
    icon: GraduationCap,
    name: 'Training & Development',
    head: 'Assistant Controller General (Training)',
    description: 'Manages all training programs, professional development, and capacity building for fire service personnel.',
    functions: [
      'Recruit training programs',
      'Professional development courses',
      'Specialized training',
      'International training partnerships',
    ],
    color: 'bg-green-500',
  },
  {
    icon: Search,
    name: 'Fire Investigation Unit',
    head: 'Assistant Controller General (Investigation)',
    description: 'Investigates fire incidents to determine origin, cause, and circumstances for prevention and legal purposes.',
    functions: [
      'Fire scene examination',
      'Evidence collection',
      'Forensic analysis',
      'Expert witness services',
    ],
    color: 'bg-purple-500',
  },
  {
    icon: Truck,
    name: 'Logistics & Equipment',
    head: 'Deputy Controller General (Logistics)',
    description: 'Manages procurement, maintenance, and distribution of firefighting equipment, vehicles, and supplies.',
    functions: [
      'Equipment procurement',
      'Vehicle maintenance',
      'Supply chain management',
      'Equipment distribution',
    ],
    color: 'bg-orange-500',
  },
  {
    icon: Users,
    name: 'Human Resources',
    head: 'Assistant Controller General (HR)',
    description: 'Handles personnel matters including recruitment, welfare, promotions, and staff development.',
    functions: [
      'Recruitment & selection',
      'Staff welfare programs',
      'Career progression',
      'Disciplinary matters',
    ],
    color: 'bg-teal-500',
  },
  {
    icon: FileText,
    name: 'Administration & Finance',
    head: 'Deputy Controller General (Admin)',
    description: 'Manages administrative functions, budgeting, and financial operations of the service.',
    functions: [
      'Budget management',
      'Financial accounting',
      'Administrative support',
      'Procurement processes',
    ],
    color: 'bg-indigo-500',
  },
  {
    icon: Globe,
    name: 'Public Relations',
    head: 'Assistant Controller General (PR)',
    description: 'Handles media relations, public communications, and community engagement programs.',
    functions: [
      'Media communications',
      'Public awareness campaigns',
      'Community engagement',
      'Social media management',
    ],
    color: 'bg-pink-500',
  },
  {
    icon: Stethoscope,
    name: 'Medical Services',
    head: 'Chief Medical Officer',
    description: 'Provides medical support to fire service personnel and manages emergency medical response capabilities.',
    functions: [
      'Personnel medical care',
      'Emergency medical response',
      'Health & fitness programs',
      'Occupational health services',
    ],
    color: 'bg-cyan-500',
  },
  {
    icon: Wrench,
    name: 'Works & Maintenance',
    head: 'Assistant Controller General (Works)',
    description: 'Maintains fire stations, facilities, and infrastructure across the service.',
    functions: [
      'Facility maintenance',
      'Building construction',
      'Infrastructure development',
      'Utility management',
    ],
    color: 'bg-amber-500',
  },
];

const zoneCommands = [
  { zone: 'Zone A', headquarters: 'Lagos', states: 'Lagos, Ogun, Oyo, Osun, Ondo, Ekiti' },
  { zone: 'Zone B', headquarters: 'Enugu', states: 'Enugu, Anambra, Ebonyi, Imo, Abia' },
  { zone: 'Zone C', headquarters: 'Kaduna', states: 'Kaduna, Kano, Katsina, Jigawa, Zamfara' },
  { zone: 'Zone D', headquarters: 'Maiduguri', states: 'Borno, Yobe, Adamawa, Bauchi, Gombe, Taraba' },
  { zone: 'Zone E', headquarters: 'Jos', states: 'Plateau, Nasarawa, Benue, Kogi, Niger' },
  { zone: 'Zone F', headquarters: 'Port Harcourt', states: 'Rivers, Bayelsa, Cross River, Akwa Ibom, Delta, Edo' },
];

export default function Departments() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${servicesBg})`,
          }}
        >
          <div className="absolute inset-0 bg-[#1E3A5F]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Departments
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Our organizational structure designed for effective fire service
              delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">
              Organization
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-3 mb-4">
              Headquarters Departments
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              The Federal Fire Service is organized into specialized departments
              to ensure efficient service delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, idx) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 hover:bg-white"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-14 h-14 ${dept.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <dept.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3A5F]">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-[#C41E3A]">{dept.head}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-[#1E3A5F] mb-2">
                    Key Functions:
                  </p>
                  <ul className="grid grid-cols-2 gap-2">
                    {dept.functions.map((func, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                        {func}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Zonal Commands */}
      <section className="py-20 bg-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider">
              Nationwide Coverage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
              Zonal Commands
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              The FFS operates through zonal commands to ensure effective
              coverage across all states.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zoneCommands.map((zone, idx) => (
              <motion.div
                key={zone.zone}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="text-xl font-bold text-white">{zone.zone}</h3>
                </div>
                <p className="text-[#D4AF37] font-medium mb-2">
                  HQ: {zone.headquarters}
                </p>
                <p className="text-gray-300 text-sm">{zone.states}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* State Commands */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-6">
              36 State Commands + FCT
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              The Federal Fire Service maintains a command in each of Nigeria's
              36 states and the Federal Capital Territory, ensuring
              comprehensive coverage and rapid response capabilities across the
              nation.
            </p>
            <div className="bg-[#C41E3A] text-white rounded-2xl p-8 inline-block">
              <p className="text-4xl font-bold">150+</p>
              <p className="text-white/80">Fire Stations Nationwide</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}