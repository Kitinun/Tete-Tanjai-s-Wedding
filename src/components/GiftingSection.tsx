"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";

export default function GiftingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const accountNumber = "123-4-56789-0";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber.replace(/-/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full py-20 px-6 bg-white overflow-hidden flex flex-col items-center">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center z-10"
      >
        <motion.p variants={fadeUp} className="text-[#8c847d] text-xs uppercase tracking-[0.3em] font-semibold mb-2">Blessings</motion.p>
        <motion.h2 variants={fadeUp} className="font-cursive text-5xl md:text-6xl text-[#2c2825] mb-6">Send a Gift</motion.h2>
        <motion.p variants={fadeUp} className="text-[#6d6661] text-sm font-light max-w-md mx-auto mb-10">
          สำหรับแขกผู้มีเกียรติที่ไม่สะดวกมาร่วมงาน แต่ประสงค์จะมอบซองผูกข้อมือเพื่อแสดงความยินดี
        </motion.p>

        <motion.button 
          variants={scaleUp}
          onClick={() => setIsModalOpen(true)}
          className="bg-[#c1869e] text-white px-8 py-3 rounded-full font-serif italic text-lg shadow-lg hover:bg-[#a66a81] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          💌 Click for Details
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col items-center"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors"
              >
                ✕
              </button>
              
              <h3 className="font-cursive text-4xl text-[#c1869e] mb-2">With Thanks</h3>
              <p className="text-center text-[#6d6661] text-xs mb-6 font-light">
                ขอบพระคุณสำหรับทุกคำอวยพรครับ/ค่ะ
              </p>

              <div className="w-48 h-48 bg-gray-100 rounded-2xl mb-6 relative overflow-hidden border border-gray-200 p-2 flex items-center justify-center">
                {/* Real QR Code can be placed here, using generic QR placeholder */}
                <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" width={160} height={160} alt="QR Code" className="object-contain opacity-50" />
              </div>

              <div className="w-full bg-[#fbf9f6] rounded-xl p-4 flex flex-col items-center mb-6 border border-[#e6d5c3]/50">
                <p className="text-xs text-gray-500 mb-1">ธนาคารกสิกรไทย (KBank)</p>
                <p className="font-mono text-lg text-[#2c2825] font-semibold">{accountNumber}</p>
                <p className="text-xs text-gray-500 mt-1">นาย วงศธร บุญอยู่</p>
              </div>

              <button 
                onClick={handleCopy}
                className={`w-full py-3 rounded-full font-sans text-sm tracking-widest uppercase transition-colors shadow-md ${copied ? 'bg-green-500 text-white' : 'bg-[#2c2825] text-white hover:bg-black'}`}
              >
                {copied ? "Copied!" : "Copy Account"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
