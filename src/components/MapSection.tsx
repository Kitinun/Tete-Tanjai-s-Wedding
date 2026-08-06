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
        <motion.div
          variants={fadeUp}
          className="w-full lg:w-1/2 flex flex-col text-white drop-shadow-lg text-center lg:text-left"
        >
          <h2 className="font-cursive text-6xl md:text-7xl mb-4 text-[#f3e3ce]">
            The Halls Bangkok
          </h2>
          <p className="font-light tracking-wide text-white/90 mb-8 text-[15px] leading-relaxed">
            ซอยวิภาวดี 64 แยก 2 กรุงเทพมหานคร
          </p>

          {/* Beautiful Venue Photo Placeholder */}
          <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/20 mb-8 group mx-auto lg:mx-0">
            <Image
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
              fill
              alt="The Halls Bangkok"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-xs font-sans tracking-widest text-white shadow-lg uppercase">
              Location
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              href="https://maps.app.goo.gl/bH1DZHNXJ7kdreZ59"
              target="_blank"
              className="bg-[#f3e3ce] text-[#2c2825] px-8 py-3.5 md:py-4 rounded-full font-serif italic text-lg md:text-xl text-center hover:bg-white transition-all shadow-xl hover:-translate-y-1"
            >
              Get Directions
            </Link>
            <Link
              href="https://www.thehallsbangkok.com/"
              target="_blank"
              className="bg-transparent border border-[#f3e3ce] text-[#f3e3ce] px-8 py-3.5 md:py-4 rounded-full font-serif italic text-lg md:text-xl text-center hover:bg-[#f3e3ce] hover:text-[#2c2825] transition-all shadow-xl hover:-translate-y-1"
            >
              Visit Website
            </Link>
          </div>
        </motion.div>

        {/* Map Container (Right) */}
        <motion.div
          variants={scaleUp}
          className="w-full lg:w-1/2 bg-white/10 p-3 md:p-4 rounded-[2rem] shadow-[0_32px_64px_rgba(0,0,0,0.3)] backdrop-blur-xl border border-white/20"
        >
          <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-inner bg-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=The%20Halls%20Bangkok,%20Vibhavadi%20Rangsit&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
