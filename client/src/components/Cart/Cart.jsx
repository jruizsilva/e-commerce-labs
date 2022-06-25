import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProductCart,
  changeQuantityCart,
  updateCartErrorMessage,
} from "../../actions";

import styles from "./Cart.module.css";

export default function Cart() {
  const { cart, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      if (cart?.productcarts && cart.productcarts[0])
        localStorage.setItem("cart", JSON.stringify(cart));
      else localStorage.removeItem("cart");
    }
  }, [cart]);

  let cartList = null;
  if (cart) {
    cartList = cart.productcarts;
  }

  const onClickHandler = (
    e,
    stock,
    price,
    quantity,
    productCardId,
    idProduct
  ) => {
    if (user && user.id) {
      if (e.target.name === "-") {
        if (quantity - 1 > 0)
          dispatch(changeQuantityCart(productCardId, price, -1, user.id));
        else {
          dispatch(updateCartErrorMessage("Cannot be less than 1"));
          setTimeout(() => {
            dispatch(updateCartErrorMessage(""));
          }, 2000);
        }
      }
      if (e.target.name === "+") {
        if (quantity + 1 <= stock)
          dispatch(changeQuantityCart(productCardId, price, 1, user.id));
        else {
          dispatch(
            // "La cantidad de productos a comprar no puede ser superior a la cantidad de stock disponible"
            updateCartErrorMessage(
              "The number of products to buy cannot be more than the available stock"
            )
          );
          setTimeout(() => {
            dispatch(updateCartErrorMessage(""));
          }, 2000);
        }
      }
    } else {
      if (e.target.name === "-") {
        if (quantity - 1 > 0)
          dispatch({
            type: "UPDATE_PRODUCT_STORAGE",
            payload: { idProduct, price, cant: -1 },
          });
        else alert("Cannot be less than 1");
      }
      if (e.target.name === "+") {
        if (quantity + 1 <= stock)
          dispatch({
            type: "UPDATE_PRODUCT_STORAGE",
            payload: { idProduct, price, cant: 1 },
          });
        else
        // "La cantidad de productos a comprar no puede ser superior a la cantidad de stock disponible"
          alert(
            "The number of products to buy cannot be more than the available stock"
          );
      }
    }
  };

  const deleteProdCart = (productCartId, productId) => {
    if (user && user.id) {
      dispatch(deleteProductCart(productCartId, user.id));
    } else {
      dispatch({ type: "DELETE_PRODUCT_STORAGE", payload: productId });
    }
  };

  if (!cartList?.length) {
    return (
      <div className={styles.noProductContainer}>
        <div className={styles.noProductMessage}>
          <h2>You have not added any product to your cart yet.</h2>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.cartListContainer}>
          <ul>
            {cartList &&
              cartList.map((p, i) => {
                //momentáneamente use i para las key pero se puede reemplazar por la id del producto
                return (
                  <li key={i} className={styles.cartProduct} id={p.product.id}>
                    <div className={styles.purchaseDetails}>
                      <img
                        src={p.product.image}
                        alt="img not found"
                        className={styles.imgProduct}
                      />
                      <div>
                        <h2>{p.product.name}</h2>{" "}
                        {/* cambiar el i de 'data-id' al id del producto */}
                        <button
                          className={styles.bntDelete}
                          onClick={() => deleteProdCart(p.id, p.productId)}
                        >
                          Delete
                        </button>
                      </div>
                      <h3>
                        Price: <b>${p.totalValue}</b>
                      </h3>
                      <div className={styles.quantityToBuyCss}>
                        <div>
                          <button
                            onClick={(e) =>
                              onClickHandler(
                                e,
                                p.product.stock,
                                p.product.price,
                                p.quantity,
                                p.id,
                                p.productId
                              )
                            }
                            name="-"
                          >
                            -
                          </button>
                          <input
                            type="tel"
                            name="quantity"
                            value={p.quantity}
                            readOnly
                          />
                          <button
                            onClick={(e) =>
                              onClickHandler(
                                e,
                                p.product.stock,
                                p.product.price,
                                p.quantity,
                                p.id,
                                p.productId
                              )
                            }
                            name="+"
                          >
                            +
                          </button>
                        </div>
                        <p>Available stock: {p.product.stock}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            <div className={styles.totalValue}>
              <h1> Total Value: ${cart && cart.totalValue} </h1>
            </div>
            <div className={styles.checkout}>
                {user ? (
                <button onClick={() => navigate("/checkout")}>
                      Checkout
                </button>
                ) : (
                <button onClick={() => navigate("/signin")}>
                  {/* <Link to="/signin"> */}
                    Checkout
                    {/* </Link> */}
                </button>
                  )}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
