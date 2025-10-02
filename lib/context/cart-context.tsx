"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import type { CartItem, CartState, CartContextType } from "@/types/cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "cafe-aurora-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({
    items: [],
    totalItems: 0,
    subtotal: 0,
  });
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, mounted]);

  // Calculate totals
  const calculateTotals = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return { totalItems, subtotal };
  };

  const addToCart = (item: Omit<CartItem, "id">) => {
    const itemId = `${item.productSlug}-${item.size}`;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (i) => i.id === itemId
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + item.quantity,
        };
        toast.success("Cantidad actualizada", {
          description: `${item.name} (${item.size}) - Cantidad: ${newItems[existingItemIndex].quantity}`,
        });
      } else {
        // Add new item
        newItems = [
          ...prevCart.items,
          {
            ...item,
            id: itemId,
          },
        ];
        toast.success("Producto añadido al carrito", {
          description: `${item.name} (${item.size}) x${item.quantity}`,
        });
      }

      const { totalItems, subtotal } = calculateTotals(newItems);

      return {
        items: newItems,
        totalItems,
        subtotal,
      };
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== itemId);
      const { totalItems, subtotal } = calculateTotals(newItems);

      const removedItem = prevCart.items.find((item) => item.id === itemId);
      if (removedItem) {
        toast.info("Producto eliminado", {
          description: `${removedItem.name} (${removedItem.size})`,
        });
      }

      return {
        items: newItems,
        totalItems,
        subtotal,
      };
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }

    if (quantity > 10) {
      toast.error("Cantidad máxima excedida", {
        description: "Máximo 10 unidades por producto",
      });
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const { totalItems, subtotal } = calculateTotals(newItems);

      return {
        items: newItems,
        totalItems,
        subtotal,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      totalItems: 0,
      subtotal: 0,
    });
    toast.success("Carrito vaciado");
  };

  const isInCart = (productSlug: string, size: string) => {
    const itemId = `${productSlug}-${size}`;
    return cart.items.some((item) => item.id === itemId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
