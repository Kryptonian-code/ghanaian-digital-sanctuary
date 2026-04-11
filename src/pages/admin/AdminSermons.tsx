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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Sermon = {
  id?: string;
  title: string;
  speaker: string;
  date: string;
  video_url: string;
  audio_url: string;
  scripture: string;
  topic: string;
  summary: string;
  is_featured: boolean;
  is_published: boolean;
};

const emptySermon: Sermon = {
  title: "",
  speaker: "",
  date: new Date().toISOString().split("T")[0],
  video_url: "",
  audio_url: "",
  scripture: "",
  topic: "",
  summary: "",
  is_featured: false,
  is_published: true,
};

export default function AdminSermons() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Sermon>(emptySermon);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: sermons, isLoading } = useQuery({
    queryKey: ["admin-sermons"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (sermon: Sermon) => {
      if (sermon.id) {
        const { error } = await supabase.from("sermons").update(sermon).eq("id", sermon.id);
        if (error) throw error;
      } else {
        const { id, ...rest } = sermon;
        const { error } = await supabase.from("sermons").insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Sermon saved" });
      queryClient.invalidateQueries({ queryKey: ["admin-sermons"] });
      queryClient.invalidateQueries({ queryKey: ["sermons"] });
      setOpen(false);
      setEditing(emptySermon);
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("sermons").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Sermon deleted" });
      queryClient.invalidateQueries({ queryKey: ["admin-sermons"] });
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Sermons</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(emptySermon)}>
              <Plus className="mr-2 h-4 w-4" /> Add Sermon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing.id ? "Edit Sermon" : "New Sermon"}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate(editing);
              }}
              className="space-y-4"
            >
              <div><Label>Title</Label><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required /></div>
              <div><Label>Speaker</Label><Input value={editing.speaker} onChange={(e) => setEditing({ ...editing, speaker: e.target.value })} required /></div>
              <div><Label>Date</Label><Input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></div>
              <div><Label>Video URL</Label><Input value={editing.video_url} onChange={(e) => setEditing({ ...editing, video_url: e.target.value })} /></div>
              <div><Label>Audio URL</Label><Input value={editing.audio_url} onChange={(e) => setEditing({ ...editing, audio_url: e.target.value })} /></div>
              <div><Label>Scripture</Label><Input value={editing.scripture} onChange={(e) => setEditing({ ...editing, scripture: e.target.value })} /></div>
              <div><Label>Topic</Label><Input value={editing.topic} onChange={(e) => setEditing({ ...editing, topic: e.target.value })} /></div>
              <div><Label>Summary</Label><Textarea value={editing.summary} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} /></div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm"><Switch checked={editing.is_featured} onCheckedChange={(c) => setEditing({ ...editing, is_featured: c })} /> Featured</label>
                <label className="flex items-center gap-2 text-sm"><Switch checked={editing.is_published} onCheckedChange={(c) => setEditing({ ...editing, is_published: c })} /> Published</label>
              </div>
              <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save Sermon"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : !sermons?.length ? (
        <p className="text-muted-foreground">No sermons yet. Add your first sermon above.</p>
      ) : (
        <div className="space-y-2">
          {sermons.map((sermon) => (
            <div key={sermon.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
              <div>
                <p className="font-heading text-sm font-semibold">{sermon.title}</p>
                <p className="font-body text-xs text-muted-foreground">{sermon.speaker} &middot; {new Date(sermon.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                {!sermon.is_published && <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">Draft</span>}
                {sermon.is_featured && <span className="rounded bg-church-gold/20 px-2 py-0.5 text-xs text-church-gold-warm">Featured</span>}
                <Button variant="ghost" size="icon" onClick={() => { setEditing(sermon as Sermon); setOpen(true); }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete this sermon?")) deleteMutation.mutate(sermon.id); }}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
