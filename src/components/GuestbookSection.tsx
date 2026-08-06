"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CANVA_BASE = "https://tetetanjaiwedding.my.canva.site/";

type Wish = {
  id: number;
  name: string;
  message: string;
  date: string;
};

const initialWishes: Wish[] = [
  { id: 1, name: "เพื่อนเอ", message: "ยินดีด้วยนะเตเต้และแทนใจ ขอให้มีความสุขมากๆ รักกันตราบนานเท่านานน้าาา 💕", date: "06 Aug 2026" },
  { id: 2, name: "P' B", message: "Congratulations to both of you! Wishing you a lifetime of love and happiness.", date: "06 Aug 2026" },
  { id: 3, name: "ป้าต้อย", message: "ขอให้หลานทั้งสองมีความสุขมากๆ สร้างครอบครัวที่อบอุ่นนะคะ", date: "05 Aug 2026" },
  { id: 4, name: "แก๊งค์เพื่อนมัธยม", message: "ดีใจด้วยเว้ยยยย ในที่สุดก็ขายออกแล้ว 5555 ขอให้แฮปปี้มากๆ มีหลานไวๆ!", date: "05 Aug 2026" },
];

export default function GuestbookSection() {
  const { t } = useLanguage();
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newMessage) return;
    
    const newWish: Wish = {
      id: Date.now(),
      name: newName,
      message: newMessage,
      date: new Date().toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })
    };
    
    setWishes([newWish, ...wishes]);
    setNewName("");
    setNewMessage("");
    setIsModalOpen(false);
  };

  return (
    <section className="relative w-full py-32 px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={`${CANVA_BASE}_assets/media/57032592ce0024787a2b963a99afa2f7.jpg`}
          alt="Guestbook Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#fbf9f6]/60 backdrop-blur-[4px]" />
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-7xl mx-auto flex flex-col items-center"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-[#c1869e] text-xs uppercase tracking-[0.3em] font-semibold mb-4">Guestbook</p>
          <h2 className="font-cursive text-6xl md:text-7xl text-[#2c2825] mb-4">{t.guestbook.title}</h2>
          <p className="text-[#6d6661] text-sm md:text-base font-light tracking-wide max-w-lg mx-auto">
            {t.guestbook.subtitle}
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.button 
          variants={scaleUp}
          onClick={() => setIsModalOpen(true)}
          className="mb-20 bg-[#2c2825] text-[#f9f5e3] px-8 py-4 rounded-full font-serif italic text-xl shadow-xl hover:bg-[#c1869e] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          {t.guestbook.button}
        </motion.button>

        {/* Wishes Grid (Masonry layout using CSS columns) */}
        <motion.div variants={staggerContainer} className="w-full columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {wishes.map((wish) => (
              <motion.div 
                key={wish.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="break-inside-avoid bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-sm border border-white/50 hover:shadow-xl transition-shadow duration-300 group"
              >
                <p className="text-[#6d6661] font-light leading-relaxed mb-6 text-sm md:text-base">
                  "{wish.message}"
                </p>
                <div className="flex flex-col border-t border-[#e6d5c3]/30 pt-4">
                  <span className="font-serif italic text-[#c1869e] text-lg">{wish.name}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{wish.date}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#fbf9f6] rounded-[2rem] p-8 md:p-12 shadow-2xl border border-[#e6d5c3]/50"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors text-2xl font-light"
              >
                ✕
              </button>
              
              <h3 className="font-cursive text-5xl text-[#2c2825] mb-2 text-center">{t.guestbook.modalTitle}</h3>
              <p className="text-center text-[#6d6661] text-sm mb-8 font-light">{t.guestbook.modalSubtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    required 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-transparent border-b border-[#2c2825]/20 px-2 py-3 text-[#2c2825] focus:outline-none focus:border-[#c1869e] transition-colors font-light"
                    placeholder={t.guestbook.namePlaceholder}
                  />
                </div>
                <div>
                  <textarea 
                    required 
                    rows={4}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full bg-white/50 border border-[#2c2825]/10 rounded-2xl p-4 text-[#2c2825] focus:outline-none focus:border-[#c1869e] focus:bg-white transition-colors font-light resize-none"
                    placeholder={t.guestbook.messagePlaceholder}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#2c2825] text-white py-4 rounded-full font-serif italic text-lg hover:bg-[#c1869e] transition-colors shadow-lg"
                >
                  {t.guestbook.sendButton}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
