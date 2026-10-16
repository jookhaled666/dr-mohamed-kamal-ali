'use client';

import { animate, svg } from 'animejs';
import { useEffect, useRef } from 'react';

export function useLucideDrawerAnimation<T extends HTMLElement = HTMLDivElement>() {
  const root = useRef<T>(null);

  useEffect(() => {
    if (!root.current) return;

    // Target all SVG paths and geometry inside the container
    const svgElements = root.current.querySelectorAll(
      'svg path, svg circle, svg polyline, svg line, svg rect, svg polygon'
    );

    if (svgElements.length === 0) return;

    svgElements.forEach((element) => element.classList.add('lucide-drawer-line'));

    const drawables = svg.createDrawable(Array.from(svgElements));

    const anim = animate(drawables, {
      draw: ['0 0', '0 1'],
      ease: 'inOutSine',
      duration: 1800,
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

  return root;
}
