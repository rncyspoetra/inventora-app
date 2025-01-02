import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "./AddButton";
import ButtonAction from "./ButtonAction";
import PaginationComponent from "./PaginationComponent"; // Import komponen pagination

const ProductData = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const itemsPerPage = 5; // Jumlah item per halaman
  const { user } = useSelector((state) => state.auth);

  const isAdmin = useMemo(() => user?.user?.role === "admin", [user]);

  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:2000/product/");
      setProductData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter data berdasarkan query pencarian
  const filteredData = productData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="d-flex justify-content-between">
        {isAdmin && (
          <AddButton to="/product/addProduct/" name="Tambah Produk" />
        )}

        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Cari produk..."
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

      <table className="table shadow table-bordered">
        <thead>
          <tr className="text-center fs-6">
            <th className="bg-body-secondary py-2 fw-semibold">Nama Barang</th>
            <th className="bg-body-secondary py-2 fw-semibold">
              Harga Beli (Rp)
            </th>
            <th className="bg-body-secondary py-2 fw-semibold">
              Harga Jual (Rp)
            </th>
            <th className="bg-body-secondary py-2 fw-semibold">Kategori</th>
            {isAdmin && (
              <th className="bg-body-secondary py-2 fw-semibold">Action</th>
            )}
          </tr>
        </thead>
        <tbody id="tbody" className="text-center">
          {currentItems.length > 0 ? (
            currentItems.map((product) => (
              <tr key={product.id} className="fs-6">
                <td className="fw-medium text-secondary px-3 text-start align-middle">
                  {product.name}
                </td>
                <td className="fw-medium text-secondary text-center align-middle">
                  {product.buyPrice}
                </td>
                <td className="fw-medium text-secondary text-center align-middle">
                  {product.sellPrice}
                </td>
                <td className="fw-medium text-secondary text-center align-middle">
                  {product.category.name}
                </td>
                {isAdmin && (
                  <td>
                    <ButtonAction
                      entityType="product"
                      id={product.id}
                      getData={getData}
                      entityPath="product"
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-3">
                Tidak ada produk
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductData;
