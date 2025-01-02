import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "./AddButton";
import ButtonAction from "./ButtonAction";
import PaginationComponent from "./PaginationComponent"; // Import komponen pagination

const CategoryData = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const itemsPerPage = 5; // Jumlah item per halaman
  const { user } = useSelector((state) => state.auth);

  const isAdmin = useMemo(() => user?.user?.role === "admin", [user]);

  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:2000/category/");
      if (data?.data) {
        setCategoryData(data.data);
      } else {
        console.error("Data kategori tidak ditemukan.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter data berdasarkan query pencarian
  const filteredData = categoryData.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Data yang ditampilkan sesuai halaman saat ini dari filteredData
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="my-3 mx-4 d-flex flex-column gap-2">
      <div className="d-flex align-items-center justify-content-center">
        <div className="d-flex w-75 justify-content-between">
          {isAdmin && (
            <AddButton to="/category/addCategory/" name="Tambah Kategori" />
          )}

          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Cari kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => setSearchQuery("")}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        {/* Table Container */}
        <div className="w-100 d-flex justify-content-center">
          <table className="table shadow table-bordered w-75">
            {" "}
            {/* Adjust table width as needed */}
            <thead>
              <tr className="text-center fs-6">
                <th className="bg-body-secondary py-2 fw-semibold w-25 text-center">
                  No.
                </th>
                <th className="bg-body-secondary py-2 fw-semibold">
                  Nama Kategori
                </th>
                {isAdmin && (
                  <th className="bg-body-secondary py-2 fw-semibold">Action</th>
                )}
              </tr>
            </thead>
            <tbody id="tbody" className="text-center">
              {currentItems.length > 0 ? (
                currentItems.map((category, index) => (
                  <tr key={category.id} className="fs-6">
                    <td className="fw-medium text-secondary px-3 text-center align-middle ">
                      {index + 1}
                    </td>
                    <td className="fw-medium text-secondary px-3 text-center align-middle">
                      {category.name}
                    </td>
                    {isAdmin && (
                      <td>
                        <ButtonAction
                          entityType="category"
                          id={category.id}
                          getData={getData}
                          entityPath="category"
                        />
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-3">
                    Tidak ada kategori
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-75 d-flex justify-content-end">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryData;
