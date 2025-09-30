"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Coffee, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#productos", label: "Productos" },
    { href: "#proceso", label: "Proceso" },
    { href: "#impacto", label: "Impacto" },
    { href: "#ubicaciones", label: "Cafeterías" },
  ];

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold text-foreground group"
              aria-label="Café Aurora - Inicio"
            >
              <Coffee className="w-6 h-6 text-accent transition-transform group-hover:rotate-12" />
              <span className="font-serif text-xl">Café Aurora</span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <Button asChild size="lg">
                <a href="#productos">Comprar granos</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-background md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-medium text-foreground hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-3 w-full max-w-xs"
            >
              <Button asChild size="lg" className="w-full">
                <a href="#productos" onClick={() => setIsMobileMenuOpen(false)}>
                  Comprar granos
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <a href="#ubicaciones">Visitar cafetería</a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-to-content"
        tabIndex={0}
      >
        Saltar al contenido principal
      </a>
    </>
  );
}
