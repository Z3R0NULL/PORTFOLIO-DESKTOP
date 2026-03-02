import { Youtube, Play } from "lucide-react";
import { CyberGrid } from "@/components/CyberGrid";
import { youtubeVideos } from "@/data/portfolio-data";

export function VideosSection() {
  return (
    <section id="videos" className="relative py-24 bg-black/20">
      <CyberGrid className="opacity-10" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="scroll-reveal mb-4 flex items-center justify-center gap-3">
          <Youtube className="h-6 w-6 text-red-600" />
          <h2 className="text-center text-3xl font-bold sm:text-4xl text-white">
            Videos
          </h2>
        </div>

        <p
          className="scroll-reveal mx-auto mb-12 max-w-2xl text-center text-gray-500"
          style={{ transitionDelay: "0.1s" }}
        >
          Tutoriales, demostraciones y auditorías de seguridad en mi canal
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {youtubeVideos.map((video, index) => (
            <div
              key={video.id}
              className="scroll-reveal group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-red-600/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.05)]"
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Video Embed */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  className="absolute inset-0 h-full w-full border-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* Decorative overlay for consistent look */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-full bg-red-600/10 p-1.5 border border-red-600/20">
                    <Play className="h-3 w-3 text-red-500 fill-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100 transition-colors duration-150 group-hover:text-white">
                    {video.title}
                  </h3>
                </div>

                <p className="flex-1 text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {video.description}
                </p>

                <div className="mt-5 pt-4 border-t border-white/[0.04]">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-gray-600 transition-colors duration-150 hover:text-red-500"
                  >
                    Ver en YouTube
                  </a>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div
          className="mt-16 text-center scroll-reveal"
          style={{ transitionDelay: "0.5s" }}
        >
          <a
            href="https://youtube.com/@Z3R0NULL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/10 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-600/20 hover:border-red-600/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
          >
            <Youtube className="h-4 w-4" />
            Suscríbete al canal
          </a>
        </div>
      </div>
    </section>
  );
}
