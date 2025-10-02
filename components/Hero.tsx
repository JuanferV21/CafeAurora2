"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { rise } from "@/lib/motion";
import Image from "next/image";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const prefersReducedMotion = useReducedMotion();

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/30 via-background to-background pt-20 md:pt-24"
      id="main-content"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0"
            style={prefersReducedMotion ? {} : { y, opacity }}
          >
            <motion.div
              variants={rise}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Cosechamos amaneceres en cada taza
            </motion.div>

            <motion.h1
              variants={rise}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground leading-tight"
            >
              Café de especialidad, tostado para tus{" "}
              <span className="text-gradient">mañanas</span>
            </motion.h1>

            <motion.p
              variants={rise}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-foreground/70 leading-relaxed max-w-xl"
            >
              Seleccionamos granos de altura y los tostamos en lotes pequeños
              para revelar notas de cacao, caramelo y jazmín.
            </motion.p>

            <motion.div
              variants={rise}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="text-base group">
                <a href="#productos">
                  Comprar granos
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <a href="#ubicaciones">Visitar cafetería</a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={rise}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50"
            >
              <div>
                <div className="text-3xl font-serif font-bold text-accent">
                  12+
                </div>
                <div className="text-sm text-foreground/60 mt-1">
                  Años de experiencia
                </div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-accent">
                  90%
                </div>
                <div className="text-sm text-foreground/60 mt-1">
                  Compra directa
                </div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-accent">
                  100%
                </div>
                <div className="text-sm text-foreground/60 mt-1">
                  Especialidad
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 mix-blend-overlay z-10" />
            <Image
              src="/hero-coffee.png"
              alt="Taza de café Aurora con granos de café recién tostados"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-sm font-medium">Descubre más</span>
        <motion.div
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1.5 h-1.5 bg-foreground/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
