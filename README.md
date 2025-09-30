# ☕ Café Aurora - Landing Page de Nivel Producción

Landing page de especialidad para **Café Aurora**, una marca ficticia de café artesanal. Construida con Next.js 14, TypeScript, Tailwind CSS y Framer Motion.

![Café Aurora](./public/og-image.jpg)

## 🎯 Objetivo del Proyecto

Crear una landing page elegante, rápida y accesible que cuente la historia de Café Aurora (tostaduría y cafetería de especialidad), con animaciones suaves, excelente tipografía y una experiencia de usuario impecable.

## ✨ Características

- 🚀 **Next.js 14 App Router** con TypeScript estricto
- 🎨 **Tailwind CSS** con variables CSS personalizadas para modo claro/oscuro
- 🎭 **Framer Motion** para animaciones sutiles y micro-interacciones
- ♿ **Accesibilidad AA/AAA** con navegación por teclado y prefers-reduced-motion
- 📱 **Responsive** en todos los dispositivos (360px - 1440px+)
- ⚡ **Performance optimizado** con next/image, lazy loading y prefetch
- 🔍 **SEO completo** con metadata, Open Graph, Twitter Cards y JSON-LD
- 🧩 **shadcn/ui** para componentes de UI consistentes

## 📦 Stack Tecnológico

- **Framework**: Next.js 14.2+ (App Router)
- **Lenguaje**: TypeScript 5.6+ (strict mode)
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: shadcn/ui
- **Animaciones**: Framer Motion 11+
- **Iconos**: Lucide React
- **Formularios**: React Hook Form + Zod
- **Toasts**: Sonner
- **Tipografía**: Inter (UI) + Playfair Display (acento)

## 🎨 Paleta de Colores

### Modo Claro
- **Primario (Aurora Coffee)**: `#6B3E2E`
- **Secundario (Crema)**: `#F5EDE6`
- **Acento (Jade)**: `#2BB5A3`
- **Tinta**: `#1A1A1A`

### Modo Oscuro
- **Primario**: `#5A3225`
- **Secundario**: `#1B1715`
- **Acento**: `#219183`
- **Tinta**: `#EDEDED`

## 🚀 Instalación y Uso

### Prerequisitos

- Node.js 18+ o Bun
- npm, pnpm o yarn

### Pasos

1. **Instalar dependencias**
```bash
npm install
# o
pnpm install
# o
yarn install
```

2. **Ejecutar en desarrollo**
```bash
npm run dev
# o
pnpm dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

3. **Build para producción**
```bash
npm run build
npm run start
```

4. **Lint**
```bash
npm run lint
```

## 📁 Estructura del Proyecto

```
cafe-aurora/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx          # Layout con Navbar y Footer
│   │   └── page.tsx             # Página principal
│   ├── layout.tsx               # Root layout con fuentes
│   ├── globals.css              # Estilos globales + variables CSS
│   ├── sitemap.ts               # Generación de sitemap
│   └── robots.ts                # Configuración de robots.txt
├── components/
│   ├── ui/                      # Componentes de shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── Navbar.tsx               # Navbar con scroll effects
│   ├── Hero.tsx                 # Hero con parallax sutil
│   ├── RoastShowcase.tsx        # Showcase de productos con filtros
│   ├── Process.tsx              # Proceso de 3 pasos
│   ├── Impact.tsx               # Métricas de sostenibilidad
│   ├── Testimonials.tsx         # Carousel accesible
│   ├── Locations.tsx            # Ubicaciones con mapas
│   ├── Newsletter.tsx           # Formulario con validación
│   └── Footer.tsx               # Footer con links
├── content/
│   ├── products.ts              # Datos de cafés
│   ├── testimonials.ts          # Testimonios
│   └── locations.ts             # Ubicaciones
├── lib/
│   ├── utils.ts                 # Utilidad cn (clsx + tailwind-merge)
│   ├── motion.ts                # Presets de Framer Motion
│   └── hooks/
│       ├── use-scroll.ts        # Hooks de scroll
│       └── use-reduced-motion.ts # Hook de accesibilidad
└── public/
    ├── products/                # Imágenes de productos
    ├── locations/               # Imágenes de ubicaciones
    ├── hero-coffee.jpg
    ├── og-image.jpg
    └── favicon.ico
```

## 🎯 Decisiones de Diseño

### Animaciones
- **Sutiles y profesionales**: Evitamos animaciones exageradas
- **Framer Motion presets**: `fadeIn`, `rise`, `staggerContainer`
- **Respeto por prefers-reduced-motion**: Todas las animaciones se reducen automáticamente
- **Performance**: Animaciones GPU-accelerated (transform, opacity)

### Accesibilidad
- ✅ Contraste AA/AAA verificado
- ✅ Navegación completa por teclado
- ✅ Focus visible en todos los elementos interactivos
- ✅ ARIA labels y roles apropiados
- ✅ Skip to content link
- ✅ Formularios con validación inline y mensajes claros
- ✅ Carousel con controles de teclado (← →)

### Performance
- ✅ Next.js Image con `priority` en hero
- ✅ Lazy loading en imágenes fuera del viewport
- ✅ Componentes client-side solo cuando es necesario
- ✅ CSS variables para theme switching eficiente
- ✅ Tailwind CSS con tree-shaking automático

### SEO
- ✅ Metadata completa (title, description, keywords)
- ✅ Open Graph y Twitter Cards
- ✅ Sitemap.xml y robots.txt generados automáticamente
- ✅ Imágenes con alt text descriptivo
- ✅ Estructura semántica HTML5

## 🧪 Componentes Principales

### Navbar
- Scroll-based transparency → blur effect
- Menú móvil con animaciones staggered
- CTAs prominentes

### Hero
- Parallax sutil (se deshabilita con reduced-motion)
- Estadísticas animadas
- Scroll indicator

### RoastShowcase
- Filtros por tipo de tueste
- Cards con hover elevación
- Información detallada (origen, notas, proceso)

### Process
- 3 pasos visuales con iconos
- Líneas conectoras (desktop)
- Trazabilidad destacada

### Impact
- Contadores animados al entrar en viewport
- 4 métricas de sostenibilidad
- Iconografía clara

### Testimonials
- Carousel accesible con teclado
- Auto-rotate cada 6 segundos
- Swipe en móvil

### Newsletter
- Validación con Zod
- Estados de éxito/error
- Toast notifications

## 🎨 Variables CSS Personalizadas

Todas las variables están en `app/globals.css`:

```css
:root {
  --brand: 18 36 22;
  --brand-accent: 174 68 44;
  --brand-secondary: 30 25 94;
  /* ... más variables */
}

.dark {
  --brand: 18 33 25;
  /* ... override para dark mode */
}
```

Uso en Tailwind: `bg-[var(--brand)]` o mediante los tokens de shadcn/ui.

## 📊 Performance Targets

- **Lighthouse Performance**: ≥ 95
- **Lighthouse Accessibility**: 100
- **Lighthouse Best Practices**: ≥ 95
- **Lighthouse SEO**: 100
- **CLS**: < 0.05
- **LCP**: < 2.5s
- **FID**: < 100ms

## 🔧 Configuración Adicional

### Agregar más productos
Edita `content/products.ts` y agrega un nuevo objeto al array.

### Cambiar colores
Edita las variables CSS en `app/globals.css` (`:root` y `.dark`).

### Agregar nueva sección
1. Crea el componente en `components/`
2. Impórtalo en `app/(marketing)/page.tsx`
3. Agrega el link en `components/Navbar.tsx`

## 📝 Notas

- **Imágenes placeholder**: Actualmente se usan SVGs. Reemplaza con imágenes reales en producción.
- **Forms**: El formulario de newsletter simula un API call. Conecta con tu backend real.
- **Analytics**: Agrega Google Analytics o Plausible en `app/layout.tsx`.
- **Dark mode**: Implementa toggle si lo deseas usando `next-themes`.

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy la carpeta .next
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 📄 Licencia

Este es un proyecto de portafolio. Siéntete libre de usarlo como referencia o template.

---

**Hecho con ☕ y Next.js** · Café Aurora © 2024
