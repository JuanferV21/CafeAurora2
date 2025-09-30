export interface Product {
  slug: string;
  name: string;
  origin: string;
  notes: string[];
  roast: "light" | "medium" | "medium-dark";
  roastLabel: string;
  sizes: { weight: string; price: number }[];
  description: string;
  image: string;
  altitude: string;
  process: string;
}

export const products: Product[] = [
  {
    slug: "aurora-alba",
    name: "Aurora Alba",
    origin: "Etiopía",
    notes: ["jazmín", "cítricos", "miel"],
    roast: "light",
    roastLabel: "Tueste claro",
    sizes: [
      { weight: "250g", price: 14 },
      { weight: "1kg", price: 45 },
    ],
    description:
      "Un café etíope de altura que despierta los sentidos con sus notas florales de jazmín, seguidas de cítricos brillantes y un final dulce a miel. Ideal para métodos de filtrado como V60 o Chemex.",
    image: "/products/aurora-alba.png",
    altitude: "1800-2200 msnm",
    process: "Lavado",
  },
  {
    slug: "medianoche",
    name: "Medianoche",
    origin: "Guatemala",
    notes: ["cacao", "caramelo", "avellana"],
    roast: "medium",
    roastLabel: "Tueste medio",
    sizes: [
      { weight: "250g", price: 12 },
      { weight: "1kg", price: 38 },
    ],
    description:
      "Un clásico guatemalteco con cuerpo balanceado y dulzura natural. Las notas de cacao oscuro se entrelazan con caramelo y avellana tostada. Perfecto para espresso o prensa francesa.",
    image: "/products/medianoche.png",
    altitude: "1400-1700 msnm",
    process: "Honey",
  },
  {
    slug: "bruma",
    name: "Bruma",
    origin: "Colombia",
    notes: ["panela", "ciruela", "canela"],
    roast: "medium-dark",
    roastLabel: "Tueste medio-oscuro",
    sizes: [
      { weight: "250g", price: 13 },
      { weight: "1kg", price: 42 },
    ],
    description:
      "Café colombiano de las montañas de Huila. Con cuerpo redondo y dulzor profundo a panela, acompañado de notas de ciruela madura y un toque especiado de canela. Excelente para moka o café con leche.",
    image: "/products/bruma.png",
    altitude: "1600-1900 msnm",
    process: "Natural",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByRoast(
  roast: "light" | "medium" | "medium-dark"
): Product[] {
  return products.filter((product) => product.roast === roast);
}
