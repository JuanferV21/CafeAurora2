"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Mountain, Droplets, ShoppingCart } from "lucide-react";
import { products } from "@/content/products";
import { staggerContainer, fadeIn } from "@/lib/motion";
import Image from "next/image";
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
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              variants={fadeIn}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            >
              <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-accent/50 hover:shadow-xl transition-all group cursor-pointer">
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
                  <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-200">
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
                  {/* Prices */}
                  <div className="flex items-center gap-4 w-full text-sm">
                    {product.sizes.map((size) => (
                      <div key={size.weight} className="flex items-baseline gap-1">
                        <span className="font-semibold text-foreground">
                          ${size.price}
                        </span>
                        <span className="text-xs text-foreground/60">
                          {size.weight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button className="w-full group/btn relative overflow-hidden" size="sm">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
