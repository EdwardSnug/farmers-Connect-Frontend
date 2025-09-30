import React, { useState, useEffect } from "react";
import { auth } from "../api/firebase"; 

function ProductForm({ initialData = null, onSubmit, onCancel }) {
  const [id, setId] = useState(initialData ? initialData.id : "");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("General");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  // Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setId(initialData.id || "");
      setProductName(initialData.product_name || "");
      setCategory(initialData.selected_category || "General");
      setPrice(initialData.price || "");
      setQuantity(initialData.quantity || "");
      setUnit(initialData.unit || "");
      setLocation(initialData.location || "");
      setDescription(initialData.description || "");
      setImageUrl(initialData.image_url || ""); 
      setContact(initialData.contact_info || "");
      setVerified(initialData.verified || false);
      setImageFile(null); // reset any previous selected file
    } else {
      resetForm();
    }
  }, [initialData]);

  // Cleanup preview object URL
  useEffect(() => {
    return () => {
      if (imageUrl && imageFile) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, imageFile]);

  // Cloudinary setup
  const CLOUDINARY_UPLOAD_PRESET = "Farmers-Connect";
  const CLOUDINARY_CLOUD_NAME = "dbnqkctmx";

  async function uploadToCloudinary(file) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();
    return data.secure_url;
  }

  function resetForm() {
    setId("");
    setProductName("");
    setCategory("General");
    setPrice("");
    setQuantity("");
    setUnit("");
    setLocation("");
    setDescription("");
    setImageFile(null);
    setImageUrl("");
    setContact("");
    setVerified(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !productName ||
      !category ||
      !price ||
      !quantity ||
      !unit ||
      !location ||
      !description ||
      !contact
    ) {
      alert("Please fill all the missing fields.");
      return;
    }

    setLoading(true);

    let finalImageUrl = imageUrl;
    if (imageFile) {
      try {
        finalImageUrl = await uploadToCloudinary(imageFile);
      } catch (err) {
        alert("Image upload failed.");
        setLoading(false);
        return;
      }
    }

    const user = auth.currentUser;
    const postedBy = user ? user.email : "Anonymous";

    const productData = {
      id,
      product_name: productName,
      selected_category: category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      unit: unit.trim(),
      location: location.trim(),
      description: description.trim(),
      image_url: finalImageUrl,
      contact_info: contact.trim(),
      posted_by: postedBy,
    };

    try {
      let response;
      if (initialData && initialData.id) {
        // UPDATE
        response = await fetch(
          `http://127.0.0.1:5000/api/products/${initialData.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
          }
        );
      } else {
        // CREATE
        response = await fetch("http://127.0.0.1:5000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) throw new Error("Failed to save product");

      const savedProduct = await response.json();
      alert(
        initialData ? "Product updated successfully!" : "Product posted successfully!"
      );

      if (onSubmit) onSubmit(savedProduct);

      // Reset form if creating new product
      if (!initialData) {
        resetForm();
      }

    } catch (err) {
      alert("Error saving product: " + err.message);
    }

    setLoading(false);
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{initialData ? "EDIT PRODUCT" : "POST PRODUCT"}</h2>

      <div className="product-form-fields">
        <label>Product name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter Product Name"
          required
        />
      </div>

      <div className="product-form-fields">
        <label>Select Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="General">General</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Grains">Grains</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Poultry">Poultry</option>
          <option value="Fish">Fish</option>
          <option value="Herbs">Herbs</option>
          <option value="Spices">Spices</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="product-form-fields">
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price per unit"
          required
        />
      </div>

      <div className="product-form-fields">
        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          required
        />
      </div>

      <div className="product-form-fields">
        <label>Unit</label>
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="e.g. kg, bag, crate"
          required
        />
      </div>

      <div className="product-form-fields">
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          required
        />
      </div>

      <div className="product-form-fields">
        <label>Contact Information</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Enter your contact info"
          required
        />
      </div>

      <div className="product-form-fields">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Insert a short description"
          rows={3}
          required
        />
      </div>

      <div className="product-form-fields">
        <label>Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImageFile(file);
            if (file) setImageUrl(URL.createObjectURL(file));
          }}
        />
        {imageUrl && (
          <img src={imageUrl} alt="Preview" style={{ width: 80, marginTop: 8 }} />
        )}
      </div>

      <button type="submit" disabled={loading}>
        {loading
          ? initialData
            ? "Updating..."
            : "Posting..."
          : initialData
          ? "Update Product"
          : "Add Product"}
      </button>

      {initialData && (
        <button
          type="button"
          onClick={() => {
            if (onCancel) onCancel();
            resetForm();
          }}
          style={{ marginLeft: 10 }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default ProductForm;