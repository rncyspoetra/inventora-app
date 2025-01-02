import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import alert from "../utils/alert";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [categories, setCategories] = useState([]); // State for category list
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  const navigate = useNavigate();
  const params = useParams();

  // Fetch categories and product data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:2000/category");
        setCategories(response.data.data); // Assume response structure has data in response.data.data
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProductById = async () => {
      if (params.id) {
        try {
          const response = await axios.get(
            `http://localhost:2000/product/${params.id}`
          );
          const product = response.data.data;
          setName(product.name);
          setBuyPrice(product.buyPrice);
          setSellPrice(product.sellPrice);
          setSelectedCategory(product.categoryId); // Assume product has a categoryId
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchCategories();
    fetchProductById();
  }, [params.id]);

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !buyPrice || !sellPrice || !selectedCategory) {
      return alert.showErrorAlert("Lengkapi Data Produk");
    }

    try {
      const productData = {
        name,
        buyPrice: parseFloat(buyPrice),
        sellPrice: parseFloat(sellPrice),
        categoryId: selectedCategory, // Include category in the payload
      };

      if (params.id) {
        await axios.patch(
          `http://localhost:2000/product/updateProduct/${params.id}`,
          {
            ...productData,
          }
        );
        alert.showSuccessAlert("Data Produk Telah Diubah!");
      } else {
        await axios.post("http://localhost:2000/product/addProduct/", {
          ...productData,
        });
        alert.showSuccessAlert("Data Produk Telah Ditambahkan!");
      }

      navigate("/product");
    } catch (error) {
      console.error("Error saving product:", error);
      alert.showErrorAlert(error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 bg-light p-4 position-relative card shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="nameProduct"
              className="fw-semibold text-secondary mb-3"
            >
              Nama Produk
            </label>
            <input
              type="text"
              className="form-control p-2"
              id="nameProduct"
              placeholder="Masukkan Nama Produk..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col">
              <label
                htmlFor="buyPrice"
                className="fw-semibold text-secondary my-3"
              >
                Harga Beli Produk
              </label>
              <input
                type="number"
                className="form-control p-2"
                placeholder="Masukkan Harga Beli..."
                id="buyPrice"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                htmlFor="sellPrice"
                className="fw-semibold text-secondary my-3"
              >
                Harga Jual Produk
              </label>
              <input
                type="number"
                className="form-control p-2"
                placeholder="Masukkan Harga Jual..."
                id="sellPrice"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="categorySelect"
              className="fw-semibold text-secondary my-3"
            >
              Kategori
            </label>
            <select
              id="categorySelect"
              className="form-select p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Pilih Kategori...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button
              type="button"
              className="btn btn-primary bg-danger border-0 fw-reguler px-3 rounded-1 fw-light"
              onClick={() => navigate("/product")}
            >
              Kembali
            </button>
            <input
              type="submit"
              className="btn btn-primary bg-purple border-0 fw-reguler px-3 rounded-1"
              value="Simpan"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
