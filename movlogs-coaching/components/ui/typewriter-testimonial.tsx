'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Testimonial = {
  image: string;
  audio: string;
  text: string;
  name: string;
  jobtitle: string;
};

type ComponentProps = {
  testimonials: Testimonial[];
};

export const Component: React.FC<ComponentProps> = ({ testimonials }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [hasBeenHovered, setHasBeenHovered] = useState<boolean[]>(new Array(testimonials.length).fill(false));
  const [typedText, setTypedText] = useState('');
  const typewriterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentTextRef = useRef('');

  const stopAudio = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current.src = '';
      audioPlayerRef.current.load();
      audioPlayerRef.current = null;
    }
  }, []);

  const startTypewriter = useCallback((text: string) => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
    setTypedText('');
    currentTextRef.current = text;

    let i = 0;
    const type = () => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
        typewriterTimeoutRef.current = setTimeout(type, 50);
      }
    };
    type();
  }, []);

  const stopTypewriter = useCallback(() => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
      typewriterTimeoutRef.current = null;
    }
    setTypedText('');
    currentTextRef.current = '';
  }, []);

  const handleMouseEnter = useCallback(
    (index: number) => {
      stopAudio();

      setHoveredIndex(index);

      if (testimonials[index].audio) {
        const newAudio = new Audio(`/audio/${testimonials[index].audio}`);
        audioPlayerRef.current = newAudio;
        newAudio.play().catch((e) => {
          console.warn('Audio playback prevented or failed:', e);
        });
      }

      setHasBeenHovered((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
      startTypewriter(testimonials[index].text);
    },
    [testimonials, stopAudio, startTypewriter],
  );

  const handleMouseLeave = useCallback(() => {
    stopAudio();
    setHoveredIndex(null);
    stopTypewriter();
  }, [stopAudio, stopTypewriter]);

  useEffect(() => {
    return () => {
      stopAudio();
      stopTypewriter();
    };
  }, [stopAudio, stopTypewriter]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="relative flex flex-col items-center"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src={testimonial.image}
            alt={`Testimonial ${index}`}
            className="h-16 w-16 rounded-full border-4 border-gray-300 hover:animate-pulse"
            animate={{
              borderColor: hoveredIndex === index || hasBeenHovered[index] ? '#ACA0FB' : '#E5E7EB',
            }}
            transition={{ duration: 0.3 }}
          />
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-20 w-56 max-w-xs rounded-lg bg-white px-4 py-3 text-sm text-black shadow-2xl"
              >
                <div className="h-24 overflow-hidden whitespace-pre-wrap">
                  {typedText}
                  <span className="animate-blink">|</span>
                </div>
                <p className="mt-2 text-right font-semibold">{testimonial.name}</p>
                <p className="text-right text-sm text-gray-500">{testimonial.jobtitle}</p>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 transform">
                  <div className="h-3 w-3 rounded-full bg-white shadow-lg"></div>
                  <div className="mt-1 h-2 w-2 rounded-full bg-white shadow-lg"></div>
                  <div className="mt-1 h-1 w-1 rounded-full bg-white shadow-lg"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
