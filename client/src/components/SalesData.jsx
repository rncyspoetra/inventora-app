import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "./AddButton";
import { getMe } from "../features/authSlice";
import PaginationComponent from "./PaginationComponent";

const SalesData = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [branch, setBranch] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const { user } = useSelector((state) => state.auth);

  const isAdmin = useMemo(() => user?.user?.role === "admin", [user]);
  const { branchId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  const totalPages = Math.ceil(filteredData.length / itemsPerPage); // Calculate total pages

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    setBranch(branchId);
  }, [branchId]);

  // Fetch sales data
  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/sales/branch/${branchId}`
      );
      setProductData(response.data.data);
      setFilteredData(response.data.data); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    if (branch) {
      fetchSalesData();
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
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchDate, searchMonth, productData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Paginate the filtered data
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="my-3 mx-4 d-flex flex-column gap-3 w-75">
      <div className="d-flex gap-3 mb-3 justify-content-between w-100">
        {!isAdmin && (
          <AddButton
            to={`/sales/addSale/${branchId}`}
            name="Tambah Penjualan"
          />
        )}

        {/* Search Section */}
        <div className="d-flex gap-3 justify-content-end">
          <input
            type="date"
            className="form-control w-25"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="Cari berdasarkan tanggal"
          />
          <input
            type="month"
            className="form-control w-25"
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
              setCurrentPage(1); // Reset to first page
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Sales Data Table */}
      <table className="table shadow table-bordered">
        <thead>
          <tr className="text-center fs-6">
            <th className="bg-body-secondary py-2 fw-semibold">Tanggal</th>
            <th className="bg-body-secondary py-2 fw-semibold">Nama</th>
            <th className="bg-body-secondary py-2 fw-semibold">Jumlah</th>
            <th className="bg-body-secondary py-2 fw-semibold">Total</th>
          </tr>
        </thead>
        <tbody id="tbody" className="text-center">
          {currentData.length > 0 ? (
            currentData.map((product) => (
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
                  {product.totalAmount}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-3">
                Tidak ada Penjualan
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SalesData;
