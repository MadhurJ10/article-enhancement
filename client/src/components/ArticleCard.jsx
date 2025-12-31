import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-2">
        {article.title}
      </h2>

      <span
        className={`inline-block text-xs px-2 py-1 rounded mb-3 ${
          article.isImproved
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {article.isImproved ? "Improved" : "Original"}
      </span>

      <Link
        to={`/article/${article._id}`}
        className="block mt-3 text-sm text-blue-600 hover:underline"
      >
        View Article →
      </Link>
    </div>
  );
}
