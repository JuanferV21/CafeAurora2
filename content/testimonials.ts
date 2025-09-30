export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  quote: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sofía Morales",
    role: "Barista certificada",
    city: "Ciudad de México",
    quote:
      "Aurora Alba es mi favorito para métodos de filtrado. Las notas florales son increíbles y la consistencia del tueste es impecable.",
  },
  {
    id: "2",
    name: "Carlos Restrepo",
    role: "Cliente frecuente",
    city: "Medellín",
    quote:
      "Llevo dos años comprando Medianoche. El sabor es consistente, el empaque hermoso y el servicio excelente. No cambio esto por nada.",
  },
  {
    id: "3",
    name: "Ana Villanueva",
    role: "Crítica gastronómica",
    city: "Buenos Aires",
    quote:
      "Café Aurora no solo cuida la calidad del grano, sino toda la experiencia. Desde el sourcing ético hasta el perfil de tueste, todo está pensado.",
  },
  {
    id: "4",
    name: "Jorge Mendoza",
    role: "Propietario de cafetería",
    city: "Bogotá",
    quote:
      "Trabajar con Aurora ha elevado nuestra oferta. Nuestros clientes notan la diferencia en cada taza.",
  },
];
