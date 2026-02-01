// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, Users, Building2, Flame } from 'lucide-react';
import servicesBg from "../../src/assets/services-bg.jpg";

const timeline = [
  {
    year: '1901',
    title: 'Colonial Fire Brigade',
    description: 'The first organized fire service was established in Lagos by the British colonial administration.',
    icon: Flame,
  },
  {
    year: '1960',
    title: 'Independence Era',
    description: 'With Nigeria\'s independence, the fire service was reorganized under the new federal structure.',
    icon: MapPin,
  },
  {
    year: '1963',
    title: 'State Fire Services',
    description: 'Regional and later state fire services were established to provide coverage across the federation.',
    icon: Building2,
  },
  {
    year: '1999',
    title: 'Federal Fire Service Act',
    description: 'The Federal Fire Service was formally established by Act No. 12 of 1999.',
    icon: Award,
  },
  {
    year: '2003',
    title: 'Restructuring',
    description: 'The service underwent significant restructuring to improve operational efficiency.',
    icon: Users,
  },
  {
    year: '2007',
    title: 'Modernization Program',
    description: 'Launch of the modernization program with new equipment and training facilities.',
    icon: Calendar,
  },
  {
    year: '2015',
    title: 'National Expansion',
    description: 'Expansion of fire stations to all local government areas and increased recruitment.',
    icon: MapPin,
  },
  {
    year: 'Present',
    title: 'Continuous Growth',
    description: 'The FFS continues to grow, modernize, and improve its services to protect Nigerians.',
    icon: Flame,
  },
];

const milestones = [
  { number: '150+', label: 'Fire Stations' },
  { number: '10,000+', label: 'Personnel' },
  { number: '36', label: 'State Commands' },
  { number: '24/7', label: 'Emergency Coverage' },
];

export default function History() {
  return (
    <div>
      {/* Hero Banner */}
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
              Our History
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Over six decades of dedicated service to the Nigerian nation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-3 mb-6">
              A Legacy of Service
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              The Federal Fire Service of Nigeria has evolved from colonial-era
              fire brigades to become one of Africa's leading fire protection
              agencies. Our history is marked by continuous growth,
              modernization, and an unwavering commitment to protecting lives
              and property.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-[#C41E3A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={milestone.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {milestone.number}
                </p>
                <p className="text-white/80">{milestone.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">
              Through The Years
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-3">
              Historical Timeline
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#C41E3A]/20 transform md:-translate-x-1/2" />

            {timeline.map((event, idx) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#C41E3A] rounded-full transform -translate-x-1/2 mt-6 z-10" />

                {/* Content Card */}
                <div
                  className={`ml-20 md:ml-0 md:w-[45%] ${idx % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#C41E3A]/10 rounded-xl flex items-center justify-center">
                        <event.icon className="w-6 h-6 text-[#C41E3A]" />
                      </div>
                      <span className="text-2xl font-bold text-[#D4AF37]">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Looking Forward */}
      <section className="py-20 bg-[#1E3A5F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Looking Forward
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              As we continue to grow and evolve, the Federal Fire Service
              remains committed to embracing modern technologies, expanding our
              reach to underserved areas, and training the next generation of
              firefighters to protect Nigeria for decades to come.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}