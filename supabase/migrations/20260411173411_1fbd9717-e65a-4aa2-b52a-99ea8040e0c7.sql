
DROP POLICY "Anyone can submit prayer requests" ON public.prayer_requests;
CREATE POLICY "Anyone can submit prayer requests" ON public.prayer_requests FOR INSERT WITH CHECK (
  length(name) > 0 AND length(request) > 0
);
