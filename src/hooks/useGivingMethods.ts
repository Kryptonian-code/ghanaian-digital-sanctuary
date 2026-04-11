import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useGivingMethods() {
  return useQuery({
    queryKey: ["giving-methods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("giving_methods")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}
