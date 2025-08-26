"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children, title }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/signin" });
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: "🏠" },
    { name: "Site Settings", href: "/admin/settings", icon: "⚙️" },
    { name: "Hero Sections", href: "/admin/hero", icon: "🎯" },
    { name: "Services", href: "/admin/services", icon: "🛠️" },
    { name: "Projects", href: "/admin/projects", icon: "📁" },
    { name: "Team Members", href: "/admin/team", icon: "👥" },
    { name: "Testimonials", href: "/admin/testimonials", icon: "💬" },
    { name: "Blog Posts", href: "/admin/blog", icon: "📝" },
    { name: "Messages", href: "/admin/messages", icon: "📧" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ETC Interior Admin
              </h1>
              {title && <p className="text-sm text-gray-600 mt-1">{title}</p>}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {session?.user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
