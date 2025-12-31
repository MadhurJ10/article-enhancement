import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api/articles";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [showImproved, setShowImproved] = useState(true);

  useEffect(() => {
    getArticleById(id).then(setArticle);
  }, [id]);

  if (!article) return <p className="p-6">Loading...</p>;

  const content = showImproved && article.improvedContent
    ? article.improvedContent
    : article.originalContent;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      {article.improvedContent && (
        <button
          onClick={() => setShowImproved(!showImproved)}
          className="mb-4 text-sm text-blue-600"
        >
          {showImproved ? "View Original" : "View Improved"}
        </button>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {article.references?.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <h3 className="font-semibold mb-2">References</h3>
          <ul className="list-disc pl-5 text-sm">
            {article.references.map((ref, i) => (
              <li key={i}>
                <a
                  href={ref}
                  target="_blank"
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
