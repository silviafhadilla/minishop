import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useKeranjang } from "../context/KeranjangContext";

function Home() {
  const { tambahKeKeranjang } = useKeranjang();

  const [produk, setProduk] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [pilihKategori, setPilihKategori] = useState("");
  const [cari, setCari] = useState("");
  const [loading, setLoading] = useState(true);

  const [halaman, setHalaman] = useState(1);
  const produkPerHalaman = 3;

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setKategori(data);
          setPilihKategori(data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!pilihKategori) return;

    setLoading(true);
    fetch("https://fakestoreapi.com/products/category/" + pilihKategori)
      .then((res) => res.json())
      .then((data) => {
        setProduk(data);
        setHalaman(1); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [pilihKategori]);

  const handleCariChange = (e) => {
    setCari(e.target.value);
    setHalaman(1);
  };

  const produkFiltered = produk.filter((item) =>
    item.title.toLowerCase().includes(cari.toLowerCase())
  );

  const totalHalaman = Math.ceil(produkFiltered.length / produkPerHalaman) || 1;
  const indeksAwal = (halaman - 1) * produkPerHalaman;
  const produkTampil = produkFiltered.slice(indeksAwal, indeksAwal + produkPerHalaman);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Daftar Produk</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari produk..."
          value={cari}
          onChange={handleCariChange}
          className="border p-2 rounded w-1/2"
        />

        <select
          value={pilihKategori}
          onChange={(e) => setPilihKategori(e.target.value)}
          className="border p-2 rounded w-1/2 bg-white capitalize"
        >
          {kategori.map((kat, index) => (
            <option key={index} value={kat}>
              {kat}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10 font-bold text-gray-500">
          Memuat produk...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {produkTampil.map((item) => {
              const hargaRupiah = Math.round(item.price * 15000);
              const stok = item.rating?.count || 0;

              return (
                <div
                  key={item.id}
                  className="border p-4 rounded bg-white flex flex-col justify-between relative"
                >
                  <span
                    className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${
                      stok > 0
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {stok > 0 ? "Stok Tersedia" : "Stok Habis"}
                  </span>

                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-28 h-28 object-contain mx-auto mb-2 mt-4"
                    />
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-blue-600 font-bold my-2">
                      Rp {hargaRupiah.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <Link
                      to={`/produk/${item.id}`}
                      className="bg-gray-100 text-gray-800 text-center py-1 rounded text-sm font-semibold hover:bg-gray-200 border"
                    >
                      Lihat Detail
                    </Link>

                    <button
                      disabled={stok === 0}
                      onClick={() =>
                        tambahKeKeranjang({
                          id: item.id,
                          nama: item.title,
                          harga: hargaRupiah,
                          gambar: item.image,
                        })
                      }
                      className={`text-center py-1 rounded text-sm font-semibold transition ${
                        stok > 0
                          ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {stok > 0 ? "+ Tambah Ke Keranjang" : "Stok Habis"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-8 pt-4 border-t">
            <button
              onClick={() => setHalaman((prev) => prev - 1)}
              disabled={halaman === 1}
              className={`px-4 py-2 rounded text-sm font-semibold ${
                halaman === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Sebelumnya
            </button>

            <span className="text-sm font-semibold text-gray-700">
              Halaman {halaman} dari {totalHalaman}
            </span>

            <button
              onClick={() => setHalaman((prev) => prev + 1)}
              disabled={halaman >= totalHalaman}
              className={`px-4 py-2 rounded text-sm font-semibold ${
                halaman >= totalHalaman
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Selanjutnya
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;