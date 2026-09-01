import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
    konfirmasiPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
      setError("Email tidak valid (harus mengandung '@')");
      return;
    }

    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (!isLogin && form.password !== form.konfirmasiPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    setError("");
    login();
    alert(isLogin ? "Berhasil Login!" : "Berhasil Registrasi!");
    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white border rounded shadow-sm mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Registrasi"}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm"
            placeholder="Masukkan email Anda..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm"
            placeholder="Masukkan Password Email..."
          />
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-semibold mb-1">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="konfirmasiPassword"
              value={form.konfirmasiPassword}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm"
              placeholder="Ulangi Password"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded text-sm hover:bg-blue-700 transition"
        >
          {isLogin ? "Masuk" : "Daftar"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="text-blue-600 font-semibold underline"
        >
          {isLogin
            ? "Belum punya akun? Sign Up"
            : "Sudah punya akun? Login"}
        </button>
      </div>
    </div>
  );
}

export default Auth;