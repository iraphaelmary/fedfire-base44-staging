// @ts-nocheck
// import React from "react";
// import { Link } from "react-router-dom";
// import { createPageUrl } from "@/lib/utils";
// import { motion } from "framer-motion";
// import { Phone, Shield, ArrowRight } from "lucide-react";
// import HeroImg from "../../../src/assets/hero-image.jpg";

// export default function HeroSection() {
//   return (
//     <section className="relative min-h-[90vh] flex items-center overflow-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${HeroImg})`,
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 via-[#1E3A5F]/80 to-transparent" />
//       </div>

//       {/* Decorative Elements */}
//       <div className="absolute top-10 right-10 md:top-20 md:right-20 w-48 h-48 md:w-72 md:h-72 bg-[#C41E3A]/20 rounded-full blur-3xl" />
//       <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-64 h-64 md:w-96 md:h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />

//       <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
//         <div className="max-w-3xl">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="inline-flex items-center gap-2 bg-[#C41E3A]/20 text-[#D4AF37] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
//               <Shield className="w-3 h-3 md:w-4 md:h-4" />
//               Federal Republic of Nigeria
//             </span>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 md:mb-6"
//           >
//             Federal Fire
//             <span className="text-[#D4AF37]"> Service</span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-base md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 leading-relaxed"
//           >
//             Dedicated to protecting lives and property through excellence in
//             fire prevention, firefighting, and rescue operations across Nigeria.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="flex flex-col sm:flex-row gap-4"
//           >
//             <Link
//               to={createPageUrl("Services")}
//               className="inline-flex items-center justify-center gap-2 bg-[#C41E3A] text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-[#A01830] transition-all hover:gap-4"
//             >
//               Our Services
//               <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
//             </Link>
//             <a
//               href="tel:08032003557"
//               className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg border border-white/20 hover:bg-white/20 transition-all"
//             >
//               <Phone className="w-4 h-4 md:w-5 md:h-5" />
//               Emergency: 08032003557
//             </a>
//           </motion.div>
//         </div>
//       </div>

//       {/* Stats Bar */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.5 }}
//         className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/10"
//       >
//         <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
//             {[
//               { value: "36+", label: "State Commands" },
//               { value: "150+", label: "Fire Stations" },
//               { value: "24/7", label: "Emergency Response" },
//               { value: "60+", label: "Years of Service" },
//             ].map((stat, idx) => (
//               <div key={idx} className="text-center">
//                 <p className="text-xl md:text-3xl font-bold text-[#D4AF37]">
//                   {stat.value}
//                 </p>
//                 <p className="text-xs md:text-sm text-gray-300">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

// ---------------------------------- Previous Version with Carousel ---------------------------------- //

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Shield, ArrowRight } from "lucide-react";
import CountUp from "react-countup";

import Hero1 from "../../../src/assets/hero-image.jpg";
import Hero2 from "../../../src/assets/audit.jpeg";
import Hero3 from "../../../src/assets/services-bg.jpg";
import Hero4 from "../../../src/assets/stat4.jpg";

const slides = [
  {
    title: "Federal Fire Service",
    subtitle:
      "Dedicated to protecting lives and property through excellence in fire prevention and rescue operations.",
    bg: Hero1,
    cta: { label: "Our Services", link: "Services" },
  },
  {
    title: "Rapid Emergency Response",
    subtitle:
      "24/7 nationwide response backed by trained professionals and modern equipment.",
    bg: Hero2,
    cta: { label: "Emergency Guidelines", link: "Guidelines" },
  },
  {
    title: "Fire Prevention & Safety",
    subtitle:
      "Inspection, risk assessment and enforcement to reduce fire incidents.",
    bg: Hero3,
    cta: { label: "Safety Tips", link: "Safety" },
  },
  {
    title: "Rescue & Disaster Management",
    subtitle: "Specialized rescue operations during emergencies and disasters.",
    bg: Hero4,
    cta: { label: "Disaster Response", link: "Disaster" },
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const duration = 6000;

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [index]);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    let start = Date.now();
    intervalRef.current = setInterval(() => {
      const percent = ((Date.now() - start) / duration) * 100;
      if (percent >= 100) nextSlide();
      else setProgress(percent);
    }, 50);
  };

  const pauseTimer = () => clearInterval(intervalRef.current);

  return (
    <section
      className="relative min-h-[95vh] flex items-center overflow-hidden"
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -100) nextSlide();
            if (info.offset.x > 100)
              setIndex((prev) => (prev - 1 + slides.length) % slides.length);
          }}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[index].bg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 via-[#1E3A5F]/80 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full pb-32 z-10">
        <span className="inline-flex items-center gap-2 bg-[#C41E3A]/20 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Shield className="w-4 h-4" />
          Federal Republic of Nigeria
        </span>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          {slides[index].title}
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl">
          {slides[index].subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={createPageUrl(slides[index].cta.link)}
            className="inline-flex items-center gap-2 bg-[#C41E3A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A01830]"
          >
            {slides[index].cta.label} <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:08032003557"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full border border-white/20"
          >
            <Phone className="w-5 h-5" />
            Emergency: 08032003557
          </a>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-[#D4AF37] scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-20">
        <div
          className="h-full bg-[#D4AF37]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stats Banner with Counter */}
      <motion.div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { value: 36, label: "State Commands" },
              { value: 150, label: "Fire Stations" },
              { value: 24, label: "Emergency Response (hrs)" },
              { value: 60, label: "Years of Service" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xl md:text-3xl font-bold text-[#D4AF37]">
                  <CountUp end={stat.value} duration={2} />+
                </p>
                <p className="text-xs md:text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
