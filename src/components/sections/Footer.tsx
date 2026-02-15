export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-mono text-sm text-gray-600">
          <span className="text-red-500/50">&gt;</span> © {new Date().getFullYear()} Z3R0NULL{" "}
          <span className="text-gray-700">|</span> Developer
        </p>
      </div>
    </footer>
  );
}
