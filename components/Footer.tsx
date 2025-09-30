"use client";

import { Coffee, Instagram, Facebook, Twitter, Mail } from "lucide-react";

const footerLinks = {
  producto: [
    { label: "Menú completo", href: "#productos" },
    { label: "Suscripciones", href: "#" },
    { label: "Equipamiento", href: "#" },
    { label: "Tarjetas de regalo", href: "#" },
  ],
  empresa: [
    { label: "Nuestra historia", href: "#" },
    { label: "Sostenibilidad", href: "#impacto" },
    { label: "Blog", href: "#" },
    { label: "Prensa", href: "#" },
  ],
  ayuda: [
    { label: "Contacto", href: "#" },
    { label: "Envíos", href: "#" },
    { label: "Devoluciones", href: "#" },
    { label: "FAQ", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hola@cafeaurora.com", label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <a href="#" className="inline-flex items-center gap-2 mb-4">
              <Coffee className="w-8 h-8 text-accent" />
              <span className="text-2xl font-serif font-bold text-foreground">
                Café Aurora
              </span>
            </a>
            <p className="text-sm text-foreground/70 leading-relaxed max-w-xs mb-6">
              Café de especialidad tostado con pasión. Desde 2012, llevando
              amaneceres a cada taza.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-muted hover:bg-accent hover:text-white transition-all flex items-center justify-center group"
                  >
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Producto
            </h3>
            <ul className="space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Empresa
            </h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Ayuda
            </h3>
            <ul className="space-y-3">
              {footerLinks.ayuda.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>
              © {currentYear} Café Aurora. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="hover:text-accent transition-colors"
              >
                Privacidad
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors"
              >
                Términos
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
