import React, { useEffect, useState } from "react";
import { auth } from "../api/firebase";
import ProductForm from "../components/productForm";
import FarmersCard from "../components/farmersCard";
import Sidebar from "../components/sidebar";

const API_URL = import.meta.env.VITE_API_URL;

function Farmers() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched products:", data); // Add this for debugging
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        alert("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const canModifyProduct = (product) => {
    const currentUser = auth.currentUser;
    return currentUser && product.posted_by === currentUser.email;
  };

  const handleEdit = (product) => {
    if (!canModifyProduct(product)) {
      alert("You can only edit your own products!");
      return;
    }
    setEditingProduct(product);
  };

  const handleDelete = async (id, postedBy) => {
    if (!canModifyProduct({ posted_by: postedBy })) {
      alert("You can only delete your own products!");
      return;
    }

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
        <h1>All Products</h1>
        <div className="farmer-product-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map((product) => (
              <FarmersCard
                key={product.id}
                product={product}
                onEdit={() => handleEdit(product)}
                onDelete={() => handleDelete(product.id, product.posted_by)}
                showActions={canModifyProduct(product)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Farmers;