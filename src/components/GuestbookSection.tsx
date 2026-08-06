"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useWeddingData, Wish } from "@/lib/WeddingDataContext";

const CANVA_BASE = "https://tetetanjaiwedding.my.canva.site/";

export default function GuestbookSection() {
  const { t } = useLanguage();
  const { wishes, isLoading, addWish } = useWeddingData();
  const [displayedWishes, setDisplayedWishes] = useState<Wish[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const MAX_DISPLAY = 6;
    if (wishes.length === 0) return;
    
    if (wishes.length > MAX_DISPLAY) {
      // Shuffle and pick 6 random wishes initially
      const shuffled = [...wishes].sort(() => 0.5 - Math.random());
      setDisplayedWishes(shuffled.slice(0, MAX_DISPLAY));
    } else {
      setDisplayedWishes(wishes);
    }
  }, [wishes]);

  // Interval for swapping random wishes if there are too many
  useEffect(() => {
    const MAX_DISPLAY = 6;
    if (wishes.length <= MAX_DISPLAY) return;

    const interval = setInterval(() => {
      setDisplayedWishes((prev) => {
        // Find wishes that are not currently displayed
        const availableWishes = wishes.filter(w => !prev.find(p => p.id === w.id));
        if (availableWishes.length === 0) return prev;

        // Pick a random available wish
        const newWish = availableWishes[Math.floor(Math.random() * availableWishes.length)];
        
        // Pick a random currently displayed wish to replace
        const swapIndex = Math.floor(Math.random() * prev.length);
        
        const next = [...prev];
        next[swapIndex] = newWish;
        return next;
      });
    }, 5000); // Swap every 5 seconds

    return () => clearInterval(interval);
  }, [wishes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newMessage) return;
    setIsSubmitting(true);
    
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
            type: "guestbook",
            name: newName,
            message: newMessage,
          }),
        }).catch(console.error);
      }

      await new Promise(resolve => setTimeout(resolve, 800));

      const newWish: Wish = {
        id: Date.now(),
        name: newName,
        message: newMessage,
        date: new Date().toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })
      };
      
      const MAX_DISPLAY = 6;
      addWish(newWish);
      setDisplayedWishes(prev => {
        if (prev.length < MAX_DISPLAY) {
          return [newWish, ...prev];
        }
        // Replace the last item to make room for the new wish at the top
        return [newWish, ...prev.slice(0, MAX_DISPLAY - 1)];
      });
      
      setNewName("");
      setNewMessage("");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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
          ✍🏻 เขียนคำอวยพร
        </motion.button>

        {/* Wishes Grid */}
        <motion.div variants={staggerContainer} className="w-full">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <svg className="animate-spin h-8 w-8 text-[#c1869e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-[#6d6661] font-light text-sm">กำลังโหลดคำอวยพร...</p>
            </div>
          ) : displayedWishes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#6d6661] font-light">ยังไม่มีคำอวยพร เป็นคนแรกที่เขียนคำอวยพรสิ!</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {displayedWishes.map((wish) => (
                  <motion.div 
                    key={wish.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="break-inside-avoid bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-sm border border-white/50 hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <p className="text-[#6d6661] font-light leading-relaxed mb-6 text-sm md:text-base whitespace-pre-wrap">
                      "{wish.message}"
                    </p>
                    <div className="flex flex-col border-t border-[#e6d5c3]/30 pt-4">
                      <span className="font-serif italic text-[#c1869e] text-lg">{wish.name}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{wish.date}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
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
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-[#2c2825] text-white py-4 rounded-full font-serif italic text-lg hover:bg-[#c1869e] transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      กำลังส่ง...
                    </>
                  ) : "ส่งคำอวยพร"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
