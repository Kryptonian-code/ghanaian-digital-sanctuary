import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import communityImage from "@/assets/community.jpg";

export default function ContactSection() {
  const { data: s } = useSiteSettings();

  return (
    <section className="section-ivory section-padding">
      <div className="container-church">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-elevated">
            <img
              src={communityImage}
              alt="Church community"
              className="aspect-[3/2] w-full object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>

          <div>
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.15em] text-church-gold-warm">
              We Would Love to Meet You
            </p>
            <h2 className="heading-section mb-6">Visit Us This Sunday</h2>
            <div className="gold-divider mb-6 ml-0" />

            <div className="space-y-4">
              {s?.address && (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold">Location</p>
                    <p className="font-body text-sm text-muted-foreground">{s.address}</p>
                  </div>
                </div>
              )}
              {s?.contact_phone && (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold">Phone</p>
                    <a href={`tel:${s.contact_phone}`} className="font-body text-sm text-muted-foreground hover:text-primary">
                      {s.contact_phone}
                    </a>
                  </div>
                </div>
              )}
              {s?.contact_email && (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold">Email</p>
                    <a href={`mailto:${s.contact_email}`} className="font-body text-sm text-muted-foreground hover:text-primary">
                      {s.contact_email}
                    </a>
                  </div>
                </div>
              )}
              {s?.office_hours && (
                <p className="font-body text-xs text-muted-foreground">
                  Office Hours: {s.office_hours}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/visit"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                Plan Your Visit
              </Link>
              {s?.contact_whatsapp && (
                <a
                  href={`https://wa.me/${s.contact_whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-heading text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
