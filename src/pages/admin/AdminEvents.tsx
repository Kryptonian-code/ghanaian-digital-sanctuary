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

type EventItem = {
  id?: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  summary: string;
  description: string;
  registration_link: string;
  is_featured: boolean;
  status: string;
};

const emptyEvent: EventItem = {
  title: "", date: new Date().toISOString().split("T")[0], time: "", venue: "",
  summary: "", description: "", registration_link: "", is_featured: false, status: "upcoming",
};

export default function AdminEvents() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem>(emptyEvent);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (ev: EventItem) => {
      if (ev.id) {
        const { error } = await supabase.from("events").update(ev).eq("id", ev.id);
        if (error) throw error;
      } else {
        const { id, ...rest } = ev;
        const { error } = await supabase.from("events").insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Event saved" });
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      setOpen(false);
      setEditing(emptyEvent);
    },
    onError: (err: Error) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Event deleted" });
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Events</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(emptyEvent)}><Plus className="mr-2 h-4 w-4" /> Add Event</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader><DialogTitle>{editing.id ? "Edit Event" : "New Event"}</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(editing); }} className="space-y-4">
              <div><Label>Title</Label><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Date</Label><Input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></div>
                <div><Label>Time</Label><Input value={editing.time} onChange={(e) => setEditing({ ...editing, time: e.target.value })} placeholder="6:00 PM" /></div>
              </div>
              <div><Label>Venue</Label><Input value={editing.venue} onChange={(e) => setEditing({ ...editing, venue: e.target.value })} /></div>
              <div><Label>Summary</Label><Textarea value={editing.summary} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} /></div>
              <div><Label>Registration Link</Label><Input value={editing.registration_link} onChange={(e) => setEditing({ ...editing, registration_link: e.target.value })} /></div>
              <label className="flex items-center gap-2 text-sm"><Switch checked={editing.is_featured} onCheckedChange={(c) => setEditing({ ...editing, is_featured: c })} /> Featured</label>
              <Button type="submit" className="w-full" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : "Save Event"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? <p className="text-muted-foreground">Loading...</p> : !events?.length ? (
        <p className="text-muted-foreground">No events yet.</p>
      ) : (
        <div className="space-y-2">
          {events.map((ev) => (
            <div key={ev.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
              <div>
                <p className="font-heading text-sm font-semibold">{ev.title}</p>
                <p className="font-body text-xs text-muted-foreground">{new Date(ev.date).toLocaleDateString()} {ev.venue && `at ${ev.venue}`}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => { setEditing(ev as EventItem); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(ev.id); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
