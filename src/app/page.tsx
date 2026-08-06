"use client";

import { motion, Variants } from "framer-motion";
import { Heart, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const CANVA_BASE = "https://tetetanjaiwedding.my.canva.site/";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Target date: 19 September 2026, 17:30 (Bangkok Time)
    const targetDate = new Date("2026-09-19T17:30:00+07:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const fadeIn: Variants = {
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
          
          <div className="mt-auto flex flex-col items-center pt-32">
            <p className="text-lg md:text-xl text-white drop-shadow-md font-light mb-6">
              วงศธร บุญอยู่ (แทนใจ) & ภัทรภัค พันธุ์ดี (เตเต้)
            </p>
            <div className="flex items-center gap-4 text-white drop-shadow-md mb-8">
              <div className="h-[1px] w-12 bg-white/60" />
              <p className="font-serif italic text-xl md:text-2xl">Saturday, 19 September 2026</p>
              <div className="h-[1px] w-12 bg-white/60" />
            </div>

            {/* Countdown */}
            <div className="flex gap-4 md:gap-6 text-white drop-shadow-lg mb-8">
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px] border border-white/20">
                <span className="font-serif text-2xl md:text-4xl">{timeLeft.days}</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 mt-1">Days</span>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px] border border-white/20">
                <span className="font-serif text-2xl md:text-4xl">{timeLeft.hours}</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 mt-1">Hours</span>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px] border border-white/20">
                <span className="font-serif text-2xl md:text-4xl">{timeLeft.minutes}</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 mt-1">Mins</span>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px] border border-white/20">
                <span className="font-serif text-2xl md:text-4xl">{timeLeft.seconds}</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 mt-1">Secs</span>
              </div>
            </div>

            <p className="mb-12 text-sm font-medium tracking-widest uppercase text-white/90 drop-shadow-md">
              #haveaTtime
            </p>
          </div>
        </motion.div>
      </section>

      {/* Invitation Card Section (White Background) */}
      <section className="relative min-h-[100svh] w-full bg-white flex items-center justify-center py-20 px-4 md:px-12 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24"
        >
          
          {/* Left Column - Graphic */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
             <div className="relative w-full max-w-[450px] aspect-[3/4]">
                <Image 
                  src={`${CANVA_BASE}_assets/media/dd7ab6ed5c1a6a58cc15c529fa093ebf.jpg`} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain" 
                  alt="Wedding Card Graphic" 
                />
             </div>
          </div>

          {/* Right Column - Text Details */}
          <div className="w-full md:w-1/2 flex flex-col items-center text-center space-y-12">
            
            {/* Names */}
            <div className="flex flex-col items-center space-y-1">
              <h2 className="font-serif text-5xl md:text-6xl text-[#3b3b3d]" style={{ fontFamily: 'Playfair Display, serif' }}>Pattarapak</h2>
              <p className="text-[#3b3b3d] text-sm font-medium mt-1">ภัทรภัค พันธุ์ดี (เตเต้)</p>
              
              <span className="font-serif text-3xl text-[#94C0D5] my-2" style={{ fontFamily: 'Playfair Display, serif' }}>and</span>
              
              <h2 className="font-serif text-5xl md:text-6xl text-[#3b3b3d]" style={{ fontFamily: 'Playfair Display, serif' }}>Wongsathon</h2>
              <p className="text-[#3b3b3d] text-sm font-medium mt-1">วงศธร บุญอยู่ (แทนใจ)</p>
            </div>

            {/* Date & Location */}
            <div className="flex flex-col items-center space-y-1">
              <p className="text-[#3b3b3d] text-sm tracking-widest mb-1">Saturday</p>
              <p className="text-[#E39FBD] font-bold text-xl tracking-wider">19 September 2026</p>
              <p className="text-[#3b3b3d] text-sm mt-1 tracking-wider">The Halls Bangkok</p>
            </div>

            {/* Schedule */}
            <div className="flex flex-col items-center space-y-1">
              <p className="text-[#3b3b3d] font-bold text-[15px] tracking-wide mb-1">17.30 onwards</p>
              <p className="text-[#3b3b3d] text-sm">Photo Backdrop</p>
              <p className="text-[#3b3b3d] text-sm">Wedding Reception (Buffet)</p>
              <p className="text-[#3b3b3d] text-sm">After Party</p>
            </div>

            {/* Theme */}
            <div className="flex flex-col items-center space-y-3">
              <p className="text-[#3b3b3d] text-[15px]">#haveaTtime</p>
              <p className="font-serif text-[#3b3b3d] text-lg mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Theme:</p>
              <div className="flex gap-4">
                <Image src={`${CANVA_BASE}_assets/media/05e9d64f99967e3bb465a6252628df6b.png`} width={36} height={36} alt="Theme Color 1" unoptimized />
                <Image src={`${CANVA_BASE}_assets/media/a2a21008f7fd52aa396357243f2495d7.png`} width={36} height={36} alt="Theme Color 2" unoptimized />
                <Image src={`${CANVA_BASE}_assets/media/cfe81949fa90d573d1bc1bdc93ec9abe.png`} width={36} height={36} alt="Theme Color 3" unoptimized />
                <Image src={`${CANVA_BASE}_assets/media/b2067a1a22c91719cfb733b17b786113.png`} width={36} height={36} alt="Theme Color 4" unoptimized />
              </div>
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
