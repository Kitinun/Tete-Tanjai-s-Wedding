"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Leaf } from "lucide-react";
import InteractiveSparkles from "./InteractiveSparkles";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";
import { useWeddingData, Wish } from "@/lib/WeddingDataContext";

const CANVA_BASE = "https://tetetanjaiwedding.my.canva.site/";

const formatThaiTime = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Bangkok'
    }).format(d) + ' น.';
  } catch {
    return dateStr;
  }
};

const FloatingParticles = () => {
  const particles = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {particles.map((_, i) => (
        <ParticleLeaf key={i} index={i} />
      ))}
    </div>
  );
};

const ParticleLeaf = ({ index }: { index: number }) => {
  // Use constant values based on index to avoid hydration mismatch
  const initialX = (index * 17) % 100;
  const initialScale = 0.5 + ((index * 3) % 5) / 10;
  const duration = 10 + ((index * 7) % 10);
  const delay = ((index * 13) % 10);

  return (
    <motion.div
      initial={{
        y: "110vh",
        x: `${initialX}vw`,
        opacity: 0,
        scale: initialScale,
      }}
      animate={{
        y: "-10vh",
        opacity: [0, 1, 1, 0],
        rotate: 360,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      className="absolute text-[#8a9a86]/40"
    >
      <Leaf size={28} className="fill-current stroke-1" />
    </motion.div>
  );
};

export default function GuestbookSection() {
  const { wishes, isLoading, addWish } = useWeddingData();
  const [displayedWishes, setDisplayedWishes] = useState<Wish[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [qrUrl, setQrUrl] = useState("");

  const PROMPTS = [
    "Share your blessings with us...",
    "แชร์ความประทับใจของคุณ...",
    "เคล็ดลับความรักคืออะไร?",
    "แนะนำที่เที่ยวฮันนีมูนให้หน่อย!",
    "พิมพ์ข้อความอวยพรของคุณที่นี่..."
  ];
  const [promptIndex, setPromptIndex] = useState(0);

  const [isScreensaver, setIsScreensaver] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQrUrl(window.location.href);
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % PROMPTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const resetIdleTimer = () => {
    setIsScreensaver(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (isFullscreen) {
      idleTimerRef.current = setTimeout(() => setIsScreensaver(true), 15000);
    }
  };

  useEffect(() => {
    if (isFullscreen) {
      window.addEventListener('mousemove', resetIdleTimer);
      window.addEventListener('touchstart', resetIdleTimer);
      window.addEventListener('keydown', resetIdleTimer);
      resetIdleTimer();
    } else {
      setIsScreensaver(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    }
    return () => {
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isFullscreen]);

  useEffect(() => {
    const scrollLoop = () => {
      if (scrollContainerRef.current && isScreensaver) {
        scrollContainerRef.current.scrollTop += 0.5;
        if (
          scrollContainerRef.current.scrollTop + scrollContainerRef.current.clientHeight >= 
          scrollContainerRef.current.scrollHeight - 2
        ) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }
      requestRef.current = requestAnimationFrame(scrollLoop);
    };
    if (isScreensaver) {
      requestRef.current = requestAnimationFrame(scrollLoop);
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isScreensaver]);

  const toggleFullscreen = async () => {
    const doc = document as Document & { webkitFullscreenElement?: Element, webkitExitFullscreen?: () => void };
    const elem = sectionRef.current as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> };

    if (isFullscreen && !document.fullscreenElement && !doc.webkitFullscreenElement) {
      // We are in pseudo-fullscreen fallback
      setIsFullscreen(false);
      return;
    }
    
    if (!document.fullscreenElement && !doc.webkitFullscreenElement) {
      if (elem?.requestFullscreen) {
        try {
          await elem.requestFullscreen();
        } catch (err) {
          console.error("Error attempting to enable fullscreen:", err);
          setIsFullscreen(true);
        }
      } else if (elem?.webkitRequestFullscreen) {
        try {
          await elem.webkitRequestFullscreen();
        } catch (err) {
          console.error("Error attempting to enable webkit fullscreen:", err);
          setIsFullscreen(true);
        }
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const MAX_DISPLAY = 6;
    if (wishes.length === 0) return;
    
    if (wishes.length > MAX_DISPLAY) {
      // Shuffle and pick 6 random wishes initially
      const shuffled = [...wishes].sort(() => 0.5 - Math.random());
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedWishes(shuffled.slice(0, MAX_DISPLAY));
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedWishes(wishes);
    }
  }, [wishes]);

  // Lock body scroll when in fullscreen (native or pseudo)
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Listen for native fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element };
      setIsFullscreen(!!(document.fullscreenElement || doc.webkitFullscreenElement));
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

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
        date: new Date().toISOString()
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

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c1869e', '#f9f5e3', '#2c2825']
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={
        isFullscreen 
          ? "fixed inset-0 z-[100] w-full h-[100dvh] bg-[#fbf9f6]"
          : "relative w-full py-32 overflow-hidden"
      }
    >
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

      {/* Floating Particles (Fullscreen only) */}
      {isFullscreen && (
        <>
          <FloatingParticles />
          <InteractiveSparkles />
        </>
      )}

      {/* Fullscreen Toggle Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-6 right-6 z-50 px-4 py-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-full text-[#2c2825] transition-all shadow-sm flex items-center gap-2"
        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
      >
        <span className="text-xs font-semibold uppercase tracking-widest hidden md:inline">
          {isFullscreen ? "ออกโหมดหน้างาน" : "โหมดหน้างาน (Reception)"}
        </span>
        {isFullscreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        )}
      </button>

      {/* QR Code for Mobile Access (Fullscreen only) */}
      {isFullscreen && qrUrl && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 z-50 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-2xl flex flex-col items-center gap-3 border border-[#e6d5c3]/50 hidden md:flex"
        >
          <p className="text-[#6d6661] text-[10px] font-semibold uppercase tracking-widest text-center">
            Scan to write a wish
          </p>
          <div className="bg-white p-2 rounded-xl shadow-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&color=2c2825&data=${encodeURIComponent(qrUrl)}`} 
              alt="QR Code" 
              width={120} 
              height={120}
              className="rounded-lg"
            />
          </div>
        </motion.div>
      )}

      {/* Content Container */}
      <div 
        ref={scrollContainerRef}
        className={`relative z-10 w-full h-full ${isFullscreen ? "overflow-y-auto py-16 px-6 scroll-smooth" : "px-6"}`}
      >
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto flex flex-col items-center"
        >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-[#c1869e] text-xs uppercase tracking-[0.3em] font-semibold mb-4">Guestbook</p>
          <h2 className="font-cursive text-6xl md:text-7xl text-[#2c2825] mb-4">Wishes for Us</h2>
          <p className="text-[#6d6661] text-sm md:text-base font-light tracking-wide max-w-lg mx-auto">
            Share your blessings and kind words with us
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.button 
          variants={scaleUp}
          onClick={() => setIsModalOpen(true)}
          className="mb-20 bg-[#2c2825] text-[#f9f5e3] px-8 py-4 rounded-full font-serif italic text-xl shadow-xl hover:bg-[#c1869e] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          ✍🏻 Leave a Wish
        </motion.button>

        {/* Wishes Grid */}
        <motion.div variants={staggerContainer} className="w-full">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <svg className="animate-spin h-8 w-8 text-[#c1869e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-[#6d6661] font-light text-sm">Loading wishes...</p>
            </div>
          ) : displayedWishes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#6d6661] font-light">No wishes yet. Be the first to leave one!</p>
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
                      &quot;{wish.message}&quot;
                    </p>
                    <div className="flex flex-col border-t border-[#e6d5c3]/30 pt-4">
                      <span className="font-serif italic text-[#c1869e] text-lg">{wish.name}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{formatThaiTime(wish.date)}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.div>
      </div>

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
              
              <h3 className="font-cursive text-5xl text-[#2c2825] mb-2 text-center">Your Wish</h3>
              <p className="text-center text-[#6d6661] text-sm mb-8 font-light">Leave a message for the couple</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    required 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-transparent border-b border-[#2c2825]/20 px-2 py-3 text-[#2c2825] focus:outline-none focus:border-[#c1869e] transition-colors font-light"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <textarea 
                    required 
                    rows={4}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full bg-white/50 border border-[#2c2825]/10 rounded-2xl p-4 text-[#2c2825] focus:outline-none focus:border-[#c1869e] focus:bg-white transition-colors font-light resize-none"
                    placeholder={PROMPTS[promptIndex]}
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
                      Sending...
                    </>
                  ) : "Send Wish"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
