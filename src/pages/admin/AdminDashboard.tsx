import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Calendar, Users, MessageSquare, Heart, Megaphone } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [sermons, events, ministries, prayers, testimonies, announcements] = await Promise.all([
        supabase.from("sermons").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("ministries").select("id", { count: "exact", head: true }),
        supabase.from("prayer_requests").select("id", { count: "exact", head: true }),
        supabase.from("testimonies").select("id", { count: "exact", head: true }),
        supabase.from("announcements").select("id", { count: "exact", head: true }),
      ]);
      return {
        sermons: sermons.count ?? 0,
        events: events.count ?? 0,
        ministries: ministries.count ?? 0,
        prayers: prayers.count ?? 0,
        testimonies: testimonies.count ?? 0,
        announcements: announcements.count ?? 0,
      };
    },
  });

  const cards = [
    { label: "Sermons", count: stats?.sermons ?? 0, icon: BookOpen, color: "bg-primary/10 text-primary" },
    { label: "Events", count: stats?.events ?? 0, icon: Calendar, color: "bg-primary/10 text-primary" },
    { label: "Ministries", count: stats?.ministries ?? 0, icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Prayer Requests", count: stats?.prayers ?? 0, icon: MessageSquare, color: "bg-primary/10 text-primary" },
    { label: "Testimonies", count: stats?.testimonies ?? 0, icon: Heart, color: "bg-primary/10 text-primary" },
    { label: "Announcements", count: stats?.announcements ?? 0, icon: Megaphone, color: "bg-primary/10 text-primary" },
  ];

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-border bg-background p-6">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-body text-sm text-muted-foreground">{card.label}</p>
                <p className="font-heading text-2xl font-bold">{card.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
