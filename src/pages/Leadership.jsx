import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Mail, Phone, ArrowRight } from 'lucide-react';

const leaders = [
  {
    name: 'Dr. Jaji Olajide Abdulganiyu, mni',
    rank: 'Controller General of Fire (CGF)',
    title: 'Controller General',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974',
    education: ['Ph.D. Public Administration', 'M.Sc. Fire Service Administration', 'Member, National Institute (mni)'],
    experience: '35+ years in fire service',
    responsibilities: 'Overall leadership and strategic direction of the Federal Fire Service',
    isCG: true,
  },
  {
    name: 'Engr. Mohammed Bello Ibrahim',
    rank: 'Deputy Controller General of Fire (DCG)',
    title: 'DCG Operations',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070',
    education: ['M.Sc. Fire Engineering', 'B.Eng. Mechanical Engineering'],
    experience: '30+ years in fire service',
    responsibilities: 'Oversees all firefighting and emergency response operations nationwide',
  },
  {
    name: 'Mrs. Amina Suleiman Yusuf',
    rank: 'Deputy Controller General of Fire (DCG)',
    title: 'DCG Administration',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976',
    education: ['M.Sc. Public Administration', 'B.Sc. Business Administration'],
    experience: '28+ years in fire service',
    responsibilities: 'Manages administrative functions, human resources, and financial operations',
  },
  {
    name: 'Engr. Chukwuemeka Okonkwo',
    rank: 'Deputy Controller General of Fire (DCG)',
    title: 'DCG Logistics',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974',
    education: ['M.Eng. Fire Safety Engineering', 'B.Eng. Electrical Engineering'],
    experience: '27+ years in fire service',
    responsibilities: 'Procurement, maintenance, and distribution of firefighting equipment and vehicles',
  },
  {
    name: 'Dr. Fatima Abubakar Garba',
    rank: 'Deputy Controller General of Fire (DCG)',
    title: 'DCG Prevention',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961',
    education: ['Ph.D. Fire Science', 'M.Sc. Fire Prevention'],
    experience: '26+ years in fire service',
    responsibilities: 'Fire safety inspections, certifications, and public awareness campaigns',
  },
  {
    name: 'Mr. Adebayo Oladipo Akinyemi',
    rank: 'Assistant Controller General of Fire (ACG)',
    title: 'ACG Training',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974',
    education: ['M.Sc. Fire Service Management', 'Advanced Fire Training (UK)'],
    experience: '24+ years in fire service',
    responsibilities: 'Training programs, professional development, and capacity building',
  },
  {
    name: 'Mr. Usman Danladi Muhammed',
    rank: 'Assistant Controller General of Fire (ACG)',
    title: 'ACG Investigation',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974',
    education: ['M.Sc. Forensic Science', 'Fire Investigation Certification (USA)'],
    experience: '23+ years in fire service',
    responsibilities: 'Fire investigation, forensic analysis, and evidence collection',
  },
  {
    name: 'Mrs. Grace Nneka Eze',
    rank: 'Assistant Controller General of Fire (ACG)',
    title: 'ACG Human Resources',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1974',
    education: ['M.Sc. Human Resource Management', 'B.Sc. Psychology'],
    experience: '22+ years in fire service',
    responsibilities: 'Recruitment, welfare, promotions, and staff development',
  },
  {
    name: 'Engr. Yakubu Musa Abdullahi',
    rank: 'Assistant Controller General of Fire (ACG)',
    title: 'ACG Works',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974',
    education: ['M.Eng. Civil Engineering', 'B.Eng. Building Technology'],
    experience: '21+ years in fire service',
    responsibilities: 'Fire station construction, facility maintenance, and infrastructure development',
  },
  {
    name: 'Mr. Oluwaseun Afolabi Johnson',
    rank: 'Assistant Controller General of Fire (ACG)',
    title: 'ACG Public Relations',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070',
    education: ['M.Sc. Mass Communication', 'B.Sc. Journalism'],
    experience: '20+ years in fire service',
    responsibilities: 'Media relations, public communications, and community engagement',
  },
  {
    name: 'Dr. Hauwa Ibrahim Abubakar',
    rank: 'Assistant Controller General of Fire (ACG)',
    title: 'ACG Planning & Research',
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=1974',
    education: ['Ph.D. Strategic Management', 'M.Sc. Policy Analysis'],
    experience: '19+ years in fire service',
    responsibilities: 'Strategic planning, policy development, and research coordination',
  },
];

export default function Leadership() {
  const cg = leaders.find(l => l.isCG);
  const dcgs = leaders.filter(l => l.rank.includes('Deputy'));
  const acgs = leaders.filter(l => l.rank.includes('Assistant'));

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')`
          }}
        >
          <div className="absolute inset-0 bg-[#1E3A5F]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Leadership</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Meet the distinguished officers leading the Federal Fire Service of Nigeria.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Controller General Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">Head of Service</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-3">Controller General</h2>
          </motion.div>

          {cg && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F1E30] rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1">
                    <div className="relative">
                      <img
                        src={cg.image}
                        alt={cg.name}
                        className="w-full max-w-xs mx-auto rounded-2xl shadow-xl"
                      />
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1E3A5F] px-4 py-2 rounded-lg font-semibold text-sm">
                        {cg.rank}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{cg.name}</h3>
                    <p className="text-[#D4AF37] font-medium text-lg mb-6">{cg.title}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">EDUCATION & QUALIFICATIONS</h4>
                        <div className="flex flex-wrap gap-2">
                          {cg.education.map((edu, idx) => (
                            <span key={idx} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                              {edu}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">EXPERIENCE</h4>
                        <p className="text-gray-300">{cg.experience}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">RESPONSIBILITIES</h4>
                        <p className="text-gray-300">{cg.responsibilities}</p>
                      </div>
                    </div>

                    <Link
                      to={createPageUrl('ControllerGeneral')}
                      className="inline-flex items-center gap-2 bg-[#C41E3A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A01830] transition-all hover:gap-4"
                    >
                      View Full Profile
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Deputy Controller Generals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">Senior Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-3">Deputy Controller Generals</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              The Deputy Controller Generals oversee major departments and support the Controller General in strategic operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dcgs.map((leader, idx) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                  </div>
                  <div className="sm:w-2/3 p-6">
                    <span className="inline-block bg-[#C41E3A]/10 text-[#C41E3A] px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {leader.rank}
                    </span>
                    <h3 className="text-xl font-bold text-[#1E3A5F] mb-1">{leader.name}</h3>
                    <p className="text-[#D4AF37] font-medium text-sm mb-4">{leader.title}</p>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-gray-500 font-medium">Education:</p>
                        <p className="text-gray-700">{leader.education.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">Experience:</p>
                        <p className="text-gray-700">{leader.experience}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">Responsibilities:</p>
                        <p className="text-gray-700">{leader.responsibilities}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Assistant Controller Generals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#C41E3A] font-semibold text-sm uppercase tracking-wider">Management Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mt-3">Assistant Controller Generals</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Our Assistant Controller Generals lead specialized units and ensure operational excellence across all functions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {acgs.map((leader, idx) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all hover:bg-white border border-transparent hover:border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div>
                    <span className="inline-block bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded text-xs font-semibold mb-1">
                      ACG
                    </span>
                    <h3 className="font-bold text-[#1E3A5F] leading-tight">{leader.name}</h3>
                    <p className="text-[#C41E3A] text-sm font-medium">{leader.title}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">{leader.education[0]}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">{leader.experience}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500 font-medium mb-1">RESPONSIBILITIES</p>
                  <p className="text-sm text-gray-700">{leader.responsibilities}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1E3A5F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Learn More About Our Organization
            </h2>
            <p className="text-gray-300 mb-8">
              Explore our departments, services, and how we protect lives and property across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={createPageUrl('Departments')}
                className="inline-flex items-center justify-center gap-2 bg-[#C41E3A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A01830] transition-colors"
              >
                View Departments
              </Link>
              <Link
                to={createPageUrl('Contact')}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}