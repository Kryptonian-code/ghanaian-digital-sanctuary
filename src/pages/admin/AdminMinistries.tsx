import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Ministry = {
  id?: string;
  name: string;
  short_description: string;
  description: string;
  icon: string;
  display_order: number;
  is_active: boolean;
};

const emptyMinistry: Ministry = {
  name: "", short_description: "", description: "", icon: "Heart", display_order: 0, is_active: true,
};

export default function AdminMinistries() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Ministry>(emptyMinistry);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: ministries, isLoading } = useQuery({
    queryKey: ["admin-ministries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ministries").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (m: Ministry) => {
      if (m.id) {
        const { error } = await supabase.from("ministries").update(m).eq("id", m.id);
        if (error) throw error;
      } else {
        const { id, ...rest } = m;
        const { error } = await supabase.from("ministries").insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Ministry saved" });
      queryClient.invalidateQueries({ queryKey: ["admin-ministries"] });
      queryClient.invalidateQueries({ queryKey: ["ministries"] });
      setOpen(false);
    },
    onError: (err: Error) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ministries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Ministry deleted" });
      queryClient.invalidateQueries({ queryKey: ["admin-ministries"] });
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Ministries</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(emptyMinistry)}><Plus className="mr-2 h-4 w-4" /> Add Ministry</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader><DialogTitle>{editing.id ? "Edit Ministry" : "New Ministry"}</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(editing); }} className="space-y-4">
              <div><Label>Name</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required /></div>
              <div><Label>Short Description</Label><Textarea value={editing.short_description} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} /></div>
              <div><Label>Icon (Lucide name)</Label><Input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="Heart, Users, Globe..." /></div>
              <div><Label>Display Order</Label><Input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} /></div>
              <label className="flex items-center gap-2 text-sm"><Switch checked={editing.is_active} onCheckedChange={(c) => setEditing({ ...editing, is_active: c })} /> Active</label>
              <Button type="submit" className="w-full" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : "Save Ministry"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? <p className="text-muted-foreground">Loading...</p> : !ministries?.length ? (
        <p className="text-muted-foreground">No ministries yet.</p>
      ) : (
        <div className="space-y-2">
          {ministries.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
              <div>
                <p className="font-heading text-sm font-semibold">{m.name}</p>
                <p className="font-body text-xs text-muted-foreground">{m.short_description}</p>
              </div>
              <div className="flex items-center gap-2">
                {!m.is_active && <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">Inactive</span>}
                <Button variant="ghost" size="icon" onClick={() => { setEditing(m as Ministry); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(m.id); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
