
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.homepage_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  config JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read homepage sections" ON public.homepage_sections FOR SELECT USING (true);
CREATE POLICY "Admins can manage homepage sections" ON public.homepage_sections FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  day TEXT NOT NULL,
  time TEXT NOT NULL,
  venue TEXT,
  notes TEXT,
  online_link TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.ministries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  image_url TEXT,
  icon TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ministries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read ministries" ON public.ministries FOR SELECT USING (true);
CREATE POLICY "Admins can manage ministries" ON public.ministries FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.sermons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  thumbnail_url TEXT,
  video_url TEXT,
  audio_url TEXT,
  scripture TEXT,
  topic TEXT,
  summary TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published sermons" ON public.sermons FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage sermons" ON public.sermons FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  end_date DATE,
  venue TEXT,
  banner_image TEXT,
  summary TEXT,
  description TEXT,
  registration_link TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Admins can manage events" ON public.events FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT,
  category TEXT,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  cta_label TEXT,
  cta_link TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published announcements" ON public.announcements FOR SELECT USING (is_published = true AND start_date <= CURRENT_DATE AND (end_date IS NULL OR end_date >= CURRENT_DATE));
CREATE POLICY "Admins can manage announcements" ON public.announcements FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.testimonies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_name TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  testimony TEXT NOT NULL,
  image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published testimonies" ON public.testimonies FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage testimonies" ON public.testimonies FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.giving_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  method_name TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}',
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.giving_methods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read giving methods" ON public.giving_methods FOR SELECT USING (true);
CREATE POLICY "Admins can manage giving methods" ON public.giving_methods FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.leadership (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  photo_url TEXT,
  bio TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leadership ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read leadership" ON public.leadership FOR SELECT USING (true);
CREATE POLICY "Admins can manage leadership" ON public.leadership FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  address TEXT,
  image_url TEXT,
  service_times TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  map_link TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read branches" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Admins can manage branches" ON public.branches FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.media_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  type TEXT NOT NULL DEFAULT 'image',
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  album TEXT,
  category TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.media_gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read media" ON public.media_gallery FOR SELECT USING (true);
CREATE POLICY "Admins can manage media" ON public.media_gallery FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  request TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit prayer requests" ON public.prayer_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read prayer requests" ON public.prayer_requests FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage prayer requests" ON public.prayer_requests FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete prayer requests" ON public.prayer_requests FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_homepage_sections_updated_at BEFORE UPDATE ON public.homepage_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ministries_updated_at BEFORE UPDATE ON public.ministries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sermons_updated_at BEFORE UPDATE ON public.sermons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (key, value) VALUES
('church_name', '"Grace Assembly Church"'),
('church_short_name', '"GAC"'),
('tagline', '"A Place of Grace, Faith, and Family"'),
('hero_headline', '"Welcome to Grace Assembly Church"'),
('hero_subheadline', '"Join us this Sunday for a time of worship, prayer, and the Word."'),
('hero_cta_primary_label', '"Join Us This Sunday"'),
('hero_cta_primary_link', '"/visit"'),
('hero_cta_secondary_label', '"Watch Latest Sermon"'),
('hero_cta_secondary_link', '"/sermons"'),
('welcome_title', '"Welcome to Our Church Family"'),
('welcome_text', '"Grace Assembly Church is a vibrant, Bible-believing community of faith located in the heart of Accra, Ghana. For over two decades, we have been raising men, women, and young people who love God and serve others with excellence. Whether you are visiting for the first time or looking for a church to call home, we would be glad to welcome you and your family."'),
('pastor_name', '"Rev. Dr. Emmanuel Kwarteng"'),
('pastor_title', '"Senior Pastor"'),
('pastor_welcome', '"It is my joy to welcome you to Grace Assembly Church. Our heart as a ministry is to see lives transformed by the power of the Gospel. We believe God has something special for you here, and we look forward to walking this journey of faith with you."'),
('contact_email', '"info@graceassemblychurch.org"'),
('contact_phone', '"+233 30 222 3456"'),
('contact_whatsapp', '"+233 24 456 7890"'),
('address', '"14 Independence Avenue, Ridge, Accra, Ghana"'),
('office_hours', '"Monday to Friday, 8:00 AM to 5:00 PM"'),
('copyright_text', '"Grace Assembly Church. All rights reserved."'),
('footer_scripture', '"For by grace you have been saved through faith, and that not of yourselves; it is the gift of God. - Ephesians 2:8"'),
('social_facebook', '"https://facebook.com/graceassemblychurch"'),
('social_instagram', '"https://instagram.com/graceassemblychurch"'),
('social_youtube', '"https://youtube.com/@graceassemblychurch"'),
('social_twitter', '"https://twitter.com/graceassemblygh"'),
('giving_intro', '"Your generosity helps us reach more lives, support our community, and advance the mission of God. Every gift makes a difference, and we are grateful for your partnership in this work."'),
('giving_partnership_message', '"Partner with us to see lives changed, communities strengthened, and the Gospel proclaimed across Ghana and beyond."'),
('meta_title', '"Grace Assembly Church | A Place of Grace, Faith, and Family"'),
('meta_description', '"Grace Assembly Church is a vibrant Christian community in Accra, Ghana. Join us for powerful worship, life-changing sermons, and meaningful fellowship."');

INSERT INTO public.services (name, day, time, venue, display_order) VALUES
('Sunday Worship Service', 'Sunday', '8:00 AM - 10:30 AM', 'Main Auditorium', 1),
('Second Service', 'Sunday', '11:00 AM - 1:00 PM', 'Main Auditorium', 2),
('Midweek Bible Study', 'Wednesday', '6:30 PM - 8:00 PM', 'Fellowship Hall', 3),
('Friday Prayer Meeting', 'Friday', '6:00 PM - 8:00 PM', 'Prayer Chapel', 4);

INSERT INTO public.homepage_sections (section_key, title, display_order, is_visible) VALUES
('hero', 'Hero Banner', 1, true),
('welcome', 'Welcome / About', 2, true),
('services', 'Service Times', 3, true),
('sermons', 'Latest Sermons', 4, true),
('ministries', 'Our Ministries', 5, true),
('events', 'Upcoming Events', 6, true),
('testimonies', 'Testimonies', 7, true),
('giving', 'Give / Partner', 8, true),
('contact', 'Visit / Contact Us', 9, true);

INSERT INTO public.ministries (name, short_description, icon, display_order) VALUES
('Children''s Ministry', 'Nurturing young hearts in the love of Christ through creative Bible teaching and fun activities.', 'Heart', 1),
('Youth Ministry', 'Empowering the next generation to live boldly for Christ through fellowship, mentorship, and the Word.', 'Users', 2),
('Women''s Fellowship', 'A community of women growing together in faith, prayer, and purpose.', 'Flower2', 3),
('Men''s Fellowship', 'Building godly men who lead with integrity in their homes, workplaces, and communities.', 'Shield', 4),
('Music and Worship', 'Leading the congregation into God''s presence through anointed praise and worship.', 'Music', 5),
('Outreach and Missions', 'Sharing the love of Christ beyond our walls through community service and missions.', 'Globe', 6);

INSERT INTO public.giving_methods (method_name, details, display_order) VALUES
('Mobile Money (MoMo)', '{"provider": "MTN Mobile Money", "number": "024 456 7890", "name": "Grace Assembly Church"}', 1),
('Bank Transfer', '{"bank": "GCB Bank", "account_name": "Grace Assembly Church", "account_number": "1234567890", "branch": "Ridge Branch, Accra"}', 2),
('Online Giving', '{"description": "Give securely through our online giving platform", "link": "/give"}', 3);
