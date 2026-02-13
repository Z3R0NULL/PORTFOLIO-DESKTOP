/**
 * Layout raíz de la aplicación.
 *
 * Define la estructura HTML base que envuelve todas las páginas.
 * Incluye:
 * - Metadatos SEO (título, descripción)
 * - Scripts de Orchids para logs y rutas (solo en el editor)
 * - ErrorReporter para capturar errores en desarrollo
 * - VisualEditsMessenger para edición visual en Orchids
 */

import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

// Metadatos SEO de la página
export const metadata: Metadata = {
  title: "Z3R0NULL | Developer",
  description:
    "Portfolio — Developed by Z3R0NULL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {/* Script de Orchids para capturar logs del navegador */}
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="eefe8903-79f5-459c-9ae9-dcb210b1e70a"
        />

        {/* Captura errores y los envía al editor */}
        <ErrorReporter />

        {/* Script de Orchids para mensajes de cambio de ruta */}
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />

        {children}

        {/* Messenger para edición visual en Orchids */}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
