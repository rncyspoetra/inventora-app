import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import PaginationComponent from "./PaginationComponent"; // Import PaginationComponent

const StockData = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 5; // Number of items per page
  const { user } = useSelector((state) => state.auth);

  const isAdmin = useMemo(() => user?.user?.role === "admin", [user]);

  const { branchId } = useParams();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // Get Data
  const getData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:2000/product/stock/${branchId}`
      );
      setProductData(data.data);
    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user, branchId]);

  // Filter products based on search term
  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container my-4">
      {/* Section Search */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6 d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Cari nama barang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-outline-primary"
            onClick={() => setSearchTerm("")} // Reset search
          >
            Reset
          </button>
        </div>
      </div>

      {/* Section Table */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <table className="table shadow-sm table-bordered">
            <thead>
              <tr className="text-center bg-primary">
                <th className="py-2 fw-semibold bg-body-secondary">
                  Nama Barang
                </th>
                <th className="py-2 fw-semibold bg-body-secondary">Stok</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <tr key={product.id} className="fs-6">
                    <td className="fw-medium text-secondary px-3 text-start align-middle">
                      {product.name}
                    </td>
                    <td className="fw-medium text-secondary px-3 text-center align-middle">
                      {product.stocks[0].stockQuantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center p-3">
                    Tidak ada produk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="row justify-content-center mt-3">
        <div className="col-md-8 d-flex justify-content-end">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default StockData;
