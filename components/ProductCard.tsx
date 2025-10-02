"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mountain, Droplets, ShoppingCart, Minus, Plus, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/cart-context";
import { WishlistButton } from "@/components/WishlistButton";
import { ProductQuickView } from "@/components/ProductQuickView";
import type { Product } from "@/content/products";
import { fadeIn } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

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

    // Reset quantity after adding
    setQuantity(1);
  };

  const handleQuantityDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
    >
      <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-accent/50 hover:shadow-xl transition-all group">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={`${product.name} - café de ${product.origin}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick View Button (center, on hover) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              className="opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickViewOpen(true);
                }}
                className="shadow-lg"
              >
                <Eye className="w-4 h-4 mr-2" />
                Vista rápida
              </Button>
            </motion.div>
          </div>

          {/* Wishlist Button */}
          <div className="absolute top-4 left-4 z-10">
            <WishlistButton
              productSlug={product.slug}
              productName={product.name}
              size="md"
            />
          </div>

          {/* Roast Label */}
          <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-200 z-10">
            <Badge variant="secondary" className="text-xs font-semibold shadow-lg">
              {product.roastLabel}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-2xl font-serif">
              {product.name}
            </CardTitle>
          </div>
          <CardDescription className="flex items-center gap-1 text-sm">
            <MapPin className="w-3 h-3" />
            {product.origin}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          <p className="text-sm text-foreground/70 leading-relaxed">
            {product.description}
          </p>

          {/* Tasting Notes */}
          <div>
            <p className="text-xs font-semibold text-foreground/60 mb-2">
              NOTAS DE CATA
            </p>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <Badge key={note} variant="outline" className="text-xs">
                  {note}
                </Badge>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-foreground/60">
              <Mountain className="w-3 h-3" />
              {product.altitude}
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground/60">
              <Droplets className="w-3 h-3" />
              {product.process}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          {/* Size Selector */}
          <div className="w-full">
            <p className="text-xs font-semibold text-foreground/60 mb-2">
              TAMAÑO
            </p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size.weight}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md border-2 transition-all ${
                    selectedSize.weight === size.weight
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div>{size.weight}</div>
                  <div className="text-xs mt-0.5">${size.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="w-full">
            <p className="text-xs font-semibold text-foreground/60 mb-2">
              CANTIDAD
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={handleQuantityDecrease}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>

              <div className="flex-1 text-center">
                <span className="text-lg font-bold">{quantity}</span>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={handleQuantityIncrease}
                disabled={quantity >= 10}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between w-full pt-2 border-t border-border/50">
            <span className="text-sm text-foreground/70">Total:</span>
            <span className="text-2xl font-bold text-accent">
              ${(selectedSize.price * quantity).toFixed(2)}
            </span>
          </div>

          {/* CTA */}
          <Button
            className="w-full group/btn relative overflow-hidden"
            size="lg"
            onClick={handleAddToCart}
          >
            <motion.div
              className="absolute inset-0 bg-accent/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <ShoppingCart className="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110 relative z-10" />
            <span className="relative z-10">Añadir al carrito</span>
          </Button>
        </CardFooter>
      </Card>

      {/* Quick View Modal */}
      <ProductQuickView
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </motion.div>
  );
}
