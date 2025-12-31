import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          BeyondChats Articles
        </Link>

        <Link
          to="/create"
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          Create Article
        </Link>
      </div>
    </nav>
  );
}
