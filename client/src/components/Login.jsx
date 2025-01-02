import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user?.user?.role === "admin" && isSuccess) {
      navigate("/dashboard");
    } else if (user?.user?.role !== "admin" && isSuccess) {
      const branchId = user?.user?.branchId;
      navigate(`/dashboard/${branchId}`);
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };
  return (
    <div className="vw-100 vh-100 d-flex justify-content-center align-items-center bg-body">
      <form
        onSubmit={Auth}
        className="bg-primary bg-white w-25 border border-1 rounded-3 p-4 shadow-lg"
      >
        <div className="d-flex align-items-center justify-content-center">
          <img
            src="../public/assets/Inventora.svg"
            alt=""
            className="img-fluid"
            style={{ width: "60px", height: "60px" }}
          />
          <h5 className="bukuUsaha fw-bold m-0">Inventora</h5>
        </div>

        {isError && <p className="text-danger">{message}</p>}
        <hr className="w-100" />
        <div className="input-group mb-3 d-flex flex-column">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label fw-regular"
          >
            Username
          </label>
          <input
            type="text"
            className="form-control w-100 border border-2 rounded-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username..."
          />
        </div>

        <div className="input-group mb-3 d-flex flex-column">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label fw-regular"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control w-100 border border-2 rounded-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
