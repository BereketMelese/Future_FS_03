export default function AboutPage() {
  return (
    <div className="section-shell space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-(--muted)">
          Our Story
        </p>
        <h1 className="text-4xl sm:text-5xl">A House Built On Slow Craft</h1>
        <p className="max-w-3xl text-muted">
          Addis Cup began as a tiny roasting project, focused on origin
          transparency, gentle roast curves, and bar service rooted in
          hospitality. Today, we remain committed to intentional sourcing,
          artisan brewing, and calm spaces that elevate everyday moments.
        </p>
      </div>

      <article className="glass-panel rounded-2xl p-6 sm:p-8">
        <h2 className="text-3xl">From Bean To Brew</h2>
        <p className="mt-4 text-muted">
          Each origin is roasted in small lots and rested to reveal sweetness
          and depth. We calibrate extraction daily and pair each bean profile
          with tailored brew recipes, preserving character in every cup.
        </p>
      </article>
    </div>
  );
}
