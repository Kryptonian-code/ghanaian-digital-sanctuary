import { Link } from "react-router-dom";
import { Heart, Users, Flower2, Shield, Music, Globe } from "lucide-react";
import { useMinistries } from "@/hooks/useMinistries";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Users,
  Flower2,
  Shield,
  Music,
  Globe,
};

export default function MinistriesSection() {
  const { data: ministries } = useMinistries();

  return (
    <section className="section-ivory section-padding">
      <div className="container-church">
        <div className="text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.15em] text-church-gold-warm">
            Get Involved
          </p>
          <h2 className="heading-section mb-3">Our Ministries</h2>
          <div className="gold-divider mb-12" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ministries?.map((ministry) => {
            const IconComponent = iconMap[ministry.icon ?? ""] ?? Heart;
            return (
              <div
                key={ministry.id}
                className="group rounded-xl border border-church-border bg-background p-6 transition-all hover:shadow-card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="heading-card mb-2">{ministry.name}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {ministry.short_description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/ministries"
            className="inline-flex items-center rounded-lg border-2 border-primary px-6 py-3 font-heading text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Explore All Ministries
          </Link>
        </div>
      </div>
    </section>
  );
}
