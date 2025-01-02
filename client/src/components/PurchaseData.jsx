import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import AddButton from "./AddButton";
import PaginationComponent from "./PaginationComponent"; // Import PaginationComponent

const PurchaseData = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [branch, setBranch] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(5); // Number of items per page
  const { user } = useSelector((state) => state.auth);

  const isAdmin = useMemo(() => user?.user?.role === "admin", [user]);
  const { branchId } = useParams();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    setBranch(branchId);
  }, [branchId]);

  // Fetch purchase data
  const fetchPurchaseData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/purchase/branch/${branchId}`
      );
      setProductData(response.data.data);
      setFilteredData(response.data.data); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching purchase data:", error);
    }
  };

  useEffect(() => {
    if (branch) {
      fetchPurchaseData();
    }
  }, [branch]);

  // Filter data by date and month
  useEffect(() => {
    let filtered = productData;

    if (searchDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
        return itemDate === searchDate;
      });
    }

    if (searchMonth) {
      filtered = filtered.filter((item) => {
        const itemMonth = new Date(item.createdAt).toISOString().slice(0, 7); // Format YYYY-MM
        return itemMonth === searchMonth;
      });
    }

    setFilteredData(filtered);
  }, [searchDate, searchMonth, productData]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current data to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="my-3 mx-4 d-flex flex-column gap-3">
      {/* Search Section */}
      <div className="d-flex gap-3 mb-3 justify-content-between w-100">
        <AddButton
          to={`/purchase/addPurchase/${branchId}`}
          name="Tambah Pembelian"
        />
        <div className="d-flex gap-3 justify-content-end">
          <input
            type="date"
            className="form-control"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="Cari berdasarkan tanggal"
          />
          <input
            type="month"
            className="form-control"
            value={searchMonth}
            onChange={(e) => setSearchMonth(e.target.value)}
            placeholder="Cari berdasarkan bulan"
          />
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearchDate("");
              setSearchMonth("");
              setFilteredData(productData); // Reset data
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Purchase Data Table */}
      <table className="table shadow table-bordered">
        <thead>
          <tr className="text-center fs-6">
            <th className="bg-body-secondary py-2 fw-semibold">Tanggal</th>
            <th className="bg-body-secondary py-2 fw-semibold">Nama Barang</th>
            <th className="bg-body-secondary py-2 fw-semibold">Jumlah</th>
            <th className="bg-body-secondary py-2 fw-semibold">Harga</th>
            <th className="bg-body-secondary py-2 fw-semibold">Total</th>
          </tr>
        </thead>
        <tbody id="tbody" className="text-center">
          {currentItems.length > 0 ? (
            currentItems.map((product) => (
              <tr key={product.id} className="fs-6">
                <td className="fw-medium text-secondary px-3 text-center align-middle">
                  {formatDate(product.createdAt)}
                </td>
                <td className="fw-medium text-secondary px-3 text-center align-middle">
                  {product.product.name}
                </td>
                <td className="fw-medium text-secondary px-3 text-center align-middle">
                  {product.quantity}
                </td>
                <td className="fw-medium text-secondary px-3 text-center align-middle">
                  {product.price}
                </td>
                <td className="fw-medium text-secondary px-3 text-center align-middle">
                  {product.price * product.quantity}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-3">
                Tidak ada Pembelian
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Component */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PurchaseData;
