// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ProductListContainer from "./components/products/productList/ProductListContainer";
import ProductDetailContainer from "./components/products/productDetail/ProductDetailContainer";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import CategoryListContainer from "./components/admin/categories/CategoryListContainer";
import AdminProductListContainer from "./components/admin/products/ProductListContainer";
import { CartProvider } from "./contexts/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLayout from "./components/users/UserLayout";
import Logout from "./pages/auth/Logout";
import Registro from "./pages/auth/Registro";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Orders from "./pages/profile/Orders";
import Favorites from "./pages/profile/Favorites";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TiendaFisica from "./pages/TiendaFisica"
import CartPage from "./pages/CartPage"
import SobreNosotros from "./pages/SobreNosotros"
import ResetearContrasenia from "./pages/auth/ResetearContrasenia";
import RecuperarContrasenia from "./pages/auth/RecuperarContrasenia";
import Contact from "./pages/Contact";
import NotFound from './components/NotFound'
import AdminUserListContainer from "./components/admin/users/AdminUserListContainer";

function App() {
  return (
    
    <CartProvider>
      <FavoriteProvider>
        <Router>
          <Header />
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListContainer />} />
              <Route
                path="/products/:id"
                element={<ProductDetailContainer />}
              />
              <Route path="/cart" element={<CartPage />} />

              {/* Rutas de usuario */}
              <Route path="/profile" element={<UserLayout />}>
                <Route index element={<Profile />} />
                <Route path="orders" element={<Orders />} />
                <Route path="favorites" element={<Favorites />} />

                {/* 
              <Route path="/addresses" element={<UserAddresses />
              <Route path="/security" element={<UserSecurity />} /> */}
              </Route>

              {/* Ruta protegida para el admin */}
              <Route path="/admin/*" element={<AdminDashboard />}>
                {/* Subrutas del dashboard */}
                <Route path="categories" element={<CategoryListContainer />} />
                <Route
                  path="products"
                  element={<AdminProductListContainer />}
                />
                <Route
                  path="users"
                  element={<AdminUserListContainer />}
                />
              </Route>

              {/* Rutas de autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/resetearContrasenia" element={<ResetearContrasenia />}  />
              <Route path="/recuperarContrasenia" element={<RecuperarContrasenia />}  />
              <Route path="/register" element={<Registro />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/tienda-fisica" element={<TiendaFisica />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/politica-de-privacidad" element={< PrivacyPolicy/>} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
          </Main>
          <Footer />
        </Router>

        <ToastContainer />
      </FavoriteProvider>
    </CartProvider>
  );
}

export default App;
