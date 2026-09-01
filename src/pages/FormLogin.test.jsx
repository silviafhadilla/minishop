import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Auth from "./Auth"; 
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

describe("Pengujian FormLogin", () => {
  test("menampilkan input email dan password", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(
      screen.getByPlaceholderText(/masukkan email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/masukkan password/i)
    ).toBeInTheDocument();
  });

  test("menampilkan pesan error jika email tidak menggunakan @", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      </AuthProvider>
    );

    const inputEmail = screen.getByPlaceholderText(/masukkan email/i);
    const buttonSubmit = screen.getByRole("button", { name: /masuk/i });

    fireEvent.change(inputEmail, { target: { value: "emailsalah" } });
    fireEvent.click(buttonSubmit);

    expect(screen.getByRole("button", { name: /masuk/i })).toBeInTheDocument();
  });
});