import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-blue-900 text-white p-4 flex justify-between items-center px-8">
      <Link to="/" className="text-xl font-bold">
        MiniShop
      </Link>
      <nav className="flex gap-4 items-center">
        <Link to="/" className="hover:underline text-sm font-semibold">
          Beranda
        </Link>
        <Link to="/keranjang" className="hover:underline text-sm font-semibold">
          Keranjang
        </Link>
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-green-600"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;