import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, Shield, AlertTriangle, Users, Building2, FileCheck, 
  Truck, Droplets, GraduationCap, Search, Phone, ArrowRight 
} from 'lucide-react';
import servicesBg from "../../src/assets/services-bg.jpg";

const services = [
  {
    icon: Flame,
    title: 'Fire Fighting Operations',
    description: 'Our core service involves responding to fire emergencies across Nigeria. Our trained firefighters use modern equipment and proven techniques to combat fires of all types - structural, industrial, vehicle, and wildland fires.',
    features: ['24/7 Emergency Response', 'Structural Fire Suppression', 'Industrial Fire Response', 'Vehicle Fire Response'],
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Fire Prevention & Inspection',
    description: 'Prevention is the first line of defense against fire. We conduct comprehensive fire safety inspections, audits, and assessments to identify hazards before they become disasters.',
    features: ['Building Fire Safety Inspection', 'Industrial Safety Audits', 'Fire Risk Assessment', 'Compliance Verification'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: AlertTriangle,
    title: 'Rescue & Emergency Response',
    description: 'Beyond firefighting, our personnel are trained in various rescue operations to save lives in emergency situations including road accidents, building collapses, and confined spaces.',
    features: ['Vehicle Extrication', 'High-Angle Rescue', 'Confined Space Rescue', 'Water Rescue'],
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Building2,
    title: 'Fire Safety Certification',
    description: 'We issue fire safety certificates for buildings, facilities, and public spaces after thorough inspection to ensure compliance with national fire safety standards.',
    features: ['Building Certification', 'Occupancy Permits', 'Event Safety Clearance', 'Periodic Renewals'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FileCheck,
    title: 'Fire Investigation',
    description: 'Our fire investigation unit determines the origin and cause of fires to support legal proceedings and develop better prevention strategies.',
    features: ['Origin & Cause Determination', 'Evidence Collection', 'Expert Testimony', 'Arson Investigation'],
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: Users,
    title: 'Public Education & Awareness',
    description: 'We conduct fire safety awareness programs for communities, schools, organizations, and businesses to promote fire prevention culture.',
    features: ['School Programs', 'Community Workshops', 'Corporate Training', 'Media Campaigns'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Droplets,
    title: 'Hazmat Response',
    description: 'Specialized units respond to hazardous material incidents including chemical spills, gas leaks, and other dangerous substance emergencies.',
    features: ['Chemical Spill Response', 'Gas Leak Containment', 'Decontamination', 'Environmental Protection'],
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: GraduationCap,
    title: 'Training & Consultancy',
    description: 'We provide professional fire safety training and consultancy services to organizations seeking to improve their fire safety preparedness.',
    features: ['Fire Drill Exercises', 'Staff Training', 'Emergency Planning', 'Safety Consultancy'],
    color: 'from-indigo-500 to-purple-500',
  },
];

export default function Services() {
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
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Comprehensive fire protection and emergency services for Nigeria.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-3 mb-4">
              Comprehensive Fire Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              The Federal Fire Service provides a wide range of services to
              protect lives and property across Nigeria.
            </p>
          </motion.div>

          <div className="space-y-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group"
              >
                <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Icon & Title */}
                    <div className="lg:col-span-4 flex items-center gap-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1E3A5F]">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="lg:col-span-5">
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="lg:col-span-3">
                      <ul className="space-y-2">
                        {service.features.map((feature, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-[#C41E3A] rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Request Service */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-3">
              How to Request Our Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Contact Us",
                description:
                  "Reach out through phone, email, or visit the nearest fire station.",
              },
              {
                step: "2",
                title: "Schedule Inspection",
                description:
                  "Our team will arrange a convenient time for inspection or consultation.",
              },
              {
                step: "3",
                title: "Get Certified",
                description:
                  "Upon compliance, receive your fire safety certificate or report.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#C41E3A] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-[#C41E3A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Emergency? Call Now!
            </h2>
            <p className="text-white/80 text-lg mb-8">
              For fire emergencies, rescue operations, or any life-threatening
              situation, call our emergency line immediately.
            </p>
            <a
              href="tel:08032003557"
              className="inline-flex items-center gap-3 bg-white text-[#C41E3A] px-10 py-5 rounded-full font-bold text-2xl hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-8 h-8" />
              Dial 08032003557
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}