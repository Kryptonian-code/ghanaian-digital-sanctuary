import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useGivingMethods } from "@/hooks/useGivingMethods";

export default function GivingSection() {
  const { data: s } = useSiteSettings();
  const { data: methods } = useGivingMethods();

  return (
    <section className="section-dark section-padding">
      <div className="container-church">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.15em] text-church-gold">
              Support the Ministry
            </p>
            <h2 className="heading-section mb-6 text-primary-foreground">
              Give and Partner With Us
            </h2>
            <p className="font-body text-base leading-relaxed text-primary-foreground/70">
              {s?.giving_intro ?? "Your generosity helps us reach more lives, support our community, and advance the mission of God."}
            </p>
            <p className="mt-4 font-body text-sm text-primary-foreground/50">
              {s?.giving_partnership_message ?? "Partner with us to see lives changed, communities strengthened, and the Gospel proclaimed across Ghana and beyond."}
            </p>
            <Link
              to="/give"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-church-gold px-8 py-3.5 font-heading text-sm font-semibold text-primary transition-all hover:bg-church-gold-warm"
            >
              <Heart className="h-4 w-4" />
              Give Now
            </Link>
          </div>

          <div className="space-y-4">
            {methods?.map((method) => {
              const details = method.details as Record<string, string>;
              return (
                <div
                  key={method.id}
                  className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6"
                >
                  <h3 className="mb-3 font-heading text-base font-bold text-primary-foreground">
                    {method.method_name}
                  </h3>
                  <div className="space-y-1">
                    {Object.entries(details)
                      .filter(([k]) => k !== "link")
                      .map(([key, value]) => (
                        <p key={key} className="font-body text-sm text-primary-foreground/60">
                          <span className="capitalize text-primary-foreground/40">
                            {key.replace(/_/g, " ")}:
                          </span>{" "}
                          {value}
                        </p>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
