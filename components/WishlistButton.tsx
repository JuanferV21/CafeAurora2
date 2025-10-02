"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productSlug: string;
  productName?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    button: "h-8 w-8",
    icon: "w-4 h-4",
  },
  md: {
    button: "h-10 w-10",
    icon: "w-5 h-5",
  },
  lg: {
    button: "h-12 w-12",
    icon: "w-6 h-6",
  },
};

export function WishlistButton({
  productSlug,
  productName,
  className,
  size = "md",
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(productSlug);
  const config = sizeConfig[size];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productSlug, productName);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "relative rounded-full flex items-center justify-center transition-all",
        "bg-white/90 backdrop-blur-sm",
        "hover:bg-white hover:scale-110",
        "active:scale-95",
        "shadow-md hover:shadow-lg",
        config.button,
        className
      )}
      whileTap={{ scale: 0.85 }}
      aria-label={
        isFavorite
          ? `Eliminar ${productName || "producto"} de favoritos`
          : `Añadir ${productName || "producto"} a favoritos`
      }
    >
      {/* Heart icon */}
      <motion.div
        initial={false}
        animate={{
          scale: isFavorite ? [1, 1.3, 1] : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        <Heart
          className={cn(
            config.icon,
            "transition-all duration-300",
            isFavorite
              ? "fill-red-500 stroke-red-500"
              : "fill-transparent stroke-foreground/70 hover:stroke-red-500"
          )}
        />
      </motion.div>

      {/* Pulse effect when favorited */}
      {isFavorite && (
        <motion.div
          className="absolute inset-0 rounded-full bg-red-500/30"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}
