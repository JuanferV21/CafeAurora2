"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { motion, AnimatePresence } from "framer-motion";

interface FavoritesButtonProps {
  onClick: () => void;
}

export function FavoritesButton({ onClick }: FavoritesButtonProps) {
  const { wishlistCount } = useWishlist();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="relative"
      aria-label={`Favoritos - ${wishlistCount} items`}
    >
      <Heart
        className={`w-5 h-5 transition-all ${
          wishlistCount > 0
            ? "fill-red-500 stroke-red-500"
            : "fill-transparent stroke-current"
        }`}
      />

      {/* Badge with counter */}
      <AnimatePresence>
        {wishlistCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {wishlistCount > 9 ? "9+" : wishlistCount}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
