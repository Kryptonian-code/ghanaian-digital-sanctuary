import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";

export default function EventsSection() {
  const { data: events } = useEvents(3);

  if (!events?.length) return null;

  return (
    <section className="section-padding">
      <div className="container-church">
        <div className="text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.15em] text-church-gold-warm">
            What is Coming Up
          </p>
          <h2 className="heading-section mb-3">Upcoming Events</h2>
          <div className="gold-divider mb-12" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="group overflow-hidden rounded-xl border border-church-border bg-background transition-all hover:shadow-card"
            >
              {event.banner_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={event.banner_image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-church-gold-warm">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(event.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <h3 className="heading-card mb-2">{event.title}</h3>
                {event.summary && (
                  <p className="mb-3 font-body text-sm text-muted-foreground line-clamp-2">
                    {event.summary}
                  </p>
                )}
                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                  {event.time && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {event.time}
                    </span>
                  )}
                  {event.venue && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" /> {event.venue}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/events"
            className="inline-flex items-center rounded-lg border-2 border-primary px-6 py-3 font-heading text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            See All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
