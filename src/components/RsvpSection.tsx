"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";
import { useWeddingData } from "@/lib/WeddingDataContext";

const CANVA_BASE = "https://tetetanjaiwedding.my.canva.site/";

export default function RsvpSection() {
  const { rsvpTotal, isLoading, incrementRsvp } = useWeddingData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const guests = formData.get("guests") as string;
    const attendance = formData.get("attendance") as string;
    const formEl = e.target as HTMLFormElement;
    
    try {
      const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (url) {
        fetch(url, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            type: "rsvp",
            name,
            guests,
            attendance,
          }),
        }).catch(console.error);
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsSuccess(true);
      
      // Optimistically update the RSVP total if they said 'yes'
      if (attendance === "yes" && rsvpTotal !== null) {
        incrementRsvp(parseInt(guests) || 1);
      }
      
      formEl.reset();
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden py-16 md:py-24">
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
          <Image src={`${CANVA_BASE}_assets/media/9e00507e84aa7092c87861af29bd521f.png`} fill alt="Sparkle" className="object-contain" />
        </div>
        <div className="absolute top-24 -right-4 md:-right-16 w-12 h-12 opacity-60 animate-[pulse_4s_ease-in-out_infinite]">
          <Image src={`${CANVA_BASE}_assets/media/9e00507e84aa7092c87861af29bd521f.png`} fill alt="Sparkle" className="object-contain" />
        </div>

        <motion.div variants={scaleUp} className="bg-black/40 backdrop-blur-[8px] rounded-t-[3rem] rounded-b-3xl p-5 pt-8 md:p-8 md:pt-10 shadow-[0_32px_64px_rgba(0,0,0,0.6)] border border-[#e6d5c3]/30 relative overflow-hidden">
          {/* Vintage inner border */}
          <div className="absolute inset-4 border border-[#e6d5c3]/20 rounded-t-full rounded-b-2xl pointer-events-none" />

          <motion.h2 variants={fadeUp} className="font-cursive text-6xl md:text-7xl mb-2 text-[#f3e3ce] drop-shadow-lg relative z-10">
            RSVP
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#f3e3ce]/80 text-[13px] md:text-sm leading-relaxed font-light tracking-wide mb-1 relative z-10">
            To help us prepare and take care of everyone,
          </motion.p>
          <motion.p variants={fadeUp} className="text-[#f3e3ce]/80 text-[13px] md:text-sm leading-relaxed font-light tracking-wide mb-4 relative z-10">
            please kindly reply using this form.
          </motion.p>

          {/* Form */}
          <motion.form 
            variants={staggerContainer}
            onSubmit={handleSubmit} 
            className="space-y-4 relative z-10"
          >
            {/* Name Input */}
            <motion.div variants={fadeUp} className="space-y-1">
              <label htmlFor="name" className="block text-sm font-light text-[#e6d5c3] tracking-wider uppercase">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-transparent border-b border-[#e6d5c3]/40 px-2 py-2 text-white focus:outline-none focus:border-[#f3e3ce] transition-colors font-light placeholder:text-white/30 text-sm"
                placeholder="Enter your full name"
              />
            </motion.div>

            {/* Guests Select */}
            <motion.div variants={fadeUp} className="space-y-1">
              <label htmlFor="guests" className="block text-sm font-light text-[#e6d5c3] tracking-wider uppercase">
                Number of Guests
              </label>
              <select
                id="guests"
                name="guests"
                className="w-full bg-transparent border-b border-[#e6d5c3]/40 px-2 py-2 text-white focus:outline-none focus:border-[#f3e3ce] transition-colors font-light appearance-none cursor-pointer text-sm"
              >
                <option value="1" className="text-black">1 Guest (Just me)</option>
                <option value="2" className="text-black">2 Guests (Plus one)</option>
                <option value="3" className="text-black">3 Guests</option>
                <option value="4" className="text-black">4 Guests</option>
              </select>
            </motion.div>

            {/* Attendance Radio */}
            <motion.div variants={fadeUp} className="space-y-2 pt-2">
              <label className="block text-sm font-light text-[#e6d5c3] tracking-wider uppercase">
                Attendance
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="radio" name="attendance" value="yes" defaultChecked className="peer sr-only" />
                    <div className="w-6 h-6 rounded-full border-2 border-[#e6d5c3]/50 peer-checked:border-[#f3e3ce] transition-colors"></div>
                    <div className="absolute w-3 h-3 rounded-full bg-[#f3e3ce] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-white/80 group-hover:text-white transition-colors font-light">
                    Joyfully Accept
                  </span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="radio" name="attendance" value="no" className="peer sr-only" />
                    <div className="w-6 h-6 rounded-full border-2 border-[#e6d5c3]/50 peer-checked:border-[#f3e3ce] transition-colors"></div>
                    <div className="absolute w-3 h-3 rounded-full bg-[#f3e3ce] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-white/80 group-hover:text-white transition-colors font-light">
                    Regretfully Decline
                  </span>
                </label>
              </div>
            </motion.div>

            <button 
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`w-full flex items-center justify-center gap-3 py-2 mt-4 bg-transparent border border-[#e6d5c3] text-[#e6d5c3] rounded-full font-serif italic text-lg transition-all duration-500 ${
                isSuccess 
                  ? 'bg-[#e6d5c3] text-[#2c2825] border-[#e6d5c3]' 
                  : 'hover:bg-[#e6d5c3] hover:text-black disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#e6d5c3]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : isSuccess ? (
                <>
                  <svg className="h-5 w-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Success!
                </>
              ) : (
                "Confirm Attendance"
              )}
            </button>
          </motion.form>

          {/* RSVP Counter */}
          <div className="mt-6 text-center">
            {isLoading ? (
              <div className="inline-flex flex-col items-center justify-center p-4 border border-[#e6d5c3]/10 rounded-2xl bg-black/10 backdrop-blur-sm animate-pulse">
                <span className="text-[#f3e3ce]/50 font-light text-sm">Updating guest count...</span>
              </div>
            ) : rsvpTotal !== null ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10"
              >
                <div className="inline-flex flex-col items-center justify-center p-4 border border-[#e6d5c3]/30 rounded-2xl bg-black/20 backdrop-blur-sm shadow-xl">
                  <span className="text-[#f3e3ce]/80 font-light text-sm tracking-widest uppercase mb-2">Guest List</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif italic text-5xl text-white drop-shadow-md">{rsvpTotal}</span>
                    <span className="text-[#f3e3ce]/90 font-light text-xl">Guests</span>
                  </div>
                  <span className="text-[#f3e3ce]/70 font-light text-xs mt-2">have confirmed to celebrate with us</span>
                </div>
              </motion.div>
            ) : null}
          </div>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-6 font-cursive text-white/90 drop-shadow-2xl text-4xl md:text-5xl">
          Can&apos;t wait to see you all ♡︎
        </motion.p>
      </motion.div>
    </section>
  );
}
