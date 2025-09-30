"use client";

import { motion, useInView } from "framer-motion";
import { Leaf, Droplet, Trees, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { staggerContainer, fadeIn } from "@/lib/motion";
import { useRef, useState, useEffect } from "react";

interface ImpactMetric {
  id: string;
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

const metrics: ImpactMetric[] = [
  {
    id: "direct-trade",
    icon: TrendingUp,
    value: "90%",
    label: "Compra directa",
    description:
      "Más del 90% de nuestro café proviene de relaciones directas con cooperativas, pagando precios por encima del mercado.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: "water",
    icon: Droplet,
    value: "30%",
    label: "Reducción de agua",
    description:
      "Hemos reducido el consumo de agua en nuestra planta un 30% mediante sistemas de recirculación y eficiencia.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "reforestation",
    icon: Trees,
    value: "5,000+",
    label: "Árboles plantados",
    description:
      'Nuestro programa "Semillas de Aurora" ha plantado más de 5,000 árboles nativos en regiones caficultoras.',
    color: "text-green-600",
    bgColor: "bg-green-600/10",
  },
  {
    id: "carbon",
    icon: Leaf,
    value: "100%",
    label: "Empaques reciclables",
    description:
      "Todos nuestros empaques son 100% reciclables y estamos trabajando hacia opciones compostables para 2025.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
  },
];

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!inView) return;

    // Extract number from value (e.g., "90%" -> 90)
    const match = value.match(/(\d+)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(match[1]);
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = targetNumber / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        // Preserve suffix/prefix from original value
        const formattedValue = value.replace(/\d+/, Math.floor(current).toString());
        setDisplayValue(formattedValue);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, value]);

  return <span>{displayValue}</span>;
}

export function Impact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impacto" className="py-24 bg-background" ref={ref}>
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
            Compromiso Sostenible
          </h2>
          <p className="text-lg text-foreground/70">
            Creemos que un buen café debe ser bueno para todos: productores,
            planeta y comunidad.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.div key={metric.id} variants={fadeIn}>
                <Card className="h-full border-2 hover:border-accent/30 transition-all hover:shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 ${metric.bgColor} ${metric.color} rounded-xl`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Value */}
                    <div className="space-y-1">
                      <div
                        className={`text-4xl font-serif font-bold ${metric.color}`}
                      >
                        <AnimatedCounter value={metric.value} inView={isInView} />
                      </div>
                      <p className="text-sm font-semibold text-foreground uppercase tracking-wide">
                        {metric.label}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group"
          >
            Conoce más sobre nuestro impacto
            <Leaf className="w-4 h-4 transition-transform group-hover:rotate-12" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
