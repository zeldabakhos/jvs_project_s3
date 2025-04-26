import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext'; // Import CartProvider from CartContext
import { ProductProvider } from './context/ProductContext'; // Import ProductProvider from ProductContext
import CreateProduct from "./pages/CreateProductPage";
import ProductPage from "./pages/ProductPage";
import LogInPage from "./pages/LoginPage";
import CartPage from './pages/CartPage'; // Import the CartPage
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute"; // ✅ Import it

const App = () => {
  return (
    // Wrap your app with CartProvider and ProductProvider
    <CartProvider>
      <ProductProvider>
        <Router>
          <NavBar />
          <main
            style={{ minHeight: "calc(100vh - 180px)" }}
            className="container d-flex flex-column justify-content-center align-items-center w-100"
          >
            <Routes>
              <Route path="/" element={<LogInPage />} />
              <Route path="/cart" element={<CartPage />} /> {/* Cart page route */}
              <Route path="/login" element={<LogInPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* Protected Routes */}
              <Route
                path="/products"
                element={
                  <PrivateRoute>
                    <ProductPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/createproduct"
                element={
                  <PrivateRoute>
                    <CreateProduct />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ProductProvider>
    </CartProvider>
  );
};

export default App;
