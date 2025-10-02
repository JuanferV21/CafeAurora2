"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/content/products";
import { staggerContainer } from "@/lib/motion";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";

export function RoastShowcase() {
  const [filter, setFilter] = useState<"all" | "light" | "medium" | "medium-dark">("all");

  const filteredProducts = filter === "all"
    ? products
    : products.filter(p => p.roast === filter);

  return (
    <section id="productos" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Nuestras Variedades
          </h2>
          <p className="text-lg text-foreground/70">
            Tres perfiles de tueste únicos, cada uno seleccionado para destacar
            los mejores atributos de su origen.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            Todos
          </Button>
          <Button
            variant={filter === "light" ? "default" : "outline"}
            onClick={() => setFilter("light")}
            size="sm"
          >
            Tueste claro
          </Button>
          <Button
            variant={filter === "medium" ? "default" : "outline"}
            onClick={() => setFilter("medium")}
            size="sm"
          >
            Tueste medio
          </Button>
          <Button
            variant={filter === "medium-dark" ? "default" : "outline"}
            onClick={() => setFilter("medium-dark")}
            size="sm"
          >
            Tueste medio-oscuro
          </Button>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          key={filter}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
