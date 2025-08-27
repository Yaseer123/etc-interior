"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    siteName: "",
    siteDescription: "",
    logo: "",
    favicon: "",
    phone: "",
    email: "",
    address: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      if (response.ok) {
        const data = await response.json();
        // Ensure socialLinks object exists with default values
        setSettings({
          siteName: "",
          siteDescription: "",
          logo: "",
          favicon: "",
          phone: "",
          email: "",
          address: "",
          socialLinks: {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
          },
          seoTitle: "",
          seoDescription: "",
          seoKeywords: "",
          ...data,
          socialLinks: {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
            ...data.socialLinks,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage("Settings saved successfully!");
      } else {
        setMessage("Error saving settings");
      }
    } catch (error) {
      setMessage("Error saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social.")) {
      const socialKey = name.split(".")[1];
      setSettings((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileUpload = async (file, type) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      if (type === "logo") setUploadingLogo(true);
      if (type === "favicon") setUploadingFavicon(true);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSettings((prev) => ({
          ...prev,
          [type]: data.url,
        }));
        setMessage(
          `${type === "logo" ? "Logo" : "Favicon"} uploaded successfully!`
        );
      } else {
        const error = await response.json();
        setMessage(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      setMessage("Upload failed. Please try again.");
    } finally {
      if (type === "logo") setUploadingLogo(false);
      if (type === "favicon") setUploadingFavicon(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Site Settings">
        <div className="text-center">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Site Settings">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            General Site Settings
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {message && (
            <div
              className={`p-4 rounded-md ${
                message.includes("Error")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Site Description
              </label>
              <input
                type="text"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files[0], "logo")}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  disabled={uploadingLogo}
                />
                {uploadingLogo && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
              </div>
              {settings.logo && (
                <div className="mt-2">
                  <img
                    src={settings.logo}
                    alt="Current logo"
                    className="h-12 w-auto border rounded"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Current logo URL: {settings.logo}
                  </p>
                </div>
              )}
              <input
                type="url"
                name="logo"
                value={settings.logo}
                onChange={handleChange}
                placeholder="Or enter logo URL directly"
                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Favicon
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*,.ico"
                  onChange={(e) =>
                    handleFileUpload(e.target.files[0], "favicon")
                  }
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  disabled={uploadingFavicon}
                />
                {uploadingFavicon && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
              </div>
              {settings.favicon && (
                <div className="mt-2">
                  <img
                    src={settings.favicon}
                    alt="Current favicon"
                    className="h-8 w-8 border rounded"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Current favicon URL: {settings.favicon}
                  </p>
                </div>
              )}
              <input
                type="url"
                name="favicon"
                value={settings.favicon}
                onChange={handleChange}
                placeholder="Or enter favicon URL directly"
                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={settings.address}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Social Media Links
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Facebook
                </label>
                <input
                  type="url"
                  name="social.facebook"
                  value={settings.socialLinks.facebook}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Twitter
                </label>
                <input
                  type="url"
                  name="social.twitter"
                  value={settings.socialLinks.twitter}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <input
                  type="url"
                  name="social.instagram"
                  value={settings.socialLinks.instagram}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="social.linkedin"
                  value={settings.socialLinks.linkedin}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              SEO Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SEO Title
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  value={settings.seoTitle}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SEO Description
                </label>
                <textarea
                  name="seoDescription"
                  value={settings.seoDescription}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SEO Keywords
                </label>
                <input
                  type="text"
                  name="seoKeywords"
                  value={settings.seoKeywords}
                  onChange={handleChange}
                  placeholder="keyword1, keyword2, keyword3"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
