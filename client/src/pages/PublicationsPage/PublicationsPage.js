import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserPublications,
  setProductToEdit,
  setEditInitialValues,
} from "../../actions";
import CreateProductModal from "../../components/CreateProductModal/CreateProductModal";
import useModal from "../../hooks/useModal";
import Select from "react-select";
import style from "./PublicationsPage.module.css";
import { useSearchParams } from "react-router-dom";
import EditProductModal from "../../components/EditProductModal/EditProductModal";
import CreateProductModalHooks from "../../components/CreateProductModalHooks/CreateProductModalHooks";
import EditProductModalHooks from "../../components/EditProductModalHooks/EditProductModalHooks";
import formatUpdateInitialValues from "../../helpers/formatUpdateInitialValues";

const { format } = new Intl.NumberFormat("es-ES");

export default function PublicationsPage() {
  const { userPublications, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [filterState, setFilterState] = useState(null);
  const { successCreationMessage, successEditMessage, editInitialValues } =
    useSelector((state) => state);

  const [
    isOpenCreateProductModal,
    openCreateProductModal,
    closeCreateProductModal,
  ] = useModal();
  const [isOpenEditProductModal, openEditProductModal, closeEditProductModal] =
    useModal();

  useEffect(() => {
    dispatch(getUserPublications(user.id, window.location.search));
  }, []);

  useEffect(() => {
    if (successCreationMessage || successEditMessage || filterState)
      dispatch(getUserPublications(user.id, window.location.search));
  }, [user.id, successCreationMessage, successEditMessage, filterState]);

  useEffect(() => {
    if (params.has("reset")) {
      setFilterState(null);
      setParams({});
    }
  }, [params]);

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: "150px",
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: "none",
    }),
    menu: (provided, state) => ({
      ...provided,
      Width: "150px",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const publicationOptions = [
    {
      value: "active",
      label: "Active",
    },
    {
      value: "paused",
      label: "Paused",
    },
  ];

  const handleFilterChange = (target) => {
    setFilterState(target);
    if (!target) {
      params.delete("state");
    } else {
      params.set("state", target.value);
    }
    setParams(params);
  };
  const handleEditButton = (e, product) => {
    e.preventDefault();
    dispatch(setProductToEdit(product));
    dispatch(setEditInitialValues(formatUpdateInitialValues(product)));
    openEditProductModal();
  };
  const handleResetButton = (e) => {
    e.preventDefault();
    setParams({ reset: true });
    dispatch(getUserPublications(user.id, window.location.search));
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.header_container}>
          <h2 className={style.title}>Tus publicaciones</h2>
          <p className={style.subtitle}>Ve el estado de tus publicaciones</p>
          <p className={style.quantity_publications}>
            Tienes {userPublications.length || 0} publicaciones
          </p>
        </div>
        <div className={style.publicationsContainer}>
          <div className={style.publications_head}>
            <button
              type="reset"
              className={style.button}
              onClick={handleResetButton}
            >
              <span
                className="material-symbols-rounded"
                style={{ fontSize: "18px" }}
              >
                restart_alt
              </span>
            </button>
            <Select
              styles={customStyles}
              options={publicationOptions}
              placeholder="Filter by"
              isClearable
              onChange={handleFilterChange}
              isSearchable={false}
              value={filterState}
            />
          </div>
          <div>
            {userPublications && userPublications.length === 0 ? (
              <p className={style.not_publications_message}>
                No tienes publicaciones
              </p>
            ) : (
              <div className={style.table_wrap}>
                <table className={style.table}>
                  <thead className={style.thead}>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>State</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className={style.tbody}>
                    {userPublications.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <img src={p.image} alt="product" className="img" />
                        </td>
                        <td>
                          <span>{p.name}</span>
                          <span>{format(p.stock)} items left</span>
                        </td>
                        <td style={{ fontWeight: 500 }}>${format(p.price)}</td>
                        <td>{p.state}</td>
                        <td>
                          <button
                            type="reset"
                            className={style.button}
                            onClick={(e) => handleEditButton(e, p)}
                          >
                            <span
                              className="material-symbols-rounded"
                              style={{
                                fontSize: "18px",
                                color: "#fff",
                                margin: "0",
                              }}
                            >
                              edit_note
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        className={style.button_add_publication_fixed}
        onClick={openCreateProductModal}
      >
        <span className="material-symbols-rounded">add</span>
      </button>
      {/* <CreateProductModal
        isOpen={isOpenCreateProductModal}
        openModal={openCreateProductModal}
        closeModal={closeCreateProductModal}
      /> */}
      <CreateProductModalHooks
        isOpen={isOpenCreateProductModal}
        openModal={openCreateProductModal}
        closeModal={closeCreateProductModal}
      />
      {/* <EditProductModal
        isOpen={isOpenEditProductModal}
        openModal={openEditProductModal}
        closeModal={closeEditProductModal}
      /> */}
      {editInitialValues && (
        <EditProductModalHooks
          isOpen={isOpenEditProductModal}
          openModal={openEditProductModal}
          closeModal={closeEditProductModal}
        />
      )}
    </>
  );
}
