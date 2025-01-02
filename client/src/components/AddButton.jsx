import React from "react";
import { NavLink } from "react-router-dom";

const AddButton = ({ to, name }) => {
  return (
    <div className="d-flex">
      <NavLink
        to={to}
        className="fw-light shadow text-decoration-none text-white py-2 px-3 bg-purple rounded-1 fw-bold"
      >
        <span className="fw-semibold">{name}</span>
      </NavLink>
    </div>
  );
};

export default AddButton;
