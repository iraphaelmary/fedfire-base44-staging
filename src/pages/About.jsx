// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Shield, ArrowRight } from "lucide-react";
import guardInspection from "../../src/assets/guard-inspection.jpg";
import logo from "../../src/assets/ffslogo.jpg";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We uphold the highest standards of professionalism and ethical conduct.",
  },
  {
    icon: Users,
    title: "Service",
    description:
      "We are dedicated to serving the Nigerian people with excellence.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for continuous improvement in all our operations.",
  },
  {
    icon: Award,
    title: "Commitment",
    description:
      "We are committed to protecting lives and property at all times.",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${guardInspection})`,
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
              About Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Learn about our history, mission, and commitment to protecting
              Nigeria.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-3 mb-6">
                The Federal Fire Service of Nigeria
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The Federal Fire Service (FFS) is a federal government agency
                  established to prevent and combat fires, provide rescue
                  services, and protect lives and property throughout the
                  Federal Republic of Nigeria.
                </p>
                <p>
                  Operating under the Federal Ministry of Interior, the FFS
                  maintains a presence in all 36 states and the Federal Capital
                  Territory, with over 150 fire stations strategically located
                  across the nation.
                </p>
                <p>
                  Our dedicated personnel are trained to international standards
                  and equipped with modern firefighting equipment to respond
                  effectively to fire emergencies, rescue operations, and
                  disaster management situations.
                </p>
              </div>
              <Link
                to={createPageUrl("History")}
                className="inline-flex items-center gap-2 text-[#C41E3A] font-semibold mt-6 hover:gap-4 transition-all"
              >
                Explore Our History
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={logo}
                alt="Federal Fire Service Team"
                className="w-full h-[700px] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-[#C41E3A] text-white p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">60+</p>
                <p className="text-sm opacity-80">Years of Service</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-10 shadow-lg border-l-4 border-[#C41E3A]"
            >
              <div className="w-14 h-14 bg-[#C41E3A]/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#C41E3A]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To prevent and combat fires, provide rescue services, and
                protect lives and property through excellence in fire
                prevention, firefighting, and emergency response operations
                across Nigeria, while promoting fire safety awareness among
                citizens.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-10 shadow-lg border-l-4 border-[#D4AF37]"
            >
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be a world-class fire service organization, recognized for
                excellence in fire prevention, firefighting, rescue operations,
                and disaster management, ensuring the safety and security of
                lives and property throughout Nigeria.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider">
              What Guides Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-6">
              Meet Our Leadership
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Learn more about the Controller General and the leadership team
              driving the Federal Fire Service forward.
            </p>
            <Link
              to={createPageUrl("ControllerGeneral")}
              className="inline-flex items-center gap-2 bg-[#C41E3A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A01830] transition-colors"
            >
              View Controller General's Profile
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
