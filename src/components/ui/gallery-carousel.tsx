"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type ShowcaseImage = {
  src: string;
  alt: string;
  label?: string;
  caption?: string;
};

export type ProgramGalleryCarouselProps = {
  images?: ShowcaseImage[];
  className?: string;
};

const defaultImages: ShowcaseImage[] = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    alt: "Modern architectural interior",
    label: "Architecture",
    caption: "A cinematic gallery experience with layered motion.",
  },
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
    alt: "Creative studio workspace",
    label: "Studio",
    caption: "Designed for product showcases, portfolios, and landing pages.",
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop",
    alt: "Premium office environment",
    label: "Showcase",
    caption: "A rotating carousel with depth, contrast, and smooth transitions.",
  },
];

export function ProgramGalleryCarousel({
  images = defaultImages,
  className,
}: ProgramGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const safeImages = images.length > 0 ? images : defaultImages;

  const slideLeft = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? safeImages.length - 1 : prev - 1
    );
  };

  const slideRight = () => {
    setCurrentIndex((prev) =>
      prev === safeImages.length - 1 ? 0 : prev + 1
    );
  };

  const getPosition = (index: number) => {
    if (index === currentIndex) return "center";

    if (index === (currentIndex - 1 + safeImages.length) % safeImages.length) {
      return "left";
    }

    if (index === (currentIndex + 1) % safeImages.length) {
      return "right";
    }

    return "hidden";
  };

  const variants = {
    center: {
      x: "0%",
      scale: 1,
      rotate: 0,
      zIndex: 10,
      opacity: 1,
      filter: "brightness(100%)",
    },
    left: {
      x: "-80%",
      scale: 0.8,
      rotate: 180,
      zIndex: 5,
      opacity: 0.45,
      filter: "brightness(60%)",
    },
    right: {
      x: "80%",
      scale: 0.8,
      rotate: 180,
      zIndex: 5,
      opacity: 0.45,
      filter: "brightness(60%)",
    },
    hidden: {
      x: "0%",
      scale: 0.5,
      rotate: 180,
      zIndex: 0,
      opacity: 0,
      filter: "brightness(40%)",
    },
  };

  return (
    <div
      className={cn(
        "relative my-10 flex h-[52vh] w-full items-center justify-center overflow-hidden py-10 md:h-[620px]",
        className
      )}
    >
      {safeImages.map((image, index) => {
        const position = getPosition(index);
        const isActive = position === "center";

        return (
          <motion.div
            key={`${image.src}-${index}`}
            initial={false}
            animate={position}
            variants={variants}
            transition={{
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1],
            }}
            className={cn(
              "absolute h-full w-[85vw] cursor-pointer overflow-hidden rounded-xl shadow-lg md:w-[700px]",
              position === "hidden" && "pointer-events-none"
            )}
            onClick={() => {
              if (position === "left") slideLeft();
              if (position === "right") slideRight();
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 700px, 85vw"
              className="object-cover"
              priority={index === 0}
              draggable={false}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {(image.label || image.caption) && (
              <motion.div
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 16,
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute bottom-28 left-6 right-6 z-10 text-white md:bottom-32 md:left-8 md:right-8"
              >
                {image.label && (
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70 md:text-sm">
                    {image.label}
                  </p>
                )}

                {image.caption && (
                  <h3 className="max-w-xl text-2xl font-semibold leading-tight md:text-4xl">
                    {image.caption}
                  </h3>
                )}
              </motion.div>
            )}
          </motion.div>
        );
      })}

      <div className="absolute bottom-6 z-20 flex gap-4 md:bottom-8">
        <button
          type="button"
          onClick={slideLeft}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/85 text-black shadow-lg backdrop-blur transition-transform hover:scale-105 hover:bg-white active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          type="button"
          onClick={slideRight}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/85 text-black shadow-lg backdrop-blur transition-transform hover:scale-105 hover:bg-white active:scale-95"
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}

export const Component = ProgramGalleryCarousel;