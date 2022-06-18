import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPublications } from "../../actions";
import CreateProductModal from "../../components/CreateProductModal/CreateProductModal";
import useModal from "../../hooks/useModal";

import style from "./PublicationsPage.module.css";

const publications = [];

export default function PublicationsPage() {
  const { userPublications, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [
    isOpenCreateProductModal,
    openCreateProductModal,
    closeCreateProductModal,
  ] = useModal();

  useEffect(() => {
    dispatch(getUserPublications(user.id));
  }, []);

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
