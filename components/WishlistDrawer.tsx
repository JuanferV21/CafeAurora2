"use client";

import { Heart, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { products } from "@/content/products";
import { useCart } from "@/lib/context/cart-context";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface WishlistDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WishlistDrawer({ open, onOpenChange }: WishlistDrawerProps) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Get full product details for wishlist items
  const wishlistProducts = wishlist
    .map((item) => products.find((p) => p.slug === item.productSlug))
    .filter((p) => p !== undefined);

  const handleAddToCart = (product: any) => {
    addToCart({
      productSlug: product.slug,
      name: product.name,
      image: product.image,
      size: product.sizes[0].weight,
      price: product.sizes[0].price,
      quantity: 1,
      origin: product.origin,
    });
  };

  const handleRemove = (slug: string, name: string) => {
    removeFromWishlist(slug, name);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            Mis Favoritos
          </SheetTitle>
          <SheetDescription>
            {wishlistProducts.length === 0
              ? "No tienes productos favoritos"
              : `${wishlistProducts.length} ${
                  wishlistProducts.length === 1 ? "producto" : "productos"
                } guardados`}
          </SheetDescription>
        </SheetHeader>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto -mx-6 px-6 my-4">
          {wishlistProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Heart className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-foreground/60 mb-2">
                No tienes productos favoritos
              </p>
              <p className="text-sm text-foreground/40">
                Haz click en el corazón para guardar tus cafés favoritos
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistProducts.map((product) => (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 p-4 border border-border rounded-lg hover:border-accent/50 transition-all group"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="96px"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-semibold text-foreground text-base mb-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-foreground/60 mb-2">
                      {product.origin}
                    </p>

                    {/* Tasting Notes */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.notes.slice(0, 3).map((note) => (
                        <Badge
                          key={note}
                          variant="outline"
                          className="text-[10px] px-1.5 py-0"
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 h-8 text-xs"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Agregar
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemove(product.slug, product.name)}
                        className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-bold text-accent">
                      ${product.sizes[0].price}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {product.sizes[0].weight}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="pt-4 border-t border-border space-y-3">
            <p className="text-sm text-foreground/60 text-center">
              Agrega tus favoritos al carrito para continuar con la compra
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
