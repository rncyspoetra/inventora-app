import React, { useEffect, useState, useMemo } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from "axios";

const Item = ({ name, icon, value }) => {
  return (
    <div className="card rounded-0 flex-grow-1">
      <div className="card-body d-flex flex-row gap-4 shadow bg-light">
        <div className="bg-purple rounded-2">
          <i className={`bi ${icon} fs-1 text-white p-2`}></i>
        </div>
        <div>
          <p className="fw-semibold text-secondary m-0">{name}</p>
          <h3 className="m-0">{value}</h3>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [itemCount, setItemCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [transactionProductCount, setTransactionProductCount] = useState(0);

  const isAdmin = useMemo(() => user?.user?.role === "admin", [user]);
  const { branchId } = useParams();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil jumlah produk
        const productResponse = await axios.get(
          "http://localhost:2000/product/"
        );
        setItemCount(productResponse.data.data.length);

        // Ambil transaksi
        const today = getTodayDate();
        const url = branchId
          ? `http://localhost:2000/sales/branch/${branchId}`
          : "http://localhost:2000/sales/";

        const transactionResponse = await axios.get(url);
        const todayTransactions = transactionResponse.data.data.filter(
          (transaction) => transaction.createdAt.split("T")[0] === today
        );

        // Hitung jumlah transaksi dan total barang terjual hari ini
        setTransactionCount(todayTransactions.length);
        const totalQuantity = todayTransactions.reduce(
          (sum, transaction) => sum + transaction.quantity,
          0
        );
        setTransactionProductCount(totalQuantity);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isAdmin, branchId]);

  // Fungsi untuk mendapatkan tanggal hari ini
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };

  // Mengambil data produk dan transaksi

  return (
    <Layout text={"Dashboard"}>
      <div className="d-flex gap-3 mx-4">
        <Item name="Total Produk" icon="bi-box" value={itemCount} />
        <Item
          name="Transaksi Hari Ini"
          icon="bi-bag-check"
          value={transactionCount}
        />
        <Item
          name="Total Barang Terjual"
          icon="bi-cash"
          value={transactionProductCount}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
