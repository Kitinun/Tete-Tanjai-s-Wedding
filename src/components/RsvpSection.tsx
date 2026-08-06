"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";

const CANVA_BASE = "https://tetetanjaiwedding.my.canva.site/";

export default function RsvpSection() {
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden py-32">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={`${CANVA_BASE}_assets/media/1e4d033685be0b427a233e4259ac95f4.jpg`}
          alt="RSVP Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="z-10 w-full max-w-2xl mx-auto px-6 text-center relative"
      >
        {/* Sparkle Decorations */}
        <div className="absolute -top-16 -left-4 md:-left-12 w-16 h-16 opacity-80 animate-[pulse_3s_ease-in-out_infinite]">
          <Image src={`${CANVA_BASE}_assets/media/9e00507e84aa7092c87861af29bd521f.png`} fill alt="Sparkle" className="object-contain" unoptimized />
        </div>
        <div className="absolute top-24 -right-4 md:-right-16 w-12 h-12 opacity-60 animate-[pulse_4s_ease-in-out_infinite]">
          <Image src={`${CANVA_BASE}_assets/media/9e00507e84aa7092c87861af29bd521f.png`} fill alt="Sparkle" className="object-contain" unoptimized />
        </div>

        <motion.div variants={scaleUp} className="bg-black/40 backdrop-blur-[8px] rounded-t-full rounded-b-3xl p-8 pt-16 md:p-14 md:pt-20 shadow-[0_32px_64px_rgba(0,0,0,0.6)] border border-[#e6d5c3]/30 relative overflow-hidden">
          {/* Vintage inner border */}
          <div className="absolute inset-4 border border-[#e6d5c3]/20 rounded-t-full rounded-b-2xl pointer-events-none" />

          <motion.h2 variants={fadeUp} className="font-cursive text-7xl md:text-8xl mb-4 text-[#f3e3ce] drop-shadow-lg relative z-10">
            RSVP
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#f3e3ce]/80 text-sm md:text-base leading-relaxed font-light tracking-wide mb-1 relative z-10">
            เพื่อความสะดวกต่อการจัดสรรและดูแลแขก
          </motion.p>
          <motion.p variants={fadeUp} className="text-[#f3e3ce]/80 text-sm md:text-base leading-relaxed font-light tracking-wide mb-12 relative z-10">
            รบกวนตอบกลับแบบฟอร์มนี้
          </motion.p>
          
          {/* Modern Vintage Form */}
          <motion.form variants={fadeUp} className="space-y-10 text-left relative z-10 max-w-sm mx-auto" onSubmit={(e) => { e.preventDefault(); alert("RSVP Successfully submitted! Thank you."); }}>
            
            <div className="space-y-1 group">
              <label className="block text-[#e6d5c3] font-serif italic text-lg ml-1 transition-colors group-focus-within:text-[#fff]">Name</label>
              <input 
                type="text" 
                required 
                className="w-full bg-transparent border-b border-[#e6d5c3]/40 px-2 py-2 text-[#fff] placeholder-white/20 focus:outline-none focus:border-[#fff] transition-all font-light tracking-wide" 
                placeholder="กรอกชื่อ - นามสกุล" 
              />
            </div>

            <div className="space-y-1 group">
              <label className="block text-[#e6d5c3] font-serif italic text-lg ml-1 transition-colors group-focus-within:text-[#fff]">Number of Guests</label>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-[#e6d5c3]/40 px-2 py-2 text-[#fff] focus:outline-none focus:border-[#fff] transition-all appearance-none font-light tracking-wide">
                  <option value="1" className="text-black">1 ท่าน (Just me)</option>
                  <option value="2" className="text-black">2 ท่าน (Plus one)</option>
                  <option value="3" className="text-black">3 ท่าน</option>
                  <option value="4" className="text-black">4 ท่าน</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#e6d5c3]/60 text-xs">▼</div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <label className="block text-[#e6d5c3] font-serif italic text-lg ml-1">Attendance</label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <input type="radio" name="attendance" value="yes" className="peer sr-only" defaultChecked />
                  <div className="w-5 h-5 rounded-full border-2 border-[#e6d5c3]/50 peer-checked:border-[#f3e3ce] peer-checked:bg-[#f3e3ce] transition-all flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-black/60 opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[#f3e3ce]/80 peer-checked:text-[#f3e3ce] font-light tracking-wide transition-colors">
                    ยินดีมาร่วมงาน (Joyfully Accept)
                  </span>
                </label>
                
                <label className="flex items-center gap-4 cursor-pointer group">
                  <input type="radio" name="attendance" value="no" className="peer sr-only" />
                  <div className="w-5 h-5 rounded-full border-2 border-[#e6d5c3]/50 peer-checked:border-[#f3e3ce] peer-checked:bg-[#f3e3ce] transition-all flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-black/60 opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[#f3e3ce]/80 peer-checked:text-[#f3e3ce] font-light tracking-wide transition-colors">
                    ไม่สามารถมาร่วมงานได้ (Regretfully Decline)
                  </span>
                </label>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 mt-8 bg-transparent border border-[#e6d5c3] text-[#e6d5c3] rounded-full font-serif italic text-xl hover:bg-[#e6d5c3] hover:text-black transition-all duration-500"
            >
              Confirm Attendance
            </button>
          </motion.form>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-20 font-cursive text-white/90 drop-shadow-2xl text-4xl md:text-5xl">
          Can't wait to see you all ♡︎
        </motion.p>
      </motion.div>
    </section>
  );
}
