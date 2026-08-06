"use client";

import { motion } from "framer-motion";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";

export default function SeatingSection() {
  return (
    <section className="relative w-full bg-white py-32 px-6 overflow-hidden flex flex-col items-center border-t border-gray-50">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-4xl mx-auto text-center"
      >
        <motion.p variants={fadeUp} className="text-[#8c847d] text-xs uppercase tracking-[0.3em] font-semibold mb-4">Floor Plan</motion.p>
        <motion.h2 variants={fadeUp} className="font-cursive text-6xl md:text-7xl text-[#2c2825] mb-4">Seating Chart</motion.h2>
        <motion.p variants={fadeUp} className="text-[#6d6661] text-sm font-light mb-12">
          แผนผังที่นั่งภายในงาน
        </motion.p>

        <motion.div variants={scaleUp} className="relative w-full aspect-[4/3] md:aspect-[16/9] max-w-3xl mx-auto rounded-[2rem] overflow-hidden shadow-sm border-2 border-dashed border-[#e6d5c3] bg-[#fbf9f6] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c1869e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <h3 className="font-serif text-2xl md:text-3xl text-[#2c2825] tracking-[0.2em] uppercase">Coming Soon</h3>
            <p className="text-xs text-[#8c847d] mt-2 font-light">The seating plan will be available here soon.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
