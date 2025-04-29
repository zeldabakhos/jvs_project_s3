import { createContext, useState, useEffect, useContext } from "react";
import.meta.env.VITE_API_URL

export const ProductContext = createContext();
export const useDelete = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/seeProduct`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}//api/products/deleteProduct/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== productId));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const editProduct = async (productId, updatedFields) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/updateProduct/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? updatedProduct : product
        )
      );
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  return (
    <ProductContext.Provider value={{ products, deleteProduct, editProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
