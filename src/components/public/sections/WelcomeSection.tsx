import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import pastorImage from "@/assets/pastor-portrait.jpg";

export default function WelcomeSection() {
  const { data: s } = useSiteSettings();

  return (
    <section className="section-cream section-padding">
      <div className="container-church">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.15em] text-church-gold-warm">
              Who We Are
            </p>
            <h2 className="heading-section mb-6">
              {s?.welcome_title ?? "Welcome to Our Church Family"}
            </h2>
            <div className="gold-divider mb-6 ml-0" />
            <p className="text-body-lg mb-8">
              {s?.welcome_text ?? "Grace Assembly Church is a vibrant, Bible-believing community of faith located in the heart of Accra, Ghana."}
            </p>
            <Link
              to="/about"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Learn More About Us
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-elevated">
              <img
                src={pastorImage}
                alt={s?.pastor_name ?? "Senior Pastor"}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
                width={800}
                height={1000}
              />
            </div>
            <div className="absolute -bottom-6 -left-4 max-w-sm rounded-xl bg-background p-6 shadow-elevated sm:-left-8">
              <blockquote className="font-body text-sm italic leading-relaxed text-muted-foreground">
                &ldquo;{s?.pastor_welcome?.substring(0, 120) ?? "It is my joy to welcome you to Grace Assembly Church. Our heart as a ministry is to see lives transformed by the power of the Gospel."}&rdquo;
              </blockquote>
              <div className="mt-3 border-t border-church-border pt-3">
                <p className="font-heading text-sm font-bold text-foreground">
                  {s?.pastor_name ?? "Rev. Dr. Emmanuel Kwarteng"}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {s?.pastor_title ?? "Senior Pastor"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
