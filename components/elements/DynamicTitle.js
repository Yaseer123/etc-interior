"use client";
import { useEffect } from "react";

export default function DynamicTitle() {
  useEffect(() => {
    const updateTitle = async () => {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const settings = await response.json();
          if (settings.siteName) {
            document.title = settings.siteName;
          }
        }
      } catch (error) {
        console.error("Error fetching site settings for title:", error);
      }
    };

    updateTitle();
  }, []);

  return null; // This component doesn't render anything
}
