import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Product from "./pages/Product";
import StockProduct from "./pages/StockProduct";
import Sales from "./pages/Sales";
import Purchase from "./pages/Purchase";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AddSale from "./pages/AddSale";
import AddPurchase from "./pages/AddPurchase";
import Category from "./pages/Category";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:branchId" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/addProduct" element={<AddProduct />} />
          <Route path="/product/editProduct/:id" element={<EditProduct />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/addCategory" element={<AddCategory />} />
          <Route path="/category/editCategory/:id" element={<EditCategory />} />
          <Route path="/stock/:branchId" element={<StockProduct />} />
          <Route path="/sales/:branchId" element={<Sales />} />
          <Route path="/sales/addSale/:branchId" element={<AddSale />} />
          <Route path="/purchases/:branchId" element={<Purchase />} />
          <Route
            path="/purchase/addPurchase/:branchId"
            element={<AddPurchase />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
