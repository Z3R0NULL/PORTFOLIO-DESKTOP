"use client";

import { useEffect, useRef } from "react";

/**
 * Hook personalizado para animar elementos cuando aparecen en el viewport.
 *
 * Usa la API IntersectionObserver del navegador para detectar cuándo los elementos
 * hijos con la clase "scroll-reveal" entran o salen de la pantalla visible.
 *
 * - Cuando un elemento entra al viewport (es visible al menos un 15%),
 *   se le agrega la clase "revealed" que activa la animación CSS.
 * - Cuando sale del viewport, se le quita la clase para que se pueda
 *   volver a animar al hacer scroll de nuevo.
 *
 * @returns ref - Referencia que se debe asignar al contenedor padre
 *               que envuelve los elementos con clase "scroll-reveal".
 *
 * Ejemplo de uso:
 *   const scrollRef = useScrollReveal();
 *   return <div ref={scrollRef}><div className="scroll-reveal">...</div></div>
 */
export function useScrollReveal() {
  // Referencia al elemento contenedor del DOM
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Creamos un observador que vigila cuándo los elementos
    // entran o salen del área visible del navegador
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // El elemento es visible -> activar animación
            entry.target.classList.add("revealed");
          } else {
            // El elemento ya no es visible -> quitar animación
            entry.target.classList.remove("revealed");
          }
        });
      },
      { threshold: 0.15 } // Se activa cuando el 15% del elemento es visible
    );

    // Buscar todos los hijos con la clase "scroll-reveal" y observarlos
    const children = el.querySelectorAll(".scroll-reveal");
    children.forEach((child) => observer.observe(child));

    // Limpieza: desconectar el observador cuando el componente se desmonte
    return () => observer.disconnect();
  }, []);

  return ref;
}
