import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { KeranjangProvider, useKeranjang } from "./KeranjangContext";

function DummyComponent() {
  const { item, tambahKeKeranjang } = useKeranjang();
  return (
    <div>
      <span data-testid="total-item">{item ? item.length : 0}</span>
      <button
        onClick={() =>
          tambahKeKeranjang({ id: 1, nama: "Sepatu", harga: 100000 })
        }
      >
        Tambah Item
      </button>
    </div>
  );
}

describe("Pengujian KeranjangContext", () => {
  test("berhasil menambah item ke dalam state keranjang", () => {
    render(
      <KeranjangProvider>
        <DummyComponent />
      </KeranjangProvider>
    );

    const totalItem = screen.getByTestId("total-item");
    const button = screen.getByRole("button");

    expect(totalItem.textContent).toBe("0");
    fireEvent.click(button);
    expect(totalItem.textContent).toBe("1");
  });
});