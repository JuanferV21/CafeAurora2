"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/cart-context";
import { motion, AnimatePresence } from "framer-motion";

interface CartButtonProps {
  onClick: () => void;
}

export function CartButton({ onClick }: CartButtonProps) {
  const { cart } = useCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="relative"
      aria-label={`Carrito de compras - ${cart.totalItems} items`}
    >
      <ShoppingCart className="w-5 h-5" />

      {/* Badge with counter */}
      <AnimatePresence>
        {cart.totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {cart.totalItems > 9 ? "9+" : cart.totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
