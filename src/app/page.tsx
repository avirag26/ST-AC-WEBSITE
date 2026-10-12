export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 px-6">
      <p className="text-sm uppercase tracking-[0.25em] text-sky-300 mb-3">
        Welcome
      </p>
      <h1 className="text-4xl sm:text-6xl font-semibold text-white text-center">
        Straight Line Academy
      </h1>
      <p className="mt-4 text-slate-300 text-center max-w-lg">
        Public website — Next.js + TypeScript + Tailwind. Marketing and
        enrollment entry point for the academy.
      </p>
      <div className="mt-8 flex gap-3 text-sm">
        <span className="rounded-md bg-white/10 px-3 py-1.5 text-slate-100 border border-white/20">
          Port 3000
        </span>
        <span className="rounded-md bg-white/10 px-3 py-1.5 text-slate-100 border border-white/20">
          API :4000
        </span>
      </div>
    </main>
  );
}
