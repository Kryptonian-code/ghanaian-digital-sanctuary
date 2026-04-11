import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Check, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPrayerRequests() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["admin-prayer-requests"],
    queryFn: async () => {
      const { data, error } = await supabase.from("prayer_requests").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("prayer_requests").update({ is_read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-prayer-requests"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("prayer_requests").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Request deleted" });
      queryClient.invalidateQueries({ queryKey: ["admin-prayer-requests"] });
    },
  });

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold">Prayer Requests</h1>
      {isLoading ? <p className="text-muted-foreground">Loading...</p> : !requests?.length ? (
        <p className="text-muted-foreground">No prayer requests yet.</p>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className={`rounded-lg border p-4 ${r.is_read ? 'border-border bg-background' : 'border-primary/20 bg-primary/5'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-heading text-sm font-semibold">{r.name}</p>
                    {!r.is_read && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">New</span>}
                  </div>
                  <p className="font-body text-sm text-muted-foreground mb-2">{r.request}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {r.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{r.email}</span>}
                    {r.phone && <span>{r.phone}</span>}
                    <span>{new Date(r.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {!r.is_read && (
                    <Button variant="ghost" size="icon" onClick={() => markRead.mutate(r.id)} title="Mark as read">
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(r.id); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
