import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { getMyPurchases } from "../../actions";
import style from "./MySales.module.css";

const { format } = new Intl.NumberFormat("es-ES");

export default function MySales() {
  const { user, myPurchases } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(myPurchases);

  useEffect(() => {
    dispatch(getMyPurchases(user?.id));
  }, [user, dispatch, getMyPurchases]);

  return (
    <>
      <div className={style.container}>
        <div className={style.header_container}>
          <h2 className={style.title}>My sales</h2>
          <p className={style.subtitle}>See the products you have sold</p>
          <p className={style.quantity_publications}>
            {myPurchases.length || 0} sold
          </p>
        </div>
        <div className={style.publicationsContainer}>
          <div>
            {myPurchases.length === 0 ? (
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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className={style.tbody}>
                    {myPurchases.map((p, index) => (
                      <tr key={index}>
                        <td>
                          <img src={p.image} alt="product" className="img" />
                        </td>
                        <td>
                          <span>{p.name}</span>
                          <span>
                            {format(p.orderdetail.quantity)} items purchased
                          </span>
                        </td>
                        <td>{p.users[0].name}</td>
                        <td>
                          <Link to={`/review/${p.id}`}>Agregar reseña</Link>
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
    </>
  );
}
