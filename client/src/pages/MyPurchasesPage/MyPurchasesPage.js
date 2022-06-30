import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { getMyPurchases } from "../../actions";
import style from "./MyPurchasesPage.module.css";

const { format } = new Intl.NumberFormat("es-ES");

export default function MyPurchasesPage() {
  const { user, myPurchases } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(myPurchases);

  console.log(myPurchases);

  useEffect(() => {
    dispatch(getMyPurchases(user?.id));
  }, [user, dispatch, getMyPurchases]);

  const handleImageClick = (productId) => {
    navigate(`/details/${productId}`);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.header_container}>
          <h2 className={style.title}>My purchases</h2>
          <p className={style.subtitle}>See the products you have purchased</p>
          <p className={style.quantity_publications}>
            {myPurchases.length || 0} purchases
          </p>
        </div>
        <div className={style.publicationsContainer}>
          <div>
            {myPurchases.length === 0 ? (
              <p className={style.not_publications_message}>
                No tienes compras
              </p>
            ) : (
              <div className={style.table_wrap}>
                <table className={style.table}>
                  <thead className={style.thead}>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Seller</th>
                      <th>State</th>
                      <th>Feedback</th>
                      <th>Chat</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className={style.tbody}>
                    {myPurchases.map((p, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={p.image}
                            alt="product"
                            className={style.image}
                            onClick={() => handleImageClick(p.id)}
                          />
                        </td>
                        <td>
                          <span>{p.name}</span>
                          <span>
                            {format(p.orderdetail.quantity)} items purchased
                          </span>
                        </td>
                        <td>{p.users[0].name}</td>
                        <td>{p.orderdetail.state}</td>
                        <td>
                          {p.orderdetail.state === "completed" && (
                            <Link to={`/review/${p.id}`}>Agregar reseña</Link>
                          )}
                        </td>
                        <td>
                          <Link to={`/chat/${p.orderdetail.id}`}>
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
    </>
  );
}
