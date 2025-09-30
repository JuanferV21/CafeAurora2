"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es requerido")
    .email("Introduce un correo válido"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function Newsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success (90% of the time)
    const success = Math.random() > 0.1;

    if (success) {
      setIsSuccess(true);
      toast.success("¡Suscripción exitosa!", {
        description: `Gracias ${data.name}, revisa tu correo para confirmar.`,
      });
      reset();

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      toast.error("Algo salió mal", {
        description: "Por favor intenta de nuevo en unos momentos.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border-2 border-border rounded-3xl p-8 sm:p-12 shadow-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-2xl mb-4"
                whileHover={{ rotate: 12, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="w-8 h-8" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">
                Únete a la Comunidad Aurora
              </h2>
              <p className="text-foreground/70 text-lg">
                Recibe ofertas exclusivas, lanzamientos de ediciones limitadas y
                consejos de preparación cada mes.
              </p>
            </div>

            {/* Form */}
            {isSuccess ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  ¡Bienvenido a la familia!
                </h3>
                <p className="text-foreground/70">
                  Revisa tu correo para confirmar tu suscripción.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="María García"
                    {...register("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="h-12"
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="text-sm text-destructive flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hola@ejemplo.com"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="h-12"
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-sm text-destructive flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                      />
                      Suscribiendo...
                    </>
                  ) : (
                    <>
                      Suscribirme
                      <Sparkles className="ml-2 w-4 h-4 transition-transform group-hover:scale-110" />
                    </>
                  )}
                </Button>

                {/* Privacy Notice */}
                <p className="text-xs text-foreground/50 text-center">
                  Al suscribirte, aceptas recibir correos promocionales. Puedes
                  cancelar en cualquier momento.
                </p>
              </form>
            )}

            {/* Benefits */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="grid sm:grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-semibold text-foreground mb-1">
                    10% de descuento
                  </div>
                  <div className="text-foreground/60">En tu primera compra</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">
                    Acceso anticipado
                  </div>
                  <div className="text-foreground/60">A ediciones limitadas</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">
                    Recetas exclusivas
                  </div>
                  <div className="text-foreground/60">De baristas expertos</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
