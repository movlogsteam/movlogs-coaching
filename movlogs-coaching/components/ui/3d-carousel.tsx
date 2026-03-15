"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (mediaQuery: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(mediaQuery).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = () => {
      setMatches(getMatches(query));
    };

    handleChange();
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

const duration = 0.15;
const easing = [0.32, 0.72, 0, 1] as const;
const transition = { duration, ease: easing };
const transitionOverlay = { duration: 0.5, ease: easing };

const Carousel = memo(
  ({
    handleClick,
    cards,
    rotation,
    setRotation,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string) => void;
    cards: string[];
    rotation: number;
    setRotation: React.Dispatch<React.SetStateAction<number>>;
    isCarouselActive: boolean;
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
    const cylinderWidth = isScreenSizeSm ? 1200 : 2000;
    const faceCount = cards.length;
    const faceWidth = cylinderWidth / faceCount;
    const radius = cylinderWidth / (2 * Math.PI);

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            width: cylinderWidth,
            transformStyle: "preserve-3d",
            rotateY: rotation,
          }}
          onDrag={(_, info) => {
            if (!isCarouselActive) return;
            setRotation((prev) => prev + info.delta.x * 0.3);
          }}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`card-${imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-2xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl)}
            >
              <motion.img
                src={imgUrl}
                alt={`Lifestyle ${i + 1}`}
                layoutId={`img-${imgUrl}`}
                className="pointer-events-none aspect-[4/5] w-full rounded-2xl object-cover"
                initial={{ filter: "blur(4px)" }}
                layout="position"
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  },
);
Carousel.displayName = "Carousel";

function ThreeDPhotoCarousel({ images }: { images: string[] }) {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const [rotation, setRotation] = useState(0);

  const cards = useMemo(() => images, [images]);

  useEffect(() => {
    if (!isCarouselActive || cards.length <= 1) {
      return;
    }

    let rafId = 0;
    let previous = 0;

    const step = (timestamp: number) => {
      if (!previous) {
        previous = timestamp;
      }
      const delta = timestamp - previous;
      previous = timestamp;

      // Constant right-to-left movement at ~14 deg/sec.
      setRotation((prev) => prev - delta * 0.014);
      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [cards.length, isCarouselActive]);

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl);
    setIsCarouselActive(false);
  };

  const handleClose = () => {
    setActiveImg(null);
    setIsCarouselActive(true);
  };

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 z-50 m-8 flex items-center justify-center rounded-3xl bg-black/70 lg:mx-[14rem]"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-h-full max-w-full rounded-lg object-contain shadow-lg"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ willChange: "transform" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[520px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          cards={cards}
          rotation={rotation}
          setRotation={setRotation}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  );
}

export { ThreeDPhotoCarousel };
