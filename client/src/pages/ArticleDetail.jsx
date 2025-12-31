import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getArticleById,
  improveArticle,
  deleteArticle,
} from "../api/articles";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [showImproved, setShowImproved] = useState(true);
  const [loadingImprove, setLoadingImprove] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Fetch article
  useEffect(() => {
    getArticleById(id).then(setArticle);
  }, [id]);

  // Improve handler
  const handleImprove = async () => {
    try {
      setLoadingImprove(true);
      await improveArticle(id);
      const updated = await getArticleById(id);
      setArticle(updated);
    } catch (err) {
      alert("Failed to improve article");
    } finally {
      setLoadingImprove(false);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (!confirm) return;

    try {
      setLoadingDelete(true);
      await deleteArticle(id);
      navigate("/");
    } catch (err) {
      alert("Failed to delete article");
    } finally {
      setLoadingDelete(false);
    }
  };

  if (!article) return <p className="p-6">Loading...</p>;

  const content =
    showImproved && article.improvedContent
      ? article.improvedContent
      : article.originalContent;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      {/* Action buttons */}
      <div className="flex gap-3 mb-4">
        {!article.isImproved && (
          <button
            onClick={handleImprove}
            disabled={loadingImprove}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {loadingImprove ? "Improving..." : "Improve Article"}
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={loadingDelete}
          className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loadingDelete ? "Deleting..." : "Delete Article"}
        </button>

        {article.improvedContent && (
          <button
            onClick={() => setShowImproved(!showImproved)}
            className="text-sm text-blue-600 ml-2"
          >
            {showImproved ? "View Original" : "View Improved"}
          </button>
        )}
      </div>

      {/* Content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* References */}
      {article.references?.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <h3 className="font-semibold mb-2">References</h3>
          <ul className="list-disc pl-5 text-sm">
            {article.references.map((ref, i) => (
              <li key={i}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
