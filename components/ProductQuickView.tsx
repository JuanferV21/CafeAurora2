"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mountain, Droplets, ShoppingCart, Minus, Plus, X, ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/cart-context";
import { WishlistButton } from "@/components/WishlistButton";
import type { Product } from "@/content/products";

interface ProductQuickViewProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductQuickView({
  product,
  open,
  onOpenChange,
}: ProductQuickViewProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [imageZoomed, setImageZoomed] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      productSlug: product.slug,
      name: product.name,
      image: product.image,
      size: selectedSize.weight,
      price: selectedSize.price,
      quantity,
      origin: product.origin,
    });

    // Reset and close
    setQuantity(1);
    onOpenChange(false);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name} - Vista rápida</DialogTitle>
          <DialogDescription>
            Detalles del producto {product.name} de {product.origin}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 pt-4">
          {/* Image Section */}
          <div className="space-y-4">
            <div
              className="relative aspect-square rounded-xl overflow-hidden bg-muted group cursor-zoom-in"
              onClick={() => setImageZoomed(!imageZoomed)}
            >
              <Image
                src={product.image}
                alt={`${product.name} - café de ${product.origin}`}
                fill
                className={`object-cover transition-transform duration-500 ${
                  imageZoomed ? "scale-150" : "group-hover:scale-110"
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Zoom indicator */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Wishlist button */}
              <div className="absolute top-4 left-4">
                <WishlistButton
                  productSlug={product.slug}
                  productName={product.name}
                  size="md"
                />
              </div>

              {/* Roast badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="font-semibold">
                  {product.roastLabel}
                </Badge>
              </div>
            </div>

            {/* Origin badge */}
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="font-medium">{product.origin}</span>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                {product.name}
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tasting Notes */}
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-2">
                NOTAS DE CATA
              </p>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <Badge key={note} variant="outline">
                    {note}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-foreground/60">Altitud</p>
                  <p className="text-sm font-medium">{product.altitude}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-foreground/60">Proceso</p>
                  <p className="text-sm font-medium">{product.process}</p>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-3">
                TAMAÑO
              </p>
              <div className="grid grid-cols-2 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.weight}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 text-center rounded-lg border-2 transition-all ${
                      selectedSize.weight === size.weight
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="font-semibold">{size.weight}</div>
                    <div className="text-sm text-foreground/70">${size.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-3">
                CANTIDAD
              </p>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleQuantityDecrease}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <div className="flex-1 text-center">
                  <span className="text-2xl font-bold">{quantity}</span>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleQuantityIncrease}
                  disabled={quantity >= 10}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <span className="text-lg font-medium">Total:</span>
              <span className="text-3xl font-bold text-accent">
                ${(selectedSize.price * quantity).toFixed(2)}
              </span>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full group relative overflow-hidden"
              size="lg"
              onClick={handleAddToCart}
            >
              <motion.div
                className="absolute inset-0 bg-accent/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <ShoppingCart className="w-5 h-5 mr-2 transition-transform group-hover:scale-110 relative z-10" />
              <span className="relative z-10 text-base">Añadir al carrito</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
