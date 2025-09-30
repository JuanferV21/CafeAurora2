"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { useState, useEffect } from "react";
import { fadeIn } from "@/lib/motion";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return testimonials.length - 1;
      if (nextIndex >= testimonials.length) return 0;
      return nextIndex;
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="py-24 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Lo que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg text-foreground/70">
            Más de 10,000 caficultores, baristas y amantes del café confían en
            nosotros.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative h-[400px] sm:h-[350px] md:h-[300px]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonios de clientes"
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <Card className="border-2 shadow-lg">
                  <CardContent className="p-8 sm:p-12 text-center space-y-6">
                    {/* Quote Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-full">
                      <Quote className="w-8 h-8" />
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg sm:text-xl text-foreground/90 leading-relaxed max-w-2xl mx-auto">
                      &ldquo;{testimonials[currentIndex].quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="pt-4 border-t border-border/50">
                      <p className="font-semibold text-foreground">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {testimonials[currentIndex].role} ·{" "}
                        {testimonials[currentIndex].city}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(-1)}
              aria-label="Testimonio anterior"
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-accent"
                      : "bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Ir a testimonio ${index + 1}`}
                  aria-selected={index === currentIndex}
                  role="tab"
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(1)}
              aria-label="Testimonio siguiente"
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Counter */}
          <p className="text-center mt-4 text-sm text-foreground/60">
            {currentIndex + 1} / {testimonials.length}
          </p>
        </div>
      </div>
    </section>
  );
}
