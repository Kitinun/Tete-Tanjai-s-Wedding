"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";

const colors = [
  { name: "Rose Gold", hex: "#E0BFB8", img: "https://images.unsplash.com/photo-1623091410901-00e2d268901f?auto=format&fit=crop&q=80&w=800" },
  { name: "Cream", hex: "#F3E3CE", img: "https://images.unsplash.com/photo-1594552072238-185d26fdf7c3?auto=format&fit=crop&q=80&w=800" },
  { name: "Earth Tone", hex: "#8C847D", img: "https://images.unsplash.com/photo-1434389678369-184bf3f4cb12?auto=format&fit=crop&q=80&w=800" },
];

export default function DressCodeSection() {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <section className="relative w-full bg-[#fbf9f6] py-32 px-6 overflow-hidden flex flex-col items-center border-t border-[#e6d5c3]/30">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-4xl mx-auto text-center"
      >
        <motion.p variants={fadeUp} className="text-[#c1869e] text-xs uppercase tracking-[0.3em] font-semibold mb-4">Dress Code</motion.p>
        <motion.h2 variants={fadeUp} className="font-cursive text-6xl md:text-7xl text-[#2c2825] mb-6">Color Palette</motion.h2>
        
        {/* Color Selectors */}
        <motion.div variants={fadeUp} className="flex justify-center gap-6 mb-16">
          {colors.map((color, idx) => (
            <div key={idx} className="flex flex-col items-center cursor-pointer group" onClick={() => setSelectedColor(idx)}>
              <div 
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md transition-all duration-300 ${selectedColor === idx ? 'scale-110 ring-4 ring-offset-4 ring-[#e6d5c3]' : 'hover:scale-110'}`}
                style={{ backgroundColor: color.hex }}
              />
              <span className={`mt-4 text-[10px] md:text-xs tracking-wider transition-colors ${selectedColor === idx ? 'text-[#2c2825] font-medium' : 'text-[#8c847d]'}`}>
                {color.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Moodboard Image Display */}
        <motion.div variants={scaleUp} className="relative w-full aspect-[4/3] md:aspect-[16/9] max-w-3xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedColor}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={colors[selectedColor].img} 
                fill 
                sizes="(max-width: 768px) 100vw, 800px" 
                className="object-cover" 
                alt={colors[selectedColor].name}
              />
              <div className="absolute inset-0 bg-black/10 transition-colors hover:bg-black/0 duration-500" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
