import { Zap } from "lucide-react";
import { CyberGrid } from "@/components/CyberGrid";
import { skills } from "@/data/portfolio-data";

export function SkillsSection() {
  return (
    <section className="relative border-t border-white/5 bg-[#0d0d0d] py-24">
      <CyberGrid className="opacity-30" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="scroll-reveal mb-4 flex items-center justify-center gap-3">
          <Zap className="h-6 w-6 text-red-500" />
          <h2 className="text-center text-3xl font-bold sm:text-4xl text-white">
            Habilidades
          </h2>
        </div>

        <p
          className="scroll-reveal mx-auto mb-12 max-w-2xl text-center text-gray-500"
          style={{ transitionDelay: "0.1s" }}
        >
          Áreas en las que me especializo y tecnologías que domino
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="scroll-reveal group relative rounded-xl border border-white/[0.06] bg-[#111111]/80 p-6 transition-all duration-150 hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-1"
                style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 transition-colors duration-150 group-hover:bg-red-500/10 group-hover:border-red-500/20">
                      <skill.icon className="h-5 w-5 text-gray-400 transition-all duration-150 group-hover:text-red-400 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                  <h3 className="font-semibold text-white">{skill.name}</h3>
                </div>

                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-500 transition-colors duration-150 group-hover:text-gray-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-gray-600 transition-colors duration-150 group-hover:bg-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
