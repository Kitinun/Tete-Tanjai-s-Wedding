"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";

const CANVA_BASE = "https://tetetanjaiwedding.my.canva.site/";

export default function InvitationSection() {
  const [currentEvent, setCurrentEvent] = useState(-1);

  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const weddingDay = new Date("2026-09-19T00:00:00+07:00");
      
      if (now.getDate() === weddingDay.getDate() && now.getMonth() === weddingDay.getMonth() && now.getFullYear() === weddingDay.getFullYear()) {
        const hours = now.getHours();
        const mins = now.getMinutes();
        const time = hours + mins / 60;
        
        if (time >= 17.5 && time < 18.5) setCurrentEvent(0); // 17.30 - 18.30
        else if (time >= 18.5 && time < 20.5) setCurrentEvent(1); // 18.30 - 20.30
        else if (time >= 20.5) setCurrentEvent(2); // 20.30+
        else setCurrentEvent(-1);
      }
    };
    checkSchedule();
    const interval = setInterval(checkSchedule, 60000);
    return () => clearInterval(interval);
  }, []);

  const schedule = [
    { time: "17.30", title: "Photo Backdrop" },
    { time: "18.30", title: "Wedding Reception" },
    { time: "20.30", title: "After Party" },
  ];

  return (
    <section className="relative w-full bg-white flex items-center justify-center py-32 px-6 md:px-12 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24"
      >
        
        {/* Left Column - Graphic */}
        <motion.div variants={scaleUp} className="w-full lg:w-1/2 flex items-center justify-center">
           <div className="relative w-full max-w-[480px] aspect-[3/4] drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700 ease-out">
              <Image 
                src={`${CANVA_BASE}_assets/media/dd7ab6ed5c1a6a58cc15c529fa093ebf.jpg`} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain rounded-2xl" 
                alt="Wedding Card Graphic" 
              />
           </div>
        </motion.div>

        {/* Right Column - Text Details */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center space-y-14">
          
          {/* Names */}
          <motion.div variants={fadeUp} className="flex flex-col items-center space-y-2">
            <h2 className="font-cursive text-7xl md:text-8xl text-[#2c2825]">Pattarapak</h2>
            <p className="text-[#6d6661] text-sm md:text-base font-medium tracking-wide">ภัทรภัค พันธุ์ดี (เตเต้)</p>
            
            <div className="flex items-center gap-4 my-6">
              <div className="w-8 h-[1px] bg-[#94C0D5]/50" />
              <span className="font-cursive text-5xl md:text-6xl text-[#94C0D5]">and</span>
              <div className="w-8 h-[1px] bg-[#94C0D5]/50" />
            </div>
            
            <h2 className="font-cursive text-7xl md:text-8xl text-[#2c2825]">Wongsathon</h2>
            <p className="text-[#6d6661] text-sm md:text-base font-medium tracking-wide">วงศธร บุญอยู่ (แทนใจ)</p>
          </motion.div>

          {/* Date & Location */}
          <motion.div variants={fadeUp} className="flex flex-col items-center space-y-2">
            <p className="text-[#8c847d] text-xs uppercase tracking-[0.3em]">Saturday</p>
            <p className="text-[#c1869e] font-serif font-bold text-2xl md:text-3xl tracking-widest">19 September 2026</p>
            <p className="text-[#6d6661] text-sm md:text-base tracking-widest uppercase mt-2">The Halls Bangkok</p>
          </motion.div>

          {/* Schedule */}
          <motion.div variants={fadeUp} className="flex flex-col items-center space-y-3 w-full max-w-[280px] mx-auto">
            <p className="text-[#2c2825] font-bold text-base tracking-[0.2em] mb-2 uppercase">Schedule</p>
            {schedule.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex items-center w-full px-4 py-2.5 rounded-xl transition-all duration-500 ${currentEvent === idx ? 'bg-[#c1869e]/10 border border-[#c1869e]/30 shadow-sm scale-105' : 'bg-transparent'}`}
              >
                <div className={`w-[70px] font-serif text-sm font-bold ${currentEvent === idx ? 'text-[#c1869e]' : 'text-[#8c847d]'}`}>{item.time}</div>
                <div className={`flex-1 text-left text-sm ${currentEvent === idx ? 'text-[#2c2825] font-medium' : 'text-[#6d6661]'}`}>{item.title}</div>
                {currentEvent === idx && (
                  <div className="w-2 h-2 rounded-full bg-[#c1869e] animate-ping" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Theme */}
          <motion.div variants={fadeUp} className="flex flex-col items-center space-y-4 pt-4 border-t border-gray-100 w-full max-w-xs">
            <p className="text-[#8c847d] text-xs uppercase tracking-[0.3em]">#haveaTtime</p>
            <p className="font-cursive text-[#c1869e] text-4xl mb-2">Theme</p>
            <div className="flex gap-4">
              {[
                "05e9d64f99967e3bb465a6252628df6b.png",
                "a2a21008f7fd52aa396357243f2495d7.png",
                "cfe81949fa90d573d1bc1bdc93ec9abe.png",
                "b2067a1a22c91719cfb733b17b786113.png"
              ].map((src, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="w-10 h-10 md:w-12 md:h-12 relative shadow-md rounded-full overflow-hidden border-2 border-white">
                  <Image src={`${CANVA_BASE}_assets/media/${src}`} fill alt={`Theme Color ${i+1}`} className="object-cover" unoptimized />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
