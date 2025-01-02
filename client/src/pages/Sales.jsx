import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../features/authSlice";
import SalesData from "../components/SalesData";

const Sales = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  const { branchId } = useParams();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout text={"Data Penjualan"}>
      <div className="d-flex justify-content-center">
        <SalesData />
      </div>
    </Layout>
  );
};

export default Sales;
