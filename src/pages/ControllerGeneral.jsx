// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import servicesBg from "../../src/assets/services-bg.jpg";
import cgSign from "../../src/assets/cg-sign.jpg";

const achievements = [
  "Modernization of firefighting equipment across all state commands",
  "Implementation of the National Fire Safety Code",
  "Establishment of specialized rescue and hazmat units",
  "Expansion of fire stations to underserved communities",
  "Launch of public fire safety awareness campaigns",
  "Training partnerships with international fire agencies",
];

const career = [
  {
    year: "1985",
    position: "Joined the Federal Fire Service as Cadet Officer",
  },
  { year: "1992", position: "Promoted to Assistant Superintendent of Fire" },
  { year: "2000", position: "Appointed Zonal Commander, North Central Zone" },
  { year: "2008", position: "Promoted to Deputy Controller of Fire" },
  { year: "2015", position: "Appointed Assistant Controller General" },
  {
    year: "2020",
    position: "Appointed Controller General of Federal Fire Service",
  },
];

export default function ControllerGeneral() {
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
              Controller General
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Leadership driving excellence in fire service delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Photo & Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src={cgSign}
                  alt="Controller General"
                  className="w-full max-w-md rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-[#C41E3A] text-white p-4 rounded-xl shadow-lg">
                  <p className="font-semibold">Controller General</p>
                  <p className="text-sm opacity-80">Federal Fire Service</p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="mt-12 bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-[#1E3A5F] text-lg mb-4">
                  Office Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#C41E3A]" />
                    <span className="text-gray-600">
                      FFS Headquarters, Area 10 Garki, Abuja
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#C41E3A]" />
                    <a
                      href="mailto:cg@fedfire.gov.ng"
                      className="text-gray-600 hover:text-[#C41E3A]"
                    >
                      cg@fedfire.gov.ng
                    </a>
                  </div> */}
                  {/* <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#C41E3A]" />
                    <span className="text-gray-600">+234-xxx-xxx-xxxx</span>
                  </div> */}
                </div>
              </div>
            </motion.div>

            {/* Bio & Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">
                Profile
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-3 mb-2">
                Dr. Olumode Samuel, mni
              </h2>
              <p className="text-[#D4AF37] font-medium mb-6">
                Controller General, Federal Fire Service
              </p>

              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  Olumode Samuel is the current Controller General of the
                  Federal Fire Service of Nigeria. A distinguished officer with
                  over three decades of experience in fire service operations,
                  he has dedicated his career to improving fire safety standards
                  across Nigeria.
                </p>
                <p>
                  Under his leadership, the Federal Fire Service has undergone
                  significant modernization, including the acquisition of
                  state-of-the-art firefighting equipment, expansion of fire
                  stations nationwide, and implementation of comprehensive
                  training programs.
                </p>
                <p>
                  Olumode Samuel holds a doctorate degree in Public
                  Administration and is a member of the National Institute
                  (mni). He has attended numerous international courses on fire
                  service management and emergency response.
                </p>
              </div>

              {/* Education */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-6 h-6 text-[#C41E3A]" />
                  <h3 className="text-xl font-bold text-[#1E3A5F]">
                    Education
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Ph.D. in Public Administration</li>
                  <li>• M.Sc. in Fire Service Administration</li>
                  <li>• B.Sc. in Fire Safety Engineering</li>
                  <li>• Member, National Institute (mni)</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-[#C41E3A]" />
              <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">
                Career Journey
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F]">
              Professional Timeline
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#C41E3A]/20 transform md:-translate-x-1/2" />

            {career.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-center mb-8 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#C41E3A] rounded-full transform -translate-x-1/2 z-10" />

                <div
                  className={`ml-12 md:ml-0 md:w-[45%] ${idx % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}
                >
                  <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow inline-block">
                    <span className="text-[#D4AF37] font-bold text-lg">
                      {item.year}
                    </span>
                    <p className="text-gray-700 mt-1">{item.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-[#1E3A5F]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-6 h-6 text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider">
                Leadership Impact
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Key Achievements
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 bg-white/10 rounded-xl p-5 backdrop-blur-sm"
              >
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 text-[#1E3A5F] font-bold">
                  {idx + 1}
                </div>
                <p className="text-white">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
