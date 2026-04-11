import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHomepageSections } from "@/hooks/useHomepageSections";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { GripVertical } from "lucide-react";

export default function AdminHomepage() {
  const { data: sections, isLoading } = useHomepageSections();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_visible }: { id: string; is_visible: boolean }) => {
      const { error } = await supabase
        .from("homepage_sections")
        .update({ is_visible })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homepage-sections"] });
      toast({ title: "Section updated" });
    },
  });

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-heading text-2xl font-bold">Homepage Sections</h1>
      <p className="mb-6 font-body text-sm text-muted-foreground">
        Toggle sections on or off to control what appears on the public homepage.
      </p>

      <div className="space-y-2">
        {sections?.map((section) => (
          <div
            key={section.id}
            className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
          >
            <div className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-muted-foreground/40" />
              <div>
                <p className="font-heading text-sm font-semibold">{section.title}</p>
                <p className="font-body text-xs text-muted-foreground">{section.section_key}</p>
              </div>
            </div>
            <Switch
              checked={section.is_visible}
              onCheckedChange={(checked) =>
                toggleMutation.mutate({ id: section.id, is_visible: checked })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
