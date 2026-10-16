'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  onComplete?: () => void;
  lang?: 'ar' | 'en';
}

export function Preloader({ videoRef, onComplete, lang = 'ar' }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Lock body scroll while preloader is active
    document.body.style.overflow = 'hidden';
    startTimeRef.current = Date.now();

    const minDuration = 3000; // 3 seconds duration requested for a smooth, relaxed luxury experience
    let isVideoReady = false;

    const checkVideo = () => {
      if (videoRef?.current && videoRef.current.readyState >= 2) {
        isVideoReady = true;
      }
    };

    const video = videoRef?.current;
    if (video) {
      if (video.readyState >= 2) isVideoReady = true;
      video.addEventListener('loadeddata', checkVideo);
      video.addEventListener('canplay', checkVideo);
    }

    const frame = () => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      checkVideo();

      // Smooth organic cubic easing for continuous, silky-smooth progress across 3 seconds
      const t = Math.min(1, elapsed / minDuration);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      let calculatedProgress = Math.min(100, Math.round(eased * 100));

      // If video is still pending when reaching 94%, gently pause until ready or 4.5s max
      if (!isVideoReady && calculatedProgress > 94 && elapsed < 4500) {
        calculatedProgress = 94;
      }

      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = '';
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 800);
        }, 350);
      } else {
        animationFrameRef.current = requestAnimationFrame(frame);
      }
    };

    animationFrameRef.current = requestAnimationFrame(frame);

    return () => {
      document.body.style.overflow = '';
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (video) {
        video.removeEventListener('loadeddata', checkVideo);
        video.removeEventListener('canplay', checkVideo);
      }
    };
  }, [videoRef, onComplete]);

  if (!isVisible) return null;

  // Dynamic status messages matching the medical experience
  const getStatusText = () => {
    if (lang === 'ar') {
      if (progress < 30) return 'بدء تهيئة العيادة الرقمية...';
      if (progress < 65) return 'تحميل الجولة السريرية عالية الدقة...';
      if (progress < 95) return 'تجهيز مرافق الفحص والتشخيص...';
      return 'مرحباً بكم في عيادة د. محمد كمال علي';
    } else {
      if (progress < 30) return 'Initializing digital clinic...';
      if (progress < 65) return 'Loading high-definition clinic tour...';
      if (progress < 95) return 'Preparing diagnostic facilities...';
      return 'Welcome to Dr. Mohamed Kamal Ali Clinic';
    }
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#040812] text-white px-4 select-none overflow-hidden"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] bg-gradient-to-tr from-[#1e3358]/35 via-[#b58e5e]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,51,88,0.25)_0%,rgba(4,8,18,0.95)_70%,#040812_100%)] pointer-events-none" />

          {/* Center Brand Content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
            
            {/* 1. Doctor Joint Emblem with Glowing Concentric Rings */}
            <div className="relative mb-6 flex items-center justify-center">
              {/* Outer Subtle Rotating Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-dashed border-[#b58e5e]/30 pointer-events-none"
              />

              {/* Pulsing Glow Ring */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#d1a66b]/20 to-[#1e3358]/20 blur-md pointer-events-none"
              />

              {/* Glass Pedestal for the Emblem */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/15 p-3 flex items-center justify-center shadow-[0_0_30px_rgba(209,166,107,0.25)]">
                <Image
                  src="/doctor-emblem.png"
                  alt="Doctor Orthopedic Joint Emblem"
                  width={96}
                  height={96}
                  priority
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(209,166,107,0.4)]"
                />
              </div>
            </div>

            {/* 2. Doctor Signature Typography Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative w-64 sm:w-72 h-16 sm:h-20 mb-6 flex items-center justify-center"
            >
              <Image
                src="/doctor-typography-light.png"
                alt="د. محمد كمال علي - استشاري جراحة العظام والمفاصل"
                fill
                sizes="(max-width: 640px) 256px, 288px"
                priority
                className="object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

            {/* 3. Luxury Minimalist Progress Bar */}
            <div className="w-full max-w-[240px] sm:max-w-[260px] flex flex-col items-center gap-2.5">
              
              {/* The Progress Track */}
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#1a73e8] via-[#8ab4f8] to-[#d2e3fc] rounded-full relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                >
                  {/* Glowing Head Dot */}
                  <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#8ab4f8]" />
                </motion.div>
              </div>

              {/* Status and Percentage */}
              <div className="w-full flex items-center justify-between text-[11px] text-gray-400 font-medium px-0.5">
                <span className="text-[10px] text-gray-300 font-light truncate max-w-[190px]">
                  {getStatusText()}
                </span>
                <span className="font-mono text-[11px] font-bold text-[#8ab4f8] tabular-nums">
                  {progress}%
                </span>
              </div>
            </div>

            {/* 4. Brand Philosophy Motto */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-8 flex items-center gap-2 text-[10px] text-[#8ab4f8] tracking-widest uppercase font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ab4f8]/50" />
              <span>{lang === 'ar' ? 'الحركة هي الحياة' : 'Movement is Life'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ab4f8]/50" />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
