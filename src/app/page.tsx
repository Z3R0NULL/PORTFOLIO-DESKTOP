"use client";

/**
 * ============================================================
 * PÁGINA PRINCIPAL DEL PORTAFOLIO - page.tsx
 * ============================================================
 *
 * Esta es la página de inicio del portafolio de Z3R0NULL.
 * Actúa como "orquestador" que compone todas las secciones.
 *
 * Estructura de la página (de arriba a abajo):
 * 1. HeroSection     - Presentación principal con logo, título y CTAs
 * 2. SkillsSection   - Tarjetas de habilidades técnicas
 * 3. ProjectsSection - Galería de proyectos realizados
 * 4. ShopSection     - Productos disponibles en MercadoLibre
 * 5. ContactSection  - Información de contacto y redes sociales
 * 6. Footer          - Pie de página con copyright
 *
 * Usa el hook useScrollReveal para animar elementos al hacer scroll.
 *
 * Organización de archivos:
 * ├── src/
 * │   ├── app/
 * │   │   ├── page.tsx          ← Este archivo (página principal)
 * │   │   ├── layout.tsx        ← Layout global de Next.js
 * │   │   └── globals.css       ← Estilos globales y animaciones
 * │   ├── components/
 * │   │   ├── CyberGrid.tsx     ← Fondo de cuadrícula interactivo
 * │   │   ├── icons/
 * │   │   │   └── TikTokIcon.tsx ← Icono SVG personalizado de TikTok
 * │   │   └── sections/
 * │   │       ├── HeroSection.tsx      ← Sección hero / portada
 * │   │       ├── SkillsSection.tsx    ← Sección de habilidades
 * │   │       ├── ProjectsSection.tsx  ← Sección de proyectos
 * │   │       ├── ShopSection.tsx      ← Sección de tienda
 * │   │       ├── ContactSection.tsx   ← Sección de contacto
 * │   │       └── Footer.tsx           ← Pie de página
 * │   ├── data/
 * │   │   └── portfolio-data.ts ← Datos estáticos (proyectos, skills, etc.)
 * │   └── hooks/
 * │       └── useScrollReveal.ts ← Hook para animaciones al hacer scroll
 * ============================================================
 */

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ShopSection } from "@/components/sections/ShopSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function Portfolio() {
  // Hook que activa animaciones de aparición al hacer scroll
  // Se asigna al contenedor principal para observar todos los hijos
  const scrollRef = useScrollReveal();

  return (
    <div ref={scrollRef} className="relative min-h-screen bg-[#0a0a0a] text-white">
      <ParticlesBackground />
      {/* Sección principal con logo, título y botones de acción */}
      <HeroSection />

      {/* Tarjetas de habilidades técnicas */}
      <SkillsSection />

      {/* Galería de proyectos realizados */}
      <ProjectsSection />

      {/* Productos disponibles para comprar */}
      <ShopSection />

      {/* Información de contacto y redes sociales */}
      <ContactSection />

      {/* Pie de página con copyright */}
      <Footer />
    </div>
  );
}
