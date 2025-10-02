"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/cart-context";
import type { CartItem as CartItemType } from "@/types/cart";
import { motion } from "framer-motion";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity < 10) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 py-4 border-b border-border/50 last:border-0"
    >
      {/* Product Image */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground text-sm mb-1 truncate">
          {item.name}
        </h4>
        <p className="text-xs text-foreground/60 mb-2">
          {item.origin} • {item.size}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
          >
            <Minus className="w-3 h-3" />
          </Button>

          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={handleIncrease}
            disabled={item.quantity >= 10}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end justify-between">
        <p className="font-bold text-foreground">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
