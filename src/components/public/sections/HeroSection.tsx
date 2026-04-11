import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import heroImage from "@/assets/hero-worship.jpg";

export default function HeroSection() {
  const { data: s } = useSiteSettings();

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden lg:min-h-[85vh]">
      <img
        src={heroImage}
        alt="Church worship service"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />

      <div className="container-church relative z-10 py-20 text-center text-primary-foreground">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.2em] text-church-gold">
            {s?.tagline ?? "A Place of Grace, Faith, and Family"}
          </p>
          <h1 className="heading-display mb-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {s?.hero_headline ?? "Welcome to Grace Assembly Church"}
          </h1>
          <p className="mx-auto mb-10 max-w-xl font-body text-base leading-relaxed opacity-80 sm:text-lg">
            {s?.hero_subheadline ?? "Join us this Sunday for a time of worship, prayer, and the Word."}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to={s?.hero_cta_primary_link ?? "/visit"}
              className="inline-flex items-center rounded-lg bg-church-gold px-8 py-3.5 font-heading text-sm font-semibold text-primary transition-all hover:bg-church-gold-warm hover:shadow-lg"
            >
              {s?.hero_cta_primary_label ?? "Join Us This Sunday"}
            </Link>
            <Link
              to={s?.hero_cta_secondary_link ?? "/sermons"}
              className="inline-flex items-center rounded-lg border border-primary-foreground/30 px-8 py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
            >
              {s?.hero_cta_secondary_label ?? "Watch Latest Sermon"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
