import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import alert from "../utils/alert";

const SaleForm = () => {
  const [products, setProducts] = useState([]); // State untuk daftar produk
  const [productSelected, setProductSelected] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(""); // State untuk jumlah
  const [sellPrice, setSellPrice] = useState(""); // State untuk harga jual produk

  const navigate = useNavigate();

  const { branchId } = useParams();

  // Fetch all product data
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:2000/product/");
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  // Handle product selection
  const handleProductSelected = (productId) => {
    const selectedProduct = products.find(
      (product) => product.id === parseInt(productId) // Cocokkan tipe data
    );

    if (selectedProduct) {
      setProductSelected(selectedProduct);
      setProduct(selectedProduct.id);
      setSellPrice(selectedProduct.sellPrice || ""); // Atur sellPrice jika ditemukan
    } else {
      console.error("Product not found for the selected ID:", productId);
      setSellPrice("");
    }
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!productSelected || !quantity || !sellPrice) {
      return alert.showErrorAlert("Lengkapi Data Penjualan");
    }

    try {
      const saleData = {
        productId: product,
        branchId: parseFloat(branchId),
        quantity: parseFloat(quantity),
        totalAmount: parseFloat(sellPrice) * parseFloat(quantity),
      };

      await axios.post(
        `http://localhost:2000/sales/addSale/${branchId}`,
        saleData
      );

      alert.showSuccessAlert("Data Penjualan Berhasil Disimpan");
      navigate(`/sales/${branchId}`);
    } catch (error) {
      if (error.response.data.message) {
        // Menampilkan pesan error dari server
        alert.showErrorAlert(error.response.data.message);
      } else {
        // Jika error tidak memiliki detail pesan yang diharapkan
        console.error("Error saving sale data:", error);
        alert.showErrorAlert("Gagal Menyimpan Data Penjualan");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 bg-light p-4 position-relative card shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="product"
              className="fw-semibold text-secondary my-3"
            >
              Nama Barang
            </label>
            <select
              id="product"
              className="form-select"
              value={product}
              onChange={(e) => handleProductSelected(e.target.value)}
            >
              <option value="" disabled>
                Pilih Barang...
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="col">
              <label
                htmlFor="quantity"
                className="fw-semibold text-secondary my-3"
              >
                Jumlah
              </label>
              <input
                type="number"
                className="form-control p-2"
                placeholder="Masukkan Jumlah..."
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
                placeholder="Harga Jual Produk..."
                id="sellPrice"
                value={sellPrice}
                readOnly // Input tidak bisa diubah manual
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="total" className="fw-semibold text-secondary my-3">
              Total
            </label>
            <input
              type="number"
              className="form-control p-2"
              placeholder="Rp. 0"
              id="Total"
              readOnly
              value={sellPrice * quantity}
            />
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button
              type="button"
              className="btn btn-danger border-0 px-3 rounded-1"
              onClick={() => navigate(`/sales/${branchId}`)}
            >
              Kembali
            </button>
            <button
              type="submit"
              className="btn btn-primary border-0 px-3 rounded-1"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleForm;
