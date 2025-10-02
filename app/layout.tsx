import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CartProvider } from "@/lib/context/cart-context";
import { WishlistProvider } from "@/lib/context/wishlist-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cafeaurora.com"),
  title: {
    default: "Café Aurora - Café de Especialidad Tostado Artesanalmente",
    template: "%s | Café Aurora",
  },
  description:
    "Café de especialidad tostado en lotes pequeños. Seleccionamos granos de altura de Etiopía, Guatemala y Colombia. Compra directa, trazabilidad completa y frescura garantizada.",
  keywords: [
    "café de especialidad",
    "café artesanal",
    "café tostado",
    "café etíope",
    "café guatemalteco",
    "café colombiano",
    "tueste artesanal",
    "comercio directo",
    "café sostenible",
  ],
  authors: [{ name: "Café Aurora" }],
  creator: "Café Aurora",
  publisher: "Café Aurora",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://cafeaurora.com",
    title: "Café Aurora - Café de Especialidad Tostado Artesanalmente",
    description:
      "Café de especialidad tostado en lotes pequeños. Seleccionamos granos de altura de Etiopía, Guatemala y Colombia.",
    siteName: "Café Aurora",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Café Aurora - Café de Especialidad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Café Aurora - Café de Especialidad Tostado Artesanalmente",
    description:
      "Café de especialidad tostado en lotes pequeños. Seleccionamos granos de altura de Etiopía, Guatemala y Colombia.",
    images: ["/og-image.png"],
    creator: "@cafeaurora",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <WishlistProvider>
          <CartProvider>
            {children}
            <Toaster position="top-center" richColors />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
