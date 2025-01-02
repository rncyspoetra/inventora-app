import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import alert from "../utils/alert";

const CategoryForm = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  // Fetch categories and product data
  const fetchCategoryById = async () => {
    if (params.id) {
      try {
        const response = await axios.get(
          `http://localhost:2000/category/${params.id}`
        );
        const category = response.data.data;
        setName(category.name);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }
  };
  useEffect(() => {
    fetchCategoryById();
  }, [params.id]);

  // Handle Form Edit Data
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name) {
      return alert.showErrorAlert("Lengkapi Data Kategori");
    }

    try {
      const categoryData = {
        name,
      };

      if (params.id) {
        await axios.patch(
          `http://localhost:2000/category/updateCategory/${params.id}`,
          {
            ...categoryData,
          }
        );
        alert.showSuccessAlert("Data Kategori Telah Diubah!");
      } else {
        await axios.post("http://localhost:2000/category/addCategory/", {
          ...categoryData,
        });
        alert.showSuccessAlert("Data Kategori Telah Ditambahkan!");
      }

      navigate("/category");
    } catch (error) {
      console.error("Error saving category:", error);
      alert.showErrorAlert(error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 bg-light p-4 position-relative card shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="nameCategory"
              className="fw-semibold text-secondary mb-3"
            >
              Nama Kategori
            </label>
            <input
              type="text"
              className="form-control p-2"
              id="nameCategory"
              placeholder="Masukkan Nama Kategori..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button
              type="button"
              className="btn btn-primary bg-danger border-0 fw-reguler px-3 rounded-1 fw-light"
              onClick={() => navigate("/category")}
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

export default CategoryForm;
