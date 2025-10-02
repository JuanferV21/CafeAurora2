"use client";

import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/context/cart-context";
import { CartItem } from "@/components/CartItem";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { cart, clearCart } = useCart();

  const handleCheckout = () => {
    toast.info("Checkout demo", {
      description:
        "Esta es una tienda ficticia. No se procesarán pagos reales.",
      duration: 5000,
    });
    onOpenChange(false);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent" />
            Carrito de Compras
          </SheetTitle>
          <SheetDescription>
            {cart.totalItems === 0
              ? "Tu carrito está vacío"
              : `${cart.totalItems} ${cart.totalItems === 1 ? "producto" : "productos"} en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto -mx-6 px-6 my-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-foreground/60 mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-foreground/40">
                Agrega productos para comenzar tu compra
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              <AnimatePresence>
                {cart.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer with totals and actions */}
        {cart.items.length > 0 && (
          <SheetFooter className="flex-col gap-4 sm:flex-col">
            {/* Clear cart button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCart}
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Vaciar carrito
            </Button>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/70">Subtotal</span>
                <span className="font-semibold">
                  ${cart.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/70">Envío</span>
                <span className="text-accent font-medium">Gratis</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-accent">
                  ${cart.subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout button */}
            <Button
              size="lg"
              className="w-full group"
              onClick={handleCheckout}
            >
              Proceder al Checkout
              <motion.div
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </Button>

            {/* Disclaimer */}
            <p className="text-xs text-foreground/50 text-center">
              * Esta es una tienda de demostración. No se procesarán pagos
              reales.
            </p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
