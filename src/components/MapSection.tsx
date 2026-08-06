"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";

const CANVA_BASE = "https://tetetanjaiwedding.my.canva.site/";

export default function MapSection() {
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center py-32 px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={`${CANVA_BASE}_assets/media/7dbfa60af26b82b152de4983496d6b4d.jpg`}
          alt="Map Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
      >
        {/* Venue Details (Left) */}
        <motion.div variants={fadeUp} className="w-full lg:w-1/2 flex flex-col text-white drop-shadow-lg text-center lg:text-left">
           <h2 className="font-cursive text-6xl md:text-7xl mb-4 text-[#f3e3ce]">The Halls Bangkok</h2>
           <p className="font-light tracking-wide text-white/90 mb-8 text-[15px] leading-relaxed">
             สถานที่จัดงานอันอบอุ่นและหรูหรา<br/>
             มีที่จอดรถสะดวกสบาย พร้อมต้อนรับแขกผู้มีเกียรติทุกท่าน
           </p>
           
           {/* Beautiful Venue Photo Placeholder */}
           <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/20 mb-8 group mx-auto lg:mx-0">
              <Image src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" fill alt="The Halls Bangkok" className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-xs font-sans tracking-widest text-white shadow-lg">
                VENUE
              </div>
           </div>

           <div className="flex justify-center lg:justify-start">
              <Link href="https://maps.app.goo.gl/NMLpd3hMBHzAbXLc9" target="_blank" className="bg-[#f3e3ce] text-[#2c2825] px-8 py-4 rounded-full font-serif italic text-xl hover:bg-white transition-all shadow-xl hover:-translate-y-1">
                Get Directions
              </Link>
           </div>
        </motion.div>

        {/* Map Container (Right) */}
        <motion.div variants={scaleUp} className="w-full lg:w-1/2 bg-white/10 p-3 md:p-4 rounded-[2rem] shadow-[0_32px_64px_rgba(0,0,0,0.3)] backdrop-blur-xl border border-white/20">
          <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-inner bg-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.7432616239127!2d100.58414437599023!3d13.854378195155465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29d0f04c6baeb%3A0xc62b7190f84a45a3!2sThe%20Halls%20Bangkok!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="The Halls Bangkok Map"
              className="grayscale-[20%] contrast-[1.1] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
