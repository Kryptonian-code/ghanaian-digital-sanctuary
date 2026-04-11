import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useSermons(limit?: number) {
  return useQuery({
    queryKey: ["sermons", limit],
    queryFn: async () => {
      let query = supabase
        .from("sermons")
        .select("*")
        .order("date", { ascending: false });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useFeaturedSermon() {
  return useQuery({
    queryKey: ["sermons", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .eq("is_featured", true)
        .order("date", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}
