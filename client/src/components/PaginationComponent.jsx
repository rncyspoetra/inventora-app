import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="d-flex justify-content-end mt-0">
      <Pagination>
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Pagination.Prev>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
