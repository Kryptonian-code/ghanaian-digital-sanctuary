import { Clock, MapPin } from "lucide-react";
import { useServices } from "@/hooks/useServices";

export default function ServicesSection() {
  const { data: services } = useServices();

  return (
    <section className="section-dark section-padding">
      <div className="container-church text-center">
        <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.15em] text-church-gold">
          Join Us
        </p>
        <h2 className="heading-section mb-3 text-primary-foreground">
          Service Times
        </h2>
        <div className="mx-auto mb-12 h-0.5 w-16 rounded-full bg-church-gold" />

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {services?.map((service) => (
            <div
              key={service.id}
              className="group rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-left transition-all hover:bg-primary-foreground/10"
            >
              <h3 className="mb-3 font-heading text-lg font-bold text-primary-foreground">
                {service.name}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <Clock className="h-4 w-4 text-church-gold" />
                  <span>{service.day}, {service.time}</span>
                </div>
                {service.venue && (
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                    <MapPin className="h-4 w-4 text-church-gold" />
                    <span>{service.venue}</span>
                  </div>
                )}
              </div>
              {service.notes && (
                <p className="mt-3 text-xs text-primary-foreground/50">{service.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
