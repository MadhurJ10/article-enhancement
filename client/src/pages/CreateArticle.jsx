import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../api/articles";

export default function CreateArticle() {
  const [form, setForm] = useState({
    title: "",
    sourceUrl: "",
    originalContent: "",
  });

  const navigate = useNavigate();

  const submit = async () => {
    await createArticle(form);
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Article</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Source URL"
        value={form.sourceUrl}
        onChange={(e) =>
          setForm({ ...form, sourceUrl: e.target.value })
        }
      />

      <textarea
        className="w-full border p-2 rounded h-48"
        placeholder="Original Content"
        value={form.originalContent}
        onChange={(e) =>
          setForm({ ...form, originalContent: e.target.value })
        }
      />

      <button
        onClick={submit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Create
      </button>
    </div>
  );
}
