"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { locations } from "@/content/locations";
import { staggerContainer, fadeIn } from "@/lib/motion";
import Image from "next/image";

export function Locations() {
  return (
    <section id="ubicaciones" className="py-24 bg-background">
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
            Nuestras Cafeterías
          </h2>
          <p className="text-lg text-foreground/70">
            Dos espacios diseñados para disfrutar el café en su máxima
            expresión. Te esperamos.
          </p>
        </motion.div>

        {/* Locations Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {locations.map((location) => (
            <motion.div
              key={location.id}
              variants={fadeIn}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            >
              <Card className="h-full overflow-hidden border-2 hover:border-accent/50 hover:shadow-xl transition-all group cursor-pointer">
                {/* Location Image/Map */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  <Image
                    src={location.image}
                    alt={`Cafetería ${location.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-serif font-bold text-white mb-1">
                      {location.name}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80">
                      {location.address}
                    </p>
                  </div>

                  {/* Hours */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Clock className="w-4 h-4 text-accent" />
                      Horarios
                    </div>
                    <div className="pl-6 space-y-1">
                      {location.hours.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm text-foreground/70"
                        >
                          <span>{schedule.days}</span>
                          <span className="font-medium">{schedule.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group"
                    size="sm"
                  >
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver ${location.name} en Google Maps`}
                    >
                      Cómo llegar
                      <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center max-w-2xl mx-auto p-6 bg-card border border-border rounded-2xl"
        >
          <p className="text-sm text-foreground/70">
            <strong className="text-foreground">¿Grupos o eventos?</strong>{" "}
            Ambas sucursales cuentan con espacio para reservaciones. Escríbenos
            a{" "}
            <a
              href="mailto:eventos@cafeaurora.com"
              className="text-accent hover:underline"
            >
              eventos@cafeaurora.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
