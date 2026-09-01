import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

function ProdukCard({ item }) {
  const stok = item.stok;
  return (
    <div>
      <h3>{item.title}</h3>
      <p>Rp {item.price}</p>
      <button disabled={stok === 0}>
        {stok > 0 ? "+ Tambah Ke Keranjang" : "Stok Habis"}
      </button>
    </div>
  );
}

describe("Pengujian Komponen ProdukCard", () => {
  test("menampilkan judul dan harga produk dengan benar", () => {
    const mockItem = { title: "Baju Kaos", price: 50000, stok: 10 };
    render(<ProdukCard item={mockItem} />);

    expect(screen.getByText("Baju Kaos")).toBeInTheDocument();
    expect(screen.getByText("Rp 50000")).toBeInTheDocument();
  });

  test("tombol tambah disabled saat stok 0", () => {
    const mockItem = { title: "Baju Kaos", price: 50000, stok: 0 };
    render(<ProdukCard item={mockItem} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Stok Habis");
  });
});