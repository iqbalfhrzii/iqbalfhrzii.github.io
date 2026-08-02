import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function SmoothScrollOverlay({ children }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure content height continuously for dynamic changes
  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useLayoutEffect(() => {
    updateHeight(); // Initial measure
    
    // Resize observer for window resizes or DOM mutations inside content
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [updateHeight]);

  // Track native scroll of our absolute container
  const { scrollY } = useScroll({ container: containerRef });
  
  // Apply physics-based smoothing (damping)
  const smoothY = useSpring(scrollY, {
    stiffness: 80,
    damping: 20,
    mass: 1.2,
    restDelta: 0.001
  });

  // Inverse the scroll value to move content up
  const y = useTransform(smoothY, (value) => -value);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-40 overflow-y-auto overflow-x-hidden pointer-events-auto hide-scrollbar"
    >
      {/* Spacer to create native scrollable area */}
      <div style={{ height: contentHeight }} className="w-full opacity-0 pointer-events-none" />
      
      {/* Animated content that follows native scroll smoothly */}
      <motion.div
        ref={contentRef}
        style={{ y, position: 'fixed', top: 0, left: 0, right: 0 }}
        className="w-full will-change-transform pointer-events-none"
      >
        {/* Re-enable pointer events for the actual content */}
        <div className="pointer-events-auto w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
