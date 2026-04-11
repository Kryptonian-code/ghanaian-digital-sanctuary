import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Give", href: "/give" },
  { label: "Visit Us", href: "/visit" },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);
  const { data: settings } = useSiteSettings();
  const churchName = settings?.church_name ?? "Grace Assembly Church";
  const phone = settings?.contact_phone ?? "";

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="container-church flex items-center justify-between py-1.5 text-xs font-body tracking-wide">
          <span className="opacity-80">
            {settings?.tagline ?? "A Place of Grace, Faith, and Family"}
          </span>
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 opacity-80 transition-opacity hover:opacity-100">
              <Phone className="h-3 w-3" />
              {phone}
            </a>
          )}
        </div>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 border-b border-church-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container-church flex h-16 items-center justify-between lg:h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-heading text-lg font-bold text-primary-foreground lg:h-12 lg:w-12 lg:text-xl">
              {settings?.church_short_name ?? "GAC"}
            </div>
            <div className="hidden sm:block">
              <p className="font-heading text-sm font-bold leading-tight text-foreground lg:text-base">
                {churchName}
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-md px-3 py-2 font-body text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-foreground lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="border-t border-church-border bg-background lg:hidden">
            <nav className="container-church flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-3 font-body text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
