export interface CartItem {
  id: string; // slug + size combo
  productSlug: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  origin: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

export interface CartContextType {
  cart: CartState;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productSlug: string, size: string) => boolean;
}
