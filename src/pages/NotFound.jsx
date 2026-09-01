import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="p-6 text-center min-h-[60vh] flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-600 mb-4">
        Halaman Tidak Ditemukan
      </h2>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFound;