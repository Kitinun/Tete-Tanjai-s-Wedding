"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CANVA_BASE = "https://tetetanjaiwedding.my.canva.site/";

export default function HeroSection() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isWeddingDay, setIsWeddingDay] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const yBg = useTransform(scrollY, [0, 1000], ["0%", "50%"]);
  const opacityText = useTransform(scrollY, [0, 800], [1, 0]);

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#fffbac", "#c1869e", "#f9f5e3"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#fffbac", "#c1869e", "#f9f5e3"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2026-09-19T17:30:00+07:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setIsWeddingDay(true);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src={`${CANVA_BASE}_assets/media/5631863cceece250be09d149b52ef06a.jpg`}
          alt="Hero Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </motion.div>

      <motion.div
        style={{ opacity: opacityText }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="z-10 flex flex-col items-center pt-32 px-6 w-full max-w-5xl"
      >
        <motion.span
          variants={fadeUp}
          className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/80 mb-6 font-medium drop-shadow-md"
        >
          {t.hero.invited}
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="font-cursive text-7xl md:text-9xl lg:text-[10rem] mb-4 text-white drop-shadow-2xl text-center leading-[0.9]"
        >
          Pattarapak
          <br />
          <span className="text-5xl md:text-8xl font-light text-[#f4d4ce]">
            &amp;
          </span>
          <br />
          Wongsathon
        </motion.h1>

        <div className="mt-auto flex flex-col items-center pt-24 md:pt-32 w-full">
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white drop-shadow-md font-light mb-8 opacity-90"
          >
            19 • 09 • 2026
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-white/70" />
            <p className="text-white text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium drop-shadow-md">
              {t.hero.saveTheDate}
            </p>
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-white/70" />
          </motion.div>

          {isWeddingDay ? (
            <motion.div variants={scaleUp} className="mb-12">
              <h2 className="font-cursive text-6xl md:text-8xl text-[#f3e3ce] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-pulse">
                {t.hero.today}
              </h2>
            </motion.div>
          ) : (
            <motion.div
              variants={scaleUp}
              className="flex gap-4 md:gap-8 text-white drop-shadow-xl mb-12"
            >
              {[
                { label: t.hero.days, value: timeLeft.days },
                { label: t.hero.hours, value: timeLeft.hours },
                { label: t.hero.mins, value: timeLeft.minutes },
                { label: t.hero.secs, value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl rounded-2xl p-4 min-w-[75px] md:min-w-[100px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                >
                  <span className="font-serif text-3xl md:text-5xl font-light">
                    {item.value}
                  </span>
                  <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-white/70 mt-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          <motion.p
            variants={fadeUp}
            onClick={() => fireConfetti()}
            className="mb-12 text-[11px] font-medium tracking-[0.3em] uppercase text-white/70 drop-shadow-md cursor-pointer hover:text-white transition-colors"
            title="Click for a surprise!"
          >
            #haveaTtime
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 animate-bounce"
      >
        <span className="text-[10px] tracking-widest uppercase mb-2">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
