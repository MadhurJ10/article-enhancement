import { useEffect, useState } from "react";
import { deleteArticle, getArticles } from "../api/articles";
import ArticleCard from "../components/ArticleCard";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid gap-6 sm:grid-cols-2">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article}  />
      ))}
    </div>
  );
}
