"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";

const CANVA_BASE = "https://tetetanjaiwedding.my.canva.site/";

export default function GallerySection() {
  return (
    <section className="relative py-32 bg-[#fdfbfb] w-full flex items-center justify-center overflow-hidden px-6">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="z-10 w-full max-w-7xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center mb-20">
          <motion.p variants={fadeUp} className="text-[#8c847d] text-xs uppercase tracking-[0.3em] font-semibold mb-2">Our Memories</motion.p>
          <motion.h2 variants={fadeUp} className="font-cursive text-5xl md:text-6xl text-[#2c2825] mb-6">Gallery</motion.h2>
          <p className="text-[#8c5b65]/60 tracking-[0.3em] uppercase text-xs">#haveaTtime</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
           {[
             { src: "c925be5c63b4fa8a947aeed7f133ae7a.jpg", offset: "lg:mt-0" },
             { src: "9a65f2bc8d9f65c7c598de407517aa6c.jpg", offset: "lg:mt-16" },
             { src: "6a37c26ea22139a272c37e207306c27d.jpg", offset: "lg:mt-8" },
             { src: "c42c25e3899e87ace5b640076877d2cf.jpg", offset: "lg:mt-24" }
           ].map((img, i) => (
             <motion.div key={i} variants={fadeUp} className={`aspect-[3/4] relative rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer ${img.offset}`}>
                <Image src={`${CANVA_BASE}_assets/media/${img.src}`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover hover:scale-110 transition-transform duration-700 ease-out" alt={`Gallery ${i+1}`} unoptimized />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-500" />
             </motion.div>
           ))}
        </div>
      </motion.div>
    </section>
  );
}
