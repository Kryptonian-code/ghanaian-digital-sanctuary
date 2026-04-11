import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const settingsGroups = [
  {
    title: "Church Identity",
    keys: ["church_name", "church_short_name", "tagline", "copyright_text"],
  },
  {
    title: "Hero Section",
    keys: [
      "hero_headline",
      "hero_subheadline",
      "hero_cta_primary_label",
      "hero_cta_primary_link",
      "hero_cta_secondary_label",
      "hero_cta_secondary_link",
    ],
  },
  {
    title: "Welcome / About",
    keys: ["welcome_title", "welcome_text", "pastor_name", "pastor_title", "pastor_welcome"],
  },
  {
    title: "Contact Information",
    keys: ["contact_email", "contact_phone", "contact_whatsapp", "address", "office_hours"],
  },
  {
    title: "Social Media",
    keys: ["social_facebook", "social_instagram", "social_youtube", "social_twitter"],
  },
  {
    title: "Giving",
    keys: ["giving_intro", "giving_partnership_message"],
  },
  {
    title: "Footer",
    keys: ["footer_scripture"],
  },
  {
    title: "SEO",
    keys: ["meta_title", "meta_description"],
  },
];

export default function AdminSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin-site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((row) => {
        map[row.key] = typeof row.value === "string" ? row.value : JSON.stringify(row.value);
      });
      return map;
    },
  });

  const [edits, setEdits] = useState<Record<string, string>>({});

  const saveMutation = useMutation({
    mutationFn: async () => {
      const updates = Object.entries(edits);
      for (const [key, value] of updates) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value: JSON.stringify(value) })
          .eq("key", key);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Settings saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      setEdits({});
    },
    onError: (err: Error) => {
      toast({ title: "Error saving settings", description: err.message, variant: "destructive" });
    },
  });

  const getValue = (key: string) => edits[key] ?? settings?.[key] ?? "";
  const setValue = (key: string, val: string) => setEdits((prev) => ({ ...prev, [key]: val }));

  const isLongField = (key: string) =>
    ["welcome_text", "pastor_welcome", "giving_intro", "giving_partnership_message", "footer_scripture", "meta_description", "hero_subheadline"].includes(key);

  if (isLoading) return <p className="text-muted-foreground">Loading settings...</p>;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Site Settings</h1>
        <Button onClick={() => saveMutation.mutate()} disabled={Object.keys(edits).length === 0 || saveMutation.isPending}>
          {saveMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-8">
        {settingsGroups.map((group) => (
          <div key={group.title} className="rounded-xl border border-border bg-background p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold">{group.title}</h2>
            <div className="space-y-4">
              {group.keys.map((key) => (
                <div key={key}>
                  <Label className="mb-1 block capitalize">
                    {key.replace(/_/g, " ")}
                  </Label>
                  {isLongField(key) ? (
                    <Textarea
                      value={getValue(key)}
                      onChange={(e) => setValue(key, e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <Input
                      value={getValue(key)}
                      onChange={(e) => setValue(key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
