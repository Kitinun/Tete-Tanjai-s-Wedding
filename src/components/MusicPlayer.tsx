"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Royalty free romantic piano placeholder
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_d0865e8a71.mp3?filename=a-soft-and-romantic-piano-118816.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-xl border border-white/50 flex items-center justify-center hover:scale-110 transition-transform group"
    >
      <div className={`w-8 h-8 rounded-full border-[1.5px] border-[#c1869e] flex items-center justify-center ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
        <div className="w-2 h-2 rounded-full bg-[#c1869e]" />
      </div>
      <div className="absolute right-14 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-serif text-[#6d6661] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100">
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </div>
    </motion.button>
  );
}
