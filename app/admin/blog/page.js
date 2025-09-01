"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import TipTapEditor from "@/components/admin/TipTapEditor";
import { useEffect, useState } from "react";

export default function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    author: "",
    tags: "",
    isActive: true,
    isPublished: false,
  });

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog");
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Form submitted manually"); // Debug log

    // Prevent multiple submissions
    if (e.target.dataset.submitting === "true") {
      console.log("Form already submitting, preventing duplicate submission");
      return;
    }

    e.target.dataset.submitting = "true";

    try {
      const url = editingPost
        ? `/api/admin/blog/${editingPost.id}`
        : "/api/admin/blog";

      const method = editingPost ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingPost(null);
        resetForm();
        fetchBlogPosts();
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
    } finally {
      e.target.dataset.submitting = "false";
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      image: post.image || "",
      author: post.author || "",
      tags: post.tags || "",
      isActive: post.isActive,
      isPublished: post.isPublished,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchBlogPosts();
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      author: "",
      tags: "",
      isActive: true,
      isPublished: false,
    });
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadingImage(true);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          image: data.url,
        }));
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      alert("Upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  if (isLoading) {
    return (
      <AdminLayout title="Blog Posts">
        <div className="text-center">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Blog Posts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Manage Blog Posts
          </h2>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingPost(null);
              resetForm();
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Add New Blog Post
          </button>
        </div>

        {showForm && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              onKeyDown={(e) => {
                // Prevent form submission on Enter key
                if (e.key === "Enter" && e.ctrlKey) {
                  e.preventDefault();
                }
              }}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData({
                        ...formData,
                        title,
                        slug: generateSlug(title),
                      });
                    }}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <TipTapEditor
                  content={formData.content}
                  onChange={(content) => {
                    // Only update content, don't trigger any other actions
                    setFormData((prev) => ({ ...prev, content }));
                  }}
                  placeholder="Start writing your blog post..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    disabled={uploadingImage}
                  />
                  {uploadingImage && (
                    <span className="text-sm text-gray-500">Uploading...</span>
                  )}
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-20 w-auto border rounded"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Current image URL: {formData.image}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="tag1, tag2, tag3"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isPublished: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isPublished"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Published
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPost(null);
                    resetForm();
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  {editingPost ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {blogPosts.map((post) => (
              <li key={post.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          Author: {post.author} |{" "}
                          {post.isPublished ? "Published" : "Draft"}
                        </div>
                        <div className="text-sm text-gray-500">
                          Status: {post.isActive ? "Active" : "Inactive"} |
                          Created:{" "}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
