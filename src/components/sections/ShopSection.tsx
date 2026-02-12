import { ShoppingBag, ExternalLink } from "lucide-react";
import { CyberGrid } from "@/components/CyberGrid";
import { shopProducts } from "@/data/portfolio-data";

export function ShopSection() {
  return (
    <section id="shop" className="relative border-t border-white/5 bg-[#0d0d0d] py-24">
      <CyberGrid className="opacity-30" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="scroll-reveal mb-4 flex items-center justify-center gap-3">
          <ShoppingBag className="h-6 w-6 text-red-500" />
          <h2 className="text-center text-3xl font-bold sm:text-4xl text-white">
            Tienda
          </h2>
        </div>

        <p
          className="scroll-reveal mx-auto mb-12 max-w-2xl text-center text-gray-500"
          style={{ transitionDelay: "0.1s" }}
        >
          Proyectos y dispositivos disponibles para comprar en MercadoLibre
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shopProducts.map((product, index) => (
            <a
              key={product.title}
              href={product.mercadoLibreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="scroll-reveal group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#111111]/80 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2 cursor-pointer"
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-red-600/10 to-gray-800/10">
                <div className="absolute inset-0 cyber-grid opacity-30" />

                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ShoppingBag className="h-16 w-16 text-gray-600/30 transition-all duration-300 group-hover:text-gray-500/50" />
                </div>

                <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-mono font-bold text-gray-300 backdrop-blur-sm border border-white/10">
                    {product.price}
                  </span>
                </div>

                <div className="absolute inset-0 bg-red-600/0 transition-all duration-300 group-hover:bg-red-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="flex items-center gap-2 text-white font-medium">
                    <ExternalLink className="h-4 w-4" />
                    Ver en MercadoLibre
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-red-400">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="scroll-reveal mt-12 text-center">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-gray-500 transition-all duration-300 hover:text-white"
          >
            <span className="font-mono text-sm">Ver todos los productos en MercadoLibre</span>
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
