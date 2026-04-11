import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useHomepageSections } from "@/hooks/useHomepageSections";
import HeroSection from "@/components/public/sections/HeroSection";
import WelcomeSection from "@/components/public/sections/WelcomeSection";
import ServicesSection from "@/components/public/sections/ServicesSection";
import SermonsSection from "@/components/public/sections/SermonsSection";
import MinistriesSection from "@/components/public/sections/MinistriesSection";
import EventsSection from "@/components/public/sections/EventsSection";
import GivingSection from "@/components/public/sections/GivingSection";
import ContactSection from "@/components/public/sections/ContactSection";

const sectionComponents: Record<string, React.ComponentType> = {
  hero: HeroSection,
  welcome: WelcomeSection,
  services: ServicesSection,
  sermons: SermonsSection,
  ministries: MinistriesSection,
  events: EventsSection,
  giving: GivingSection,
  contact: ContactSection,
};

export default function HomePage() {
  const { data: settings } = useSiteSettings();
  const { data: sections } = useHomepageSections();

  // Update page title from settings
  const metaTitle = settings?.meta_title;
  if (metaTitle && typeof document !== "undefined") {
    document.title = metaTitle;
  }

  const orderedSections = sections
    ?.filter((s) => s.is_visible)
    ?.sort((a, b) => a.display_order - b.display_order) ?? [];

  return (
    <>
      {orderedSections.map((section) => {
        const Component = sectionComponents[section.section_key];
        if (!Component) return null;
        return <Component key={section.section_key} />;
      })}
      {/* Fallback if no sections loaded yet */}
      {orderedSections.length === 0 && (
        <>
          <HeroSection />
          <WelcomeSection />
          <ServicesSection />
          <MinistriesSection />
          <SermonsSection />
          <EventsSection />
          <GivingSection />
          <ContactSection />
        </>
      )}
    </>
  );
}
