'use client';

import { motion } from "framer-motion";
import { Plus, LucideIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { animate, svg } from "animejs";
import { cn } from "@/lib/utils";

export interface ActionIcon {
  Icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  className?: string;
  label?: string;
  badge?: string;
}

export interface AnimatedSocialIconsProps {
  icons: ActionIcon[];
  className?: string;
  iconSize?: number;
  triggerLabel?: string;
  closeOnAction?: boolean;
}

/**
 * AnimatedLucideIcon uses Anime.js v4 svg.createDrawable to animate
 * SVG strokes/lines with a continuous living draw effect.
 */
function AnimatedLucideIcon({ 
  Icon, 
  size = 19, 
  strokeWidth = 2,
  className 
}: { 
  Icon: LucideIcon; 
  size?: number; 
  strokeWidth?: number;
  className?: string;
}) {
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;

    const svgElements = iconRef.current.querySelectorAll(
      'svg path, svg circle, svg polyline, svg line, svg rect, svg polygon'
    );
    if (svgElements.length === 0) return;

    svgElements.forEach((el) => el.classList.add('lucide-drawer-line'));
    const drawables = svg.createDrawable(Array.from(svgElements));

    const anim = animate(drawables, {
      draw: ['0 0.5', '0 1'],
      ease: 'inOutSine',
      duration: 1600,
      loop: true,
      alternate: true,
      playbackRate: 1,
    });

    return () => {
      if (anim && typeof anim.pause === 'function') {
        anim.pause();
      }
    };
  }, []);

  return (
    <span ref={iconRef} className="inline-flex items-center justify-center pointer-events-none">
      <Icon size={size} strokeWidth={strokeWidth} className={className} />
    </span>
  );
}

export function AnimatedSocialIcons({ 
  icons, 
  className,
  iconSize = 19,
  triggerLabel = "القائمة السريعة",
  closeOnAction = true
}: AnimatedSocialIconsProps) {
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when tapping outside for optimal mobile ergonomics
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    }
    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [active]);

  // Exact mobile touch target: size-11 (44px) on mobile, size-12 (48px) on sm screens
  const buttonSize = "size-11 sm:size-12"; 

  const handleActionClick = (onClick?: () => void) => {
    if (closeOnAction) {
      setActive(false);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative flex items-center justify-center select-none z-50", className)}
    >
      {/* Clean flex row with NO background casing circle behind it */}
      <div className="flex items-center justify-center relative gap-2 sm:gap-2.5">
        
        {/* Main Floating Trigger Button - Frosted Translucent White Glass with Live AnimeJS Path Drawing */}
        <motion.button
          type="button"
          aria-label={triggerLabel}
          aria-expanded={active}
          className={cn(
            buttonSize,
            "rounded-full flex items-center justify-center z-20 shrink-0 cursor-pointer",
            "bg-white/20 hover:bg-white/30 active:scale-95",
            "backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
            "transition-all duration-300"
          )}
          onClick={() => setActive(!active)}
          animate={{ rotate: active ? 45 : 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 24,
          }}
        >
          <AnimatedLucideIcon 
            Icon={Plus}
            size={iconSize + 2} 
            strokeWidth={2.5} 
            className="text-white drop-shadow-sm" 
          />
        </motion.button>
        
        {/* Expanding Action Icons - Frosted Translucent White Glass with Live AnimeJS Path Drawing */}
        <motion.div 
          className="flex items-center gap-2 sm:gap-2.5 overflow-visible"
          animate={{
            width: active ? "auto" : 0,
            opacity: active ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 26,
          }}
          style={{
            pointerEvents: active ? "auto" : "none",
          }}
        >
          {icons.map(({ Icon, href, onClick, className: iconClassName, label, badge }, index) => {
            const content = (
              <>
                <AnimatedLucideIcon 
                  Icon={Icon}
                  size={iconSize}
                  strokeWidth={2}
                  className="text-white transition-all group-hover:scale-110 drop-shadow-sm" 
                />
                {badge && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] text-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 border border-white/80 text-white text-[8.5px] font-black tracking-tight leading-none shadow-[0_2px_8px_rgba(0,0,0,0.5)] pointer-events-none">
                    {badge}
                  </span>
                )}
                {label && (
                  <span className="sr-only">{label}</span>
                )}
              </>
            );

            return (
              <motion.div
                key={index}
                className="relative group shrink-0"
                animate={{
                  filter: active ? "blur(0px)" : "blur(4px)",
                  scale: active ? 1 : 0.6,
                  rotate: active ? 0 : -25,
                  opacity: active ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 28,
                  delay: active ? index * 0.03 : 0,
                }}
              >
                {/* Floating Tooltip for mobile & desktop */}
                {label && active && (
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#060b13]/95 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-30">
                    {label}
                  </span>
                )}

                {href ? (
                  <a 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (closeOnAction) setActive(false);
                    }}
                    className={cn(
                      buttonSize,
                      "rounded-full relative flex items-center justify-center shrink-0 cursor-pointer",
                      "bg-white/20 hover:bg-white/35 active:scale-95",
                      "backdrop-blur-xl border border-white/35 shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition-all",
                      iconClassName
                    )}
                    title={label}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleActionClick(onClick)}
                    className={cn(
                      buttonSize,
                      "rounded-full relative flex items-center justify-center shrink-0 cursor-pointer",
                      "bg-white/20 hover:bg-white/35 active:scale-95",
                      "backdrop-blur-xl border border-white/35 shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition-all",
                      iconClassName
                    )}
                    title={label}
                  >
                    {content}
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
