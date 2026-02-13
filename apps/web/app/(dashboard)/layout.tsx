"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  function handleLogout() {
    logout();
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="font-bold mb-6">Vet Platform</h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block">
            Dashboard
          </a>
          <a href="/dashboard/tutors" className="block">
            Tutores
          </a>
          <a href="/dashboard/animals" className="block">
            Animais
          </a>
          <a href="/dashboard/atendimentos" className="block">
            Atendimentos
          </a>
          <button onClick={handleLogout} className="mt-4 text-red-400">
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
