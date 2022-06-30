import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Select from "react-select";
import {
  getMyPurchases,
  getMySales,
  setSaleInitialValue,
  setSaleToEdit,
} from "../../actions";
import { formatSaleUpdateInitialValue } from "../../helpers/formatSaleUpdateInitialValue";
import useModal from "../../hooks/useModal";
import EditSaleModal from "./EditSaleModal/EditSaleModal";
import style from "./MySales.module.css";

const { format } = new Intl.NumberFormat("es-ES");
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
const mySalesOptions = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "sended",
    label: "Sended",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

export default function MySales() {
  const {
    user,
    mySales,
    editSaleInitialValue,
    successSaleEdit,
    errorSaleEdit,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [filterState, setFilterState] = useState(null);
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const [isOpenEditSaleModal, openEditSaleModal, closeEditSaleModal] =
    useModal();

  useEffect(() => {
    dispatch(getMySales(user?.id, location.search));
  }, [
    user,
    dispatch,
    getMyPurchases,
    filterState,
    successSaleEdit,
    errorSaleEdit,
  ]);

  useEffect(() => {
    if (params.has("reset")) {
      setFilterState(null);
      setParams({});
    }
  }, [params]);

  const handleFilterChange = (target) => {
    setFilterState(target);
    if (!target) {
      params.delete("state");
    } else {
      params.set("state", target.value);
    }
    setParams(params);
  };
  const handleResetButton = (e) => {
    e.preventDefault();
    setParams({ reset: true });
    dispatch(getMySales(user?.id, location.search));
  };
  const handleEditButton = (e, product, buyerEmail) => {
    e.preventDefault();
    dispatch(setSaleToEdit({ ...product, buyerEmail }));
    dispatch(setSaleInitialValue(formatSaleUpdateInitialValue(product)));
    openEditSaleModal();
  };

  console.log(mySales)

  return (
    <>
      <div className={style.container}>
        <div className={style.header_container}>
          <h2 className={style.title}>My sales</h2>
          <p className={style.subtitle}>See the products you have sold</p>
          <p className={style.quantity_publications}>
            {mySales.length || 0} sold
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
              options={mySalesOptions}
              placeholder="Filter by"
              isClearable
              onChange={handleFilterChange}
              isSearchable={false}
              value={filterState}
            />
          </div>
          <div>
            {mySales.length === 0 ? (
              <p className={style.not_publications_message}>
                You haven't sold yet
              </p>
            ) : (
              <div className={style.table_wrap}>
                <table className={style.table}>
                  <thead className={style.thead}>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Buyer</th>
                      <th>State</th>
                      <th>Edit</th>
                      <th>Chat</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className={style.tbody}>
                    {mySales.map(({ product, buyer }, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={product.image}
                            alt="product"
                            className="img"
                          />
                        </td>
                        <td>
                          <span>{product.name}</span>
                          <span>
                            {format(product.orderdetail.quantity)} items
                            purchased
                          </span>
                          <span style={{ fontWeight: "600" }}>
                            ${format(product.orderdetail.totalprice)} price
                          </span>
                        </td>
                        <td>{buyer.name}</td>
                        <td>{product.orderdetail.state}</td>
                        <td>
                          <button
                            type="button"
                            className={style.button}
                            onClick={(e) =>
                              handleEditButton(e, product, buyer.email)
                            }
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
                        <td>
                          <Link to={`/chat/${product.orderdetail.id}`}>
                            <button className={style.btnChat}><i className="fa-brands fa-rocketchat"></i></button>
                          </Link>
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
      {editSaleInitialValue && (
        <EditSaleModal
          isOpen={isOpenEditSaleModal}
          openModal={openEditSaleModal}
          closeModal={closeEditSaleModal}
        />
      )}
    </>
  );
}
