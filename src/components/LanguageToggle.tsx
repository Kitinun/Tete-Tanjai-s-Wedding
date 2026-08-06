"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5 }}
      className="fixed top-6 right-6 z-[60] flex bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/50 p-1"
    >
      <button
        onClick={() => setLanguage("th")}
        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${language === 'th' ? 'bg-[#c1869e] text-white shadow-sm' : 'text-[#8c847d] hover:text-[#2c2825]'}`}
      >
        TH
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${language === 'en' ? 'bg-[#c1869e] text-white shadow-sm' : 'text-[#8c847d] hover:text-[#2c2825]'}`}
      >
        EN
      </button>
    </motion.div>
  );
}
