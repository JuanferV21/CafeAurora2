export interface Location {
  id: string;
  name: string;
  address: string;
  hours: { days: string; time: string }[];
  mapUrl: string;
  image: string;
}

export const locations: Location[] = [
  {
    id: "zona-centro",
    name: "Zona Centro",
    address: "Av. Reforma 124, Col. Centro",
    hours: [
      { days: "Lunes a Viernes", time: "7:00 - 19:00" },
      { days: "Sábado", time: "8:00 - 20:00" },
      { days: "Domingo", time: "Cerrado" },
    ],
    mapUrl: "https://maps.google.com",
    image: "/locations/centro.png",
  },
  {
    id: "rio-norte",
    name: "Río Norte",
    address: "Calle Río Lerma 45, Col. Cuauhtémoc",
    hours: [
      { days: "Lunes a Sábado", time: "8:00 - 18:00" },
      { days: "Domingo", time: "Cerrado" },
    ],
    mapUrl: "https://maps.google.com",
    image: "/locations/rio-norte.png",
  },
];
