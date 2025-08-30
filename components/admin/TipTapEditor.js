"use client";

import CodeBlock from "@tiptap/extension-code-block";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            editor.chain().focus().setImage({ src: data.url }).run();
          } else {
            alert("Failed to upload image. Please try again.");
          }
        } catch (error) {
          alert("Failed to upload image. Please try again.");
        }
      }
    };
    input.click();
  };

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      if (editor.isActive("link")) {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      } else {
        editor.chain().focus().setLink({ href: url }).run();
      }
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <div className="border-b border-gray-200 p-4 bg-gray-50 rounded-t-lg">
      <div className="flex flex-wrap gap-2">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${
              editor.isActive("bold")
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${
              editor.isActive("italic")
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded ${
              editor.isActive("underline")
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Underline"
          >
            <u>U</u>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded ${
              editor.isActive("strike")
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Strike"
          >
            <s>S</s>
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 rounded ${
              editor.isActive("heading", { level: 1 })
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 rounded ${
              editor.isActive("heading", { level: 2 })
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`p-2 rounded ${
              editor.isActive("heading", { level: 3 })
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${
              editor.isActive("bulletList")
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Bullet List"
          >
            • List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded ${
              editor.isActive("orderedList")
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Numbered List"
          >
            1. List
          </button>
        </div>

        {/* Text Alignment */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-2 rounded ${
              editor.isActive({ textAlign: "left" })
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Align Left"
          >
            ←
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-2 rounded ${
              editor.isActive({ textAlign: "center" })
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Align Center"
          >
            ↔
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-2 rounded ${
              editor.isActive({ textAlign: "right" })
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Align Right"
          >
            →
          </button>
        </div>

        {/* Code and Blockquote */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded ${
              editor.isActive("code")
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Inline Code"
          >
            {"</>"}
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded ${
              editor.isActive("codeBlock")
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Code Block"
          >
            {"{ }"}
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded ${
              editor.isActive("blockquote")
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Blockquote"
          >
            "
          </button>
        </div>

        {/* Links and Images */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={setLink}
            className={`p-2 rounded ${
              editor.isActive("link")
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Add Link"
          >
            🔗
          </button>
          {editor.isActive("link") && (
            <button
              onClick={removeLink}
              className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
              title="Remove Link"
            >
              🗑️
            </button>
          )}
          <button
            onClick={addImage}
            className="p-2 rounded bg-white hover:bg-gray-100"
            title="Add Image"
          >
            🖼️
          </button>
        </div>

        {/* Note: Table functionality can be added later with proper extension configuration */}

        {/* Clear Formatting */}
        <div className="flex gap-1">
          <button
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
            className="p-2 rounded bg-white hover:bg-gray-100"
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

const TipTapEditor = ({
  content,
  onChange,
  placeholder = "Start writing your blog post...",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight,
      CodeBlock,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[400px] focus:outline-none"
      />
    </div>
  );
};

export default TipTapEditor;
