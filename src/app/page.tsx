"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const CANVA_BASE = "https://tetetanjaiwedding.my.canva.site/";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-black text-[#4a3f42] font-sans selection:bg-rose-200 selection:text-rose-900">
      
      {/* Hero Section */}
      <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={`${CANVA_BASE}_assets/media/5631863cceece250be09d149b52ef06a.jpg`}
            alt="Hero Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for text readability */}
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="z-10 flex flex-col items-center pt-32 px-6"
        >
          <span className="uppercase tracking-[0.2em] text-xs md:text-sm text-white/90 mb-4 font-medium drop-shadow-md">
            You're invited to the wedding of
          </span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-2 text-white drop-shadow-lg text-center leading-[1.1]">
            Wongsathon<br />
            <span className="text-4xl md:text-6xl font-light text-rose-200">&amp;</span><br />
            Pattarapak
          </h1>
          
          <div className="mt-auto mb-12 flex flex-col items-center pt-32">
            <p className="text-lg md:text-xl text-white drop-shadow-md font-light mb-6">
              วงศธร บุญอยู่ (แทนใจ) & ภัทรภัค พันธุ์ดี (เตเต้)
            </p>
            <div className="flex items-center gap-4 text-white drop-shadow-md">
              <div className="h-[1px] w-12 bg-white/60" />
              <p className="font-serif italic text-xl md:text-2xl">Saturday, 19 September 2026</p>
              <div className="h-[1px] w-12 bg-white/60" />
            </div>
            <p className="mt-8 text-sm font-medium tracking-widest uppercase text-white/90 drop-shadow-md">
              #haveaTtime
            </p>
          </div>
        </motion.div>
      </section>

      {/* Schedule & Info Section */}
      <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden py-24">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={`${CANVA_BASE}_assets/media/dd7ab6ed5c1a6a58cc15c529fa093ebf.jpg`}
            alt="Schedule Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="z-10 w-full max-w-4xl mx-auto px-6"
        >
          <div className="glass rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl border border-white/40">
            <div className="text-center mb-12 relative z-10">
              <h2 className="font-serif text-3xl md:text-5xl text-[#8c5b65] mb-2">Join us for the Celebration</h2>
              <p className="text-[#8c5b65]/70 tracking-widest uppercase text-sm">#haveaTtime</p>
            </div>

            <div className="space-y-6 relative z-10 max-w-2xl mx-auto">
              <div className="flex items-center gap-6 p-6 bg-white/50 rounded-3xl hover:bg-white/70 transition-colors">
                <Clock className="w-8 h-8 text-rose-400 shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-serif text-[#8c5b65]">17.30 Onwards</h3>
                  <p className="text-[#8c5b65]/80">Cocktail Reception & Photo Backdrop</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 bg-white/50 rounded-3xl hover:bg-white/70 transition-colors">
                <MapPin className="w-8 h-8 text-rose-400 shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-serif text-[#8c5b65]">The Halls Bangkok</h3>
                  <p className="text-[#8c5b65]/80">Wedding Ceremony</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex justify-center">
              <Link 
                href="https://maps.app.goo.gl/NMLpd3hMBHzAbXLc9" 
                target="_blank"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#8c5b65] text-white rounded-full font-medium tracking-wide hover:bg-[#724a52] transition-all hover:scale-105 shadow-xl"
              >
                Open Google Maps
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={`${CANVA_BASE}_assets/media/572fdb3c0ed5ae852fc0b3f5475a2f4e.jpg`}
            alt="Gallery Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="z-10 w-full px-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
             <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl">
                <Image src={`${CANVA_BASE}_assets/media/c925be5c63b4fa8a947aeed7f133ae7a.jpg`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" alt="Gallery 1" />
             </div>
             <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl md:-translate-y-12">
                <Image src={`${CANVA_BASE}_assets/media/9a65f2bc8d9f65c7c598de407517aa6c.jpg`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" alt="Gallery 2" />
             </div>
             <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl md:translate-y-12">
                <Image src={`${CANVA_BASE}_assets/media/6a37c26ea22139a272c37e207306c27d.jpg`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" alt="Gallery 3" />
             </div>
             <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl">
                <Image src={`${CANVA_BASE}_assets/media/c42c25e3899e87ace5b640076877d2cf.jpg`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" alt="Gallery 4" />
             </div>
          </div>
        </motion.div>
      </section>

      {/* RSVP Section */}
      <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden py-24">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={`${CANVA_BASE}_assets/media/f110014336d480338afb79247a0a398d.jpg`}
            alt="RSVP Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="z-10 w-full max-w-2xl mx-auto px-6 text-center"
        >
          <div className="glass-dark rounded-[3rem] p-12 shadow-2xl border border-white/20">
            <Heart className="w-12 h-12 mx-auto text-rose-300 mb-6" strokeWidth={1} />
            <h2 className="font-serif text-5xl mb-6 text-white">RSVP</h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed font-light">
              เพื่อความสะดวกต่อการจัดสรรและดูแลแขก<br/>รบกวนตอบกลับแบบฟอร์มนี้
            </p>
            
            <button 
              className="px-12 py-5 bg-white text-[#8c5b65] rounded-full font-medium tracking-widest text-lg hover:bg-rose-50 transition-all hover:-translate-y-1 shadow-2xl w-full md:w-auto"
              onClick={() => alert('RSVP Form will open here!')}
            >
              CONFIRM ATTENDANCE
            </button>

            <p className="mt-16 font-serif italic text-white/60 text-lg">
              Can't wait to see you all ♡︎
            </p>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
