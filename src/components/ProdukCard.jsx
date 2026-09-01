import { Link } from "react-router-dom";
import { useKeranjang } from "../context/KeranjangContext";
import { memo } from "react";
import Button from "./Button";
import Badge from "./Badge";

function ProdukCard({ produk }) {
  const { tambahKeKeranjang } = useKeranjang();

  return (
    <div className="border rounded-lg p-4 shadow bg-white flex flex-col justify-between relative">
      <div className="absolute top-2 right-2">
        {produk.stok ? (
          <Badge text="Stok Tersedia" type="success" />
        ) : (
          <Badge text="Stok Habis" type="danger" />
        )}
      </div>

      <div>
        <img
          src={produk.gambar}
          alt={produk.nama}
          loading="lazy"
          className="w-full h-40 object-cover rounded"
        />
        <h3 className="font-semibold mt-2 text-lg text-gray-800">{produk.nama}</h3>
        <p className="text-gray-600 font-medium">
          Rp {produk.harga.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Button
          disabled={!produk.stok}
          onClick={() => tambahKeKeranjang(produk)}
        >
          {produk.stok ? "Tambah Ke Keranjang" : "Tidak Tersedia"}
        </Button>
        
        <Link
          to={`/produk/${produk.id}`}
          className="text-center text-sm text-blue-600 hover:underline font-medium pt-1"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default memo(ProdukCard);