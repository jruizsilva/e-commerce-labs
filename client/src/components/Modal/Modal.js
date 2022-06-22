import React from "react";
import "./Modal.css";

export default function Modal({ children, isOpen }) {
  const handleModalDialogClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`modal ${isOpen && "modal_open"}`}>
      <div onClick={handleModalDialogClick} className="modal__dialog">
        {children}
      </div>
    </div>
  );
}
