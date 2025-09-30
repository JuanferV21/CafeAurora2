"use client";

import { motion } from "framer-motion";
import { Handshake, Flame, Package } from "lucide-react";
import { staggerContainer, fadeIn } from "@/lib/motion";

const processSteps = [
  {
    id: 1,
    icon: Handshake,
    title: "Origen responsable",
    description:
      "Trabajamos directamente con cooperativas caficultoras en Etiopía, Guatemala y Colombia. Pagamos precios justos y establecemos relaciones de largo plazo.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: 2,
    icon: Flame,
    title: "Tueste de precisión",
    description:
      "Cada lote se tuesta en nuestra planta con perfiles diseñados para resaltar las características únicas del origen. Control de temperatura al grado.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 3,
    icon: Package,
    title: "Frescura sellada",
    description:
      "Empacamos inmediatamente después del tueste en bolsas con válvula unidireccional. Recibe tu café en su mejor momento, con trazabilidad completa.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export function Process() {
  return (
    <section id="proceso" className="py-24 bg-secondary/20">
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
            Del Origen a tu Taza
          </h2>
          <p className="text-lg text-foreground/70">
            Cuidamos cada paso para garantizar calidad excepcional y
            transparencia total.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={fadeIn}
                className="relative group"
              >
                {/* Connector Line (hidden on mobile) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
                )}

                <div className="relative z-10 text-center space-y-4">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 ${step.bgColor} ${step.color} rounded-2xl shadow-sm group-hover:shadow-md transition-shadow`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-10 h-10" />
                  </motion.div>

                  {/* Step Number */}
                  <div className="inline-block px-3 py-1 text-xs font-bold text-accent bg-accent/10 rounded-full">
                    PASO {step.id}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-foreground/70 leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 bg-card border border-border rounded-2xl text-center max-w-2xl mx-auto"
        >
          <p className="text-foreground/80 leading-relaxed">
            <strong className="text-foreground">
              Trazabilidad completa:
            </strong>{" "}
            Cada bolsa incluye un código QR que te lleva a la historia del lote—
            desde la finca hasta tu cocina.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
