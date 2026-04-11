import { Link } from "react-router-dom";
import { Play, Calendar } from "lucide-react";
import { useSermons } from "@/hooks/useSermons";

export default function SermonsSection() {
  const { data: sermons } = useSermons(3);

  if (!sermons?.length) return null;

  const featured = sermons[0];
  const rest = sermons.slice(1);

  return (
    <section className="section-cream section-padding">
      <div className="container-church">
        <div className="text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.15em] text-church-gold-warm">
            The Word
          </p>
          <h2 className="heading-section mb-3">Recent Messages</h2>
          <div className="gold-divider mb-12" />
        </div>

        {featured && (
          <div className="mb-8 overflow-hidden rounded-2xl bg-primary shadow-elevated">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-video bg-primary/80 lg:aspect-auto">
                {featured.thumbnail_url ? (
                  <img
                    src={featured.thumbnail_url}
                    alt={featured.title}
                    className="h-full w-full object-cover opacity-60"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Play className="h-16 w-16 text-church-gold opacity-40" />
                  </div>
                )}
                {featured.video_url && (
                  <a
                    href={featured.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-church-gold text-primary shadow-lg transition-transform hover:scale-110">
                      <Play className="h-7 w-7 ml-1" />
                    </div>
                  </a>
                )}
              </div>
              <div className="flex flex-col justify-center p-8 text-primary-foreground lg:p-12">
                <span className="mb-2 inline-block rounded-full bg-church-gold/20 px-3 py-1 font-body text-xs font-semibold text-church-gold w-fit">
                  Featured Message
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold">{featured.title}</h3>
                <p className="mt-2 font-body text-sm opacity-70">{featured.speaker}</p>
                <div className="mt-3 flex items-center gap-2 text-sm opacity-50">
                  <Calendar className="h-4 w-4" />
                  {new Date(featured.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                {featured.scripture && (
                  <p className="mt-4 text-sm italic opacity-60">{featured.scripture}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((sermon) => (
              <div
                key={sermon.id}
                className="rounded-xl border border-church-border bg-background p-6 transition-all hover:shadow-card"
              >
                <h3 className="heading-card mb-1">{sermon.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{sermon.speaker}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(sermon.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                {sermon.video_url && (
                  <a
                    href={sermon.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    <Play className="h-4 w-4" /> Watch Message
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/sermons"
            className="inline-flex items-center rounded-lg border-2 border-primary px-6 py-3 font-heading text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            View All Messages
          </Link>
        </div>
      </div>
    </section>
  );
}
