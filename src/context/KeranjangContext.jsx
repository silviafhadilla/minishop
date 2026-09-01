import { createContext, useContext, useState } from "react";

const KeranjangContext = createContext();

export function KeranjangProvider({ children }) {
  const [item, setItem] = useState([]);

  function tambahKeKeranjang(produk) {
    let ada = false;
    const keranjangBaru = [];

    for (let i = 0; i < item.length; i++) {
      if (item[i].id === produk.id) {
        ada = true;
        keranjangBaru.push({ ...item[i], jumlah: (item[i].jumlah || 1) + 1 });
      } else {
        keranjangBaru.push(item[i]);
      }
    }

    if (ada) {
      setItem(keranjangBaru);
    } else {
      setItem([...item, { ...produk, jumlah: 1 }]);
    }
  }

  function ubahJumlah(id, angka) {
    const hasil = [];
    for (let i = 0; i < item.length; i++) {
      if (item[i].id === id) {
        const jumlahBaru = (item[i].jumlah || 1) + angka;
        if (jumlahBaru > 0) {
          hasil.push({ ...item[i], jumlah: jumlahBaru });
        }
      } else {
        hasil.push(item[i]);
      }
    }
    setItem(hasil);
  }

  function hapusDariKeranjang(id) {
    const hasil = [];
    for (let i = 0; i < item.length; i++) {
      if (item[i].id !== id) {
        hasil.push(item[i]);
      }
    }
    setItem(hasil);
  }

  return (
    <KeranjangContext.Provider value={{ item, tambahKeKeranjang, ubahJumlah, hapusDariKeranjang }}>
      {children}
    </KeranjangContext.Provider>
  );
}

export function useKeranjang() {
  return useContext(KeranjangContext);
}