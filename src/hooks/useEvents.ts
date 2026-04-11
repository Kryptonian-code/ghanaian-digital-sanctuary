import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useEvents(limit?: number) {
  return useQuery({
    queryKey: ["events", limit],
    queryFn: async () => {
      let query = supabase
        .from("events")
        .select("*")
        .gte("date", new Date().toISOString().split("T")[0])
        .order("date");
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}
