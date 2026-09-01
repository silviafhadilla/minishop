import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useKeranjang } from "../context/KeranjangContext";

function DetailProduk() {
  const { id } = useParams();
  const { tambahKeKeranjang } = useKeranjang();

  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil detail produk");
        return res.json();
      })
      .then((data) => {
        setProduk(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6 font-semibold">Loading detail produk...</div>;
  if (error || !produk) return <div className="p-6 text-red-500 font-semibold">Gagal memuat detail produk!</div>;

  const hargaRupiah = Math.round(produk.price * 15000);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link to="/" className="text-blue-600 mb-4 inline-block font-semibold">
        ← Kembali ke Beranda
      </Link>

      <div className="border p-6 rounded-lg shadow-sm bg-white">
        <img
          src={produk.image}
          alt={produk.title}
          className="w-48 h-48 object-contain mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{produk.title}</h2>

        <p className="text-2xl font-bold text-blue-600 mb-4">
          Rp {hargaRupiah.toLocaleString("id-ID")}
        </p>

        <button
          onClick={() =>
            tambahKeKeranjang({
              id: produk.id,
              nama: produk.title,
              harga: hargaRupiah,
              gambar: produk.image,
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
        >
          + Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}

export default DetailProduk;