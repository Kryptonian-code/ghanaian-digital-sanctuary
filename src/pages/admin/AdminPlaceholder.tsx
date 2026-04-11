export default function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="mb-4 font-heading text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">This management section is coming soon. Use the other admin pages to manage your church content.</p>
    </div>
  );
}
