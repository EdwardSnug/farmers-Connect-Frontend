import React, { useEffect, useState } from "react";
import { auth } from "../api/firebase";
import ProductForm from "../components/productForm";
import FarmersCard from "../components/farmersCard";
import Sidebar from "../components/sidebar";

function Farmers() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        // Set all products without filtering
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  const handleSubmit = (savedProduct) => {
    if (editingProduct) {
      // Update existing product in the list
      setProducts((prev) =>
        prev.map((p) => (p.id === savedProduct.id ? savedProduct : p))
      );
      setEditingProduct(null);
    } else {
      // Add new product to the list
      setProducts((prev) => [...prev, savedProduct]);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Farmers Hub!</h1>
        <p>Post your products here and connect with buyers across the country.</p>
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleSubmit}
          onCancel={() => setEditingProduct(null)}
        />
        <h1>Your Products</h1>
        <div className="farmer-product-grid">
          {loading ? (
            <p>Loading your products...</p>
          ) : products.length === 0 ? (
            <p>You haven't posted any products yet.</p>
          ) : (
            products.map((product) => (
              <FarmersCard
                key={product.id}
                product={product}
                onEdit={() => handleEdit(product)}
                onDelete={() => handleDelete(product.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Farmers;