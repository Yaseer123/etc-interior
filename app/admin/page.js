"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "ADMIN") {
      router.push("/admin/signin");
    } else {
      setIsLoading(false);
    }
  }, [session, status, router]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/signin" });
  };

  if (isLoading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session || session.user.role !== "ADMIN") {
    return null;
  }

  const adminSections = [
    {
      title: "Site Settings",
      description: "Manage site configuration, logo, contact info",
      href: "/admin/settings",
      icon: "⚙️",
    },
    {
      title: "Hero Sections",
      description: "Manage homepage hero banners and content",
      href: "/admin/hero",
      icon: "🎯",
    },
    {
      title: "Services",
      description: "Manage services offered by the company",
      href: "/admin/services",
      icon: "🛠️",
    },
    {
      title: "Projects",
      description: "Manage portfolio projects and case studies",
      href: "/admin/projects",
      icon: "📁",
    },
    {
      title: "Team Members",
      description: "Manage team member profiles and information",
      href: "/admin/team",
      icon: "👥",
    },
    {
      title: "Testimonials",
      description: "Manage customer testimonials and reviews",
      href: "/admin/testimonials",
      icon: "💬",
    },
    {
      title: "Blog Posts",
      description: "Manage blog articles and content",
      href: "/admin/blog",
      icon: "📝",
    },
    {
      title: "Contact Messages",
      description: "View and manage contact form submissions",
      href: "/admin/messages",
      icon: "📧",
    },
    {
      title: "Clients",
      description: "Manage client information and testimonials",
      href: "/admin/clients",
      icon: "👥",
    },
  ];

  // Cache management functions
  const clearSliderCache = () => {
    if (typeof window !== "undefined" && window.clearSliderCache) {
      window.clearSliderCache();
      alert("Slider cache cleared successfully!");
    } else {
      alert("Cache functions not available. Please refresh the page.");
    }
  };

  const refreshSliderCache = async () => {
    if (typeof window !== "undefined" && window.refreshSliderCache) {
      await window.refreshSliderCache();
      alert("Slider cache refreshed successfully!");
    } else {
      alert("Cache functions not available. Please refresh the page.");
    }
  };

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
              <p className="text-sm text-gray-600">
                Welcome back, {session.user.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {session.user.email}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Cache Management Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cache Management
            </h2>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Slider Cache
                  </h3>
                  <p className="text-sm text-gray-500">
                    Manage slider data caching for better performance
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={refreshSliderCache}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Refresh Cache
                  </button>
                  <button
                    onClick={clearSliderCache}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    Clear Cache
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adminSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="block group"
              >
                <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-3xl">{section.icon}</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
