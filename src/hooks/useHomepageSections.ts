import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useHomepageSections() {
  return useQuery({
    queryKey: ["homepage-sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_sections")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useSectionVisible(sectionKey: string) {
  const { data } = useHomepageSections();
  const section = data?.find((s) => s.section_key === sectionKey);
  return section?.is_visible ?? true;
}
