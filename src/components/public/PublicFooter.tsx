import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function PublicFooter() {
  const { data: s } = useSiteSettings();

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Ministries", href: "/ministries" },
    { label: "Sermons", href: "/sermons" },
    { label: "Events", href: "/events" },
    { label: "Give", href: "/give" },
    { label: "Visit Us", href: "/visit" },
    { label: "Prayer Request", href: "/prayer-request" },
  ];

  const socialLinks = [
    { icon: Facebook, href: s?.social_facebook, label: "Facebook" },
    { icon: Instagram, href: s?.social_instagram, label: "Instagram" },
    { icon: Youtube, href: s?.social_youtube, label: "YouTube" },
    { icon: Twitter, href: s?.social_twitter, label: "Twitter" },
  ].filter((l) => l.href);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-church py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-church-gold font-heading text-sm font-bold text-primary">
                {s?.church_short_name ?? "GAC"}
              </div>
              <span className="font-heading text-base font-bold">
                {s?.church_name ?? "Grace Assembly Church"}
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed opacity-70">
              {s?.tagline ?? "A Place of Grace, Faith, and Family"}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-church-gold hover:text-primary"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider opacity-60">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider opacity-60">
              Contact Us
            </h4>
            <ul className="space-y-3">
              {s?.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                  <span className="font-body text-sm opacity-70">{s.address}</span>
                </li>
              )}
              {s?.contact_phone && (
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 opacity-60" />
                  <a href={`tel:${s.contact_phone}`} className="font-body text-sm opacity-70 hover:opacity-100">
                    {s.contact_phone}
                  </a>
                </li>
              )}
              {s?.contact_email && (
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 opacity-60" />
                  <a href={`mailto:${s.contact_email}`} className="font-body text-sm opacity-70 hover:opacity-100">
                    {s.contact_email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Scripture */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider opacity-60">
              Word of Encouragement
            </h4>
            <blockquote className="font-body text-sm italic leading-relaxed opacity-60">
              {s?.footer_scripture ?? "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God. - Ephesians 2:8"}
            </blockquote>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-church flex flex-col items-center justify-between gap-2 py-4 text-xs opacity-50 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} {s?.copyright_text ?? "Grace Assembly Church. All rights reserved."}</span>
          <Link to="/admin" className="hover:opacity-80">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
