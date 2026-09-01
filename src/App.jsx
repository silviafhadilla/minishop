import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailProduk from "./pages/DetailProduk";
import Auth from "./pages/Auth";
import Header from "./components/Header";
import { KeranjangProvider } from "./context/KeranjangContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { lazy, Suspense } from "react";

const Keranjang = lazy(() => import("./pages/Keranjang"));

function App() {
  return (  
    <AuthProvider>
      <KeranjangProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produk/:id" element={<DetailProduk />} />
            <Route 
              path="/keranjang" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<p className="p-4 text-center">Loading...</p>}> 
                    <Keranjang /> 
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            
            <Route path="/login" element={<Auth />} />
          </Routes>
        </div>
      </KeranjangProvider>
    </AuthProvider>
  );
}

export default App;