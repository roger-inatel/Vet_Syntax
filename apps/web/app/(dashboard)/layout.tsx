import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tutors", label: "Tutores" },
  { href: "/animals", label: "Animais" },
  { href: "/atendimentos", label: "Atendimentos" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <div className="grid min-h-screen grid-cols-[260px_1fr]">
        <aside className="flex flex-col gap-6 border-r border-clay/30 bg-white px-6 py-8">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-fern">Vet</p>
            <p className="text-lg font-semibold">Platform</p>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-ink/80 transition hover:bg-mist"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="px-10 py-8">
          <div className="rounded-3xl bg-white p-8 shadow-soft">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
