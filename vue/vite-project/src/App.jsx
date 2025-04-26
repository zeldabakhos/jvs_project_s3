import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage"; // Import HomePage
import LogInPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import CartPage from './pages/CartPage';
import NotFoundPage from "./pages/NotFoundPage";
import CreateProduct from "./pages/CreateProductPage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <CartProvider>
      <ProductProvider>
        <Router>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} /> {/* Homepage */}
              <Route path="/login" element={<LogInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/products" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
              <Route path="/createproduct" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
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