import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
        <Link to="/" className="text-xl font-semibold">
          BeyondChats Articles
        </Link>
      </div>
    </nav>
  );
}
