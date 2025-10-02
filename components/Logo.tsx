"use client";

import { motion } from "framer-motion";
import { Sunrise } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizeConfig = {
  sm: {
    icon: "w-5 h-5",
    text: "text-lg",
  },
  md: {
    icon: "w-6 h-6",
    text: "text-xl",
  },
  lg: {
    icon: "w-8 h-8",
    text: "text-2xl",
  },
};

export function Logo({ size = "md", animated = true }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <motion.a
      href="#"
      className="flex items-center gap-2 text-foreground group relative"
      aria-label="Café Aurora - Inicio"
      whileHover={animated ? { scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Icon Container with Glow Effect */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-accent/20 rounded-full blur-md"
          animate={
            animated
              ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="relative bg-gradient-to-br from-accent/10 to-primary/10 rounded-full p-1.5 group-hover:from-accent/20 group-hover:to-primary/20 transition-all"
          whileHover={animated ? { rotate: 12 } : {}}
          transition={{ duration: 0.3 }}
        >
          <Sunrise className={`${config.icon} text-accent group-hover:text-accent/80 transition-colors`} />
        </motion.div>
      </div>

      {/* Text */}
      <div className="flex flex-col -space-y-1">
        <span className={`${config.text} font-serif font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text`}>
          Café Aurora
        </span>
        <span className="text-[0.6rem] text-foreground/50 font-medium tracking-widest uppercase">
          Especialidad
        </span>
      </div>

      {/* Underline Animation */}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}
