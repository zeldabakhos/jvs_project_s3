import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage"; 
import LogInPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import CartPage from './pages/CartPage';
import NotFoundPage from "./pages/NotFoundPage";
import CreateProduct from "./pages/CreateProductPage";
import PrivateRoute from "./components/PrivateRoute";
import EditProductPage from './pages/EditProductPage';
import { useState, useEffect } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change from `setIsLoggedIn` to `isLoggedIn`

  useEffect(() => {
    // Check if token is available in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Set isLoggedIn to true if there's a token
    }
  }, []);

  return (
    <CartProvider>
      <ProductProvider>
        <Router>
          <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> {/* Pass both values */}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LogInPage setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/editproduct/:id" element={<EditProductPage />} />
              <Route path="/products" element={<PrivateRoute isLoggedIn={isLoggedIn}><ProductPage /></PrivateRoute>} />
              <Route path="/createproduct" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateProduct /></PrivateRoute>} />
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
