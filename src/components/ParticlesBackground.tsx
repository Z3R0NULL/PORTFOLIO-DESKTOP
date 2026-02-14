"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  opacity: number;
  hue: number;
  type: "dot" | "ring" | "diamond" | "star";
  pulse: number;
  pulseSpeed: number;
  trail: { x: number; y: number }[];
  layer: number; // parallax layer 0=slow 1=mid 2=fast
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

const PARTICLE_COUNT = 120;
const GRID_SIZE = 150;

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);

  const createParticle = useCallback(
    (w: number, h: number): Particle => {
      const layer = Math.random() < 0.3 ? 0 : Math.random() < 0.6 ? 1 : 2;
      const speed = [0.15, 0.3, 0.5][layer];
      const types: Particle["type"][] = ["dot", "dot", "ring", "diamond", "star"];
      const baseSize = layer === 0 ? 1 : layer === 1 ? 1.5 : 2.5;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: baseSize + Math.random() * 1.5,
        baseSize: baseSize + Math.random() * 1.5,
        opacity: 0.15 + Math.random() * 0.4,
        hue: Math.random() < 0.7 ? 0 : Math.random() < 0.5 ? 20 : 340, // red palette
        type: types[Math.floor(Math.random() * types.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        trail: [],
        layer,
      };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let w = 0,
      h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
    }

    function init() {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(w, h)
      );
    }

    // Spatial grid for fast neighbor lookup
    function getGridKey(x: number, y: number) {
      return `${Math.floor(x / GRID_SIZE)},${Math.floor(y / GRID_SIZE)}`;
    }

    function drawStar(
      cx: number,
      cy: number,
      spikes: number,
      outerR: number,
      innerR: number
    ) {
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      ctx!.beginPath();
      ctx!.moveTo(cx, cy - outerR);
      for (let i = 0; i < spikes; i++) {
        ctx!.lineTo(
          cx + Math.cos(rot) * outerR,
          cy + Math.sin(rot) * outerR
        );
        rot += step;
        ctx!.lineTo(
          cx + Math.cos(rot) * innerR,
          cy + Math.sin(rot) * innerR
        );
        rot += step;
      }
      ctx!.lineTo(cx, cy - outerR);
      ctx!.closePath();
    }

    function drawDiamond(cx: number, cy: number, size: number) {
      ctx!.beginPath();
      ctx!.moveTo(cx, cy - size);
      ctx!.lineTo(cx + size * 0.6, cy);
      ctx!.lineTo(cx, cy + size);
      ctx!.lineTo(cx - size * 0.6, cy);
      ctx!.closePath();
    }

    function drawParticle(p: Particle) {
      const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
      const s = p.size * (0.85 + 0.15 * Math.sin(p.pulse));
      const color = `hsla(${p.hue}, 85%, 55%, ${alpha})`;

      // Trail
      if (p.layer === 2 && p.trail.length > 1) {
        ctx!.beginPath();
        ctx!.moveTo(p.trail[0].x, p.trail[0].y);
        for (let i = 1; i < p.trail.length; i++) {
          ctx!.lineTo(p.trail[i].x, p.trail[i].y);
        }
        ctx!.strokeStyle = `hsla(${p.hue}, 85%, 55%, ${alpha * 0.15})`;
        ctx!.lineWidth = s * 0.5;
        ctx!.stroke();
      }

      ctx!.fillStyle = color;
      ctx!.strokeStyle = color;

      switch (p.type) {
        case "dot":
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, s, 0, Math.PI * 2);
          ctx!.fill();
          break;
        case "ring":
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, s * 1.5, 0, Math.PI * 2);
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
          // tiny center dot
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, s * 0.3, 0, Math.PI * 2);
          ctx!.fill();
          break;
        case "diamond":
          drawDiamond(p.x, p.y, s * 1.8);
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
          break;
        case "star":
          drawStar(p.x, p.y, 4, s * 2, s * 0.8);
          ctx!.fill();
          break;
      }
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Build spatial grid
      const grid: Record<string, number[]> = {};
      for (let i = 0; i < particles.length; i++) {
        const key = getGridKey(particles[i].x, particles[i].y);
        (grid[key] ||= []).push(i);
      }

      // Draw connections (only layer 1 & 2 for perf)
      ctx!.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.layer === 0) continue;

        const gx = Math.floor(p.x / GRID_SIZE);
        const gy = Math.floor(p.y / GRID_SIZE);

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const key = `${gx + dx},${gy + dy}`;
            const neighbors = grid[key];
            if (!neighbors) continue;
            for (const j of neighbors) {
              if (j <= i) continue;
              const q = particles[j];
              if (q.layer === 0) continue;
              const distX = p.x - q.x;
              const distY = p.y - q.y;
              const dist = Math.sqrt(distX * distX + distY * distY);
              if (dist < GRID_SIZE) {
                const a = (1 - dist / GRID_SIZE) * 0.06;
                ctx!.strokeStyle = `hsla(0, 85%, 55%, ${a})`;
                ctx!.beginPath();
                ctx!.moveTo(p.x, p.y);
                ctx!.lineTo(q.x, q.y);
                ctx!.stroke();
              }
            }
          }
        }

        // Mouse connection
        const mdx = p.x - mx;
        const mdy = p.y - my;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 200) {
          const a = (1 - mDist / 200) * 0.15;
          ctx!.strokeStyle = `hsla(0, 90%, 60%, ${a})`;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mx, my);
          ctx!.stroke();
        }
      }

      // Update & draw particles
      for (const p of particles) {
        p.pulse += p.pulseSpeed;

        // Mouse repulsion (soft)
        const mdx = p.x - mx;
        const mdy = p.y - my;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 120 && mDist > 0) {
          const force = (1 - mDist / 120) * 0.4;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = [0.3, 0.6, 1.0][p.layer];
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Trail for fast layer
        if (p.layer === 2) {
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 8) p.trail.shift();
        }

        // Wrap
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        drawParticle(p);
      }

      // Draw ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 3;
        r.opacity -= 0.015;

        if (r.opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx!.beginPath();
        ctx!.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx!.strokeStyle = `hsla(0, 85%, 55%, ${r.opacity})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();

        // Inner ring
        if (r.radius > 15) {
          ctx!.beginPath();
          ctx!.arc(r.x, r.y, r.radius * 0.5, 0, Math.PI * 2);
          ctx!.strokeStyle = `hsla(0, 85%, 55%, ${r.opacity * 0.5})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }

        // Push nearby particles
        for (const p of particles) {
          const dx = p.x - r.x;
          const dy = p.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < r.radius + 30 && dist > r.radius - 30 && dist > 0) {
            const force = r.opacity * 0.8;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
      }

      // Cursor glow
      if (mx > 0 && my > 0) {
        const grad = ctx!.createRadialGradient(mx, my, 0, mx, my, 80);
        grad.addColorStop(0, "hsla(0, 85%, 55%, 0.04)");
        grad.addColorStop(1, "hsla(0, 85%, 55%, 0)");
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(mx, my, 80, 0, Math.PI * 2);
        ctx!.fill();
      }

      animId = requestAnimationFrame(frame);
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function onClick(e: MouseEvent) {
      // Spawn ripple
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 150,
        opacity: 0.5,
      });

      // Spawn burst particles
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6;
        const p = createParticle(w, h);
        p.x = e.clientX;
        p.y = e.clientY;
        p.vx = Math.cos(angle) * 2;
        p.vy = Math.sin(angle) * 2;
        p.layer = 2;
        p.type = "star";
        p.opacity = 0.7;
        p.size = 2;
        p.baseSize = 2;
        particles.push(p);
      }

      // Remove excess particles
      while (particles.length > PARTICLE_COUNT + 30) {
        particles.shift();
      }
    }

    function onResize() {
      resize();
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    init();
    frame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}
