"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface WishlistItem {
  productSlug: string;
  addedAt: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  isInWishlist: (productSlug: string) => boolean;
  addToWishlist: (productSlug: string, productName?: string) => void;
  removeFromWishlist: (productSlug: string, productName?: string) => void;
  toggleWishlist: (productSlug: string, productName?: string) => void;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "cafe-aurora-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (storedWishlist) {
      try {
        const parsedWishlist = JSON.parse(storedWishlist);
        setWishlist(parsedWishlist);
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, mounted]);

  const isInWishlist = (productSlug: string): boolean => {
    return wishlist.some((item) => item.productSlug === productSlug);
  };

  const addToWishlist = (productSlug: string, productName?: string) => {
    if (isInWishlist(productSlug)) {
      return;
    }

    const newItem: WishlistItem = {
      productSlug,
      addedAt: Date.now(),
    };

    setWishlist((prev) => [...prev, newItem]);

    toast.success("Añadido a favoritos", {
      description: productName ? `${productName} guardado en tus favoritos` : undefined,
    });
  };

  const removeFromWishlist = (productSlug: string, productName?: string) => {
    setWishlist((prev) => prev.filter((item) => item.productSlug !== productSlug));

    toast.info("Eliminado de favoritos", {
      description: productName ? `${productName} eliminado de favoritos` : undefined,
    });
  };

  const toggleWishlist = (productSlug: string, productName?: string) => {
    if (isInWishlist(productSlug)) {
      removeFromWishlist(productSlug, productName);
    } else {
      addToWishlist(productSlug, productName);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success("Favoritos eliminados");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
