import React from "react";
import CreateProductModal from "../../components/CreateProductModal/CreateProductModal";
import useModal from "../../hooks/useModal";

import style from "./PublicationsPage.module.css";

const publications = [];

export default function PublicationsPage() {
  const [
    isOpenCreateProductModal,
    openCreateProductModal,
    closeCreateProductModal,
  ] = useModal();

  return (
    <>
      <div className={style.container}>
        <div className={style.header_container}>
          <h2 className={style.title}>Tus publicaciones</h2>
          <p className={style.subtitle}>Ve el estado de tus publicaciones</p>
          <p className={style.quantity_publications}>Tienes 0 publicaciones</p>
        </div>
        <div className={style.publicationsContainer}>
          {publications && publications.length === 0 && (
            <p className={style.not_publications_message}>
              No tienes publicaciones
            </p>
          )}
        </div>
      </div>
      <button
        className={style.button_add_publication_fixed}
        onClick={openCreateProductModal}
      >
        <span className="material-symbols-rounded">add</span>
      </button>
      <CreateProductModal
        isOpen={isOpenCreateProductModal}
        openModal={openCreateProductModal}
        closeModal={closeCreateProductModal}
      />
    </>
  );
}
