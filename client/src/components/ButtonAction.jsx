import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import alert from "../utils/alert";

const ButtonAction = ({ entityType, id, getData, entityPath }) => {
  // Function to delete the entity (product, category, etc.)
  const deleteData = async (idEntity) => {
    try {
      // Make delete request based on the entity type
      await axios.delete(`http://localhost:2000/${entityPath}/${idEntity}`);
      getData(); // Refresh data after deletion
    } catch (error) {
      console.error(error);
    }
  };

  // Handle confirmation and deletion
  const handleDelete = (idEntity) => {
    alert.showWarningAlert(() => deleteData(idEntity));
  };

  return (
    <div className="d-flex gap-2 justify-content-center">
      {/* Edit button */}
      <NavLink
        to={`/${entityPath}/edit${
          entityType.charAt(0).toUpperCase() + entityType.slice(1)
        }/${id}`}
        className="text-bg-success border-0 px-2 rounded-1 align-items-center d-flex"
      >
        <i className="bi bi-pencil-square"></i>
      </NavLink>

      {/* Delete button */}
      <button
        className="btn btn-danger border-0 px-2 rounded-1 align-items-center d-flex"
        onClick={() => handleDelete(id)}
      >
        <i className="bi bi-trash-fill"></i>
      </button>
    </div>
  );
};

export default ButtonAction;
