import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { LogOut, reset, getMe } from "../features/authSlice";
import logo from "../assets/Inventora.svg";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = useMemo(() => user?.user?.role === "admin", [user]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    const fetchBranches = async () => {
      setIsLoading(true);
      try {
        if (isAdmin) {
          const { data } = await axios.get("http://localhost:2000/branch/");
          setBranches(data.data || []);
        } else {
          setBranches(user?.user?.branch ? [user?.user?.branch] : []);
        }
      } catch {
        setBranches([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, [isAdmin, user]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const MenuItem = React.memo(({ to, icon, text }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-decoration-none hover-effect ${isActive ? "active" : ""}`
      }
    >
      <div className="d-flex gap-3 align-items-center ms-4 text-secondary p-2">
        <i className={`bi fs-5 ${icon}`}></i>
        <h4 className="fs-6 m-0">{text}</h4>
      </div>
    </NavLink>
  ));

  const AccordionItem = React.memo(({ branch, index }) => (
    <div className="accordion-item border-0 bg-transparent">
      <h2 className="accordion-header" id={`heading${index}`}>
        <button
          className="accordion-button collapsed border-0 h4 fs-6"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${index}`}
          aria-expanded="false"
          aria-controls={`collapse${index}`}
        >
          <i className="bi bi-shop me-2"></i>
          {branch.name}
        </button>
      </h2>
      <div
        id={`collapse${index}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading${index}`}
        data-bs-parent="#branchAccordion"
      >
        <div className="accordion-body">
          <MenuItem
            to={`/stock/${branch.id}`}
            icon="bi-card-checklist"
            text="Stok Produk"
          />
          <MenuItem
            to={`/sales/${branch.id}`}
            icon="bi-cart"
            text="Penjualan"
          />
          {isAdmin && (
            <MenuItem
              to={`/purchases/${branch.id}`}
              icon="bi-basket"
              text="Pembelian"
            />
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-column justify-content-between vh-100 w-25 bg-light-subtle p-3 sidebar">
      {/* Header */}
      <div className="d-flex justify-content-start flex-column">
        <div className="d-flex flex-column gap-2 my-3">
          <div className="d-flex align-items-center justify-content-center">
            <img
              src={logo}
              alt=""
              className="img-fluid"
              style={{ width: "40px", height: "40px" }}
            />
            <h5 className="bukuUsaha fw-bold m-0">Inventora</h5>
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex gap-2 align-items-center justify-content-center text-white p-1 px-4 shadow rounded-pill bg-purple">
              <i className="bi bi-person fs-5"></i>
              <h6 className="fw-medium m-0 fs-6">{user?.user?.username}</h6>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <div className="my-1">
          <div className="mb-2 gap-3">
            <p className="fs-6 fw-semibold opacity-50 mb-1">DASHBOARD</p>
            {isAdmin ? (
              <MenuItem to="/dashboard" icon="bi-fire" text="Dashboard" />
            ) : (
              <MenuItem
                to={`/dashboard/${user?.user?.branchId}`}
                icon="bi-fire"
                text="Dashboard"
              />
            )}
          </div>
          <div className="mb-2 gap-3">
            <p className="fs-6 fw-semibold opacity-50 mb-1">PRODUK</p>
            <MenuItem to="/product" icon="bi-dropbox" text="Data Produk" />
            <MenuItem to="/category" icon="bi-tags" text="Data Kategori" />
          </div>

          {/* Branch Accordion */}
          <div>
            <p className="fs-6 fw-semibold opacity-50">CABANG</p>
            {isLoading ? (
              <p className="text-center opacity-50 mt-3">Loading...</p>
            ) : (
              <div className="accordion" id="branchAccordion">
                {branches.map((branch, index) => (
                  <AccordionItem key={index} branch={branch} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="d-flex justify-content-start p-2">
        <button
          onClick={logout}
          className="d-flex gap-5 align-items-center text-secondary p-2 border border-0 bg-transparent"
        >
          <i className="bi bi-box-arrow-left fs-5"></i>
          <h4 className="fs-5 m-0">Logout</h4>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
