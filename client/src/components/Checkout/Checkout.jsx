import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import styles from "./Checkout.module.css";
import createPreferenceObj from "../../helpers/createPreference";
import axios from "axios";

export default function Checkout() {
  const { cart, user } = useSelector((state) => state);
  const [mercadopago, setMercadopago] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);

  console.log(preferenceId);
  console.log(mercadopago);

  const [inputActivate, setInputActivate] = useState(false);

  let productsQuantity = 0;
  if (cart?.productcarts) {
    for (let i = 0; i < cart.productcarts.length; i++) {
      productsQuantity += cart.productcarts[i].quantity;
    }
  }

  const activateInput = (e) => {
    e.preventDefault();
    inputActivate ? setInputActivate(false) : setInputActivate(true);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";

    script.addEventListener("load", () => {
      const mp = new window.MercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY, {
        locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
      });

      setMercadopago(mp);
    });

    document.body.appendChild(script);
    if (preferenceId) {
      mercadopago.checkout({
        preference: {
          id: preferenceId,
        },
        autoOpen: true, // Habilita la apertura automática del Checkout Pro
      });
    }
  }, [preferenceId]);

  if (user) {
    return (
      <div className={styles.container}>
        <Formik
          initialValues={{
            userId: user.id,
            products: cart.productcarts,
            address: user.address,
          }}
          // validate={(form) => {
          //   let err = {};
          //   if (!form.address) {
          //     err.address =
          //       "You have to enter an address or take the previous one";
          //     document.getElementById("address")?.focus();
          //   }
          //   return err;
          // }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            const preference = createPreferenceObj(cart, user);
            console.log(preference);
            const response = await axios.post("/api/mercadopago", preference);
            console.log(response);
            console.log(response.data);
            setPreferenceId(response.data.preferenceId);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.addressContainer}>
                <div className={styles.title}>
                  <h1>Your address is:</h1>
                </div>
                {inputActivate ? (
                  <div>
                    <input
                      className={styles.input}
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Your address..."
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="off"
                    />
                    {errors.address && touched.address && (
                      <p className={styles.error}>{errors.address}</p>
                    )}
                    <a
                      className={styles.link}
                      href="#/"
                      onClick={activateInput}
                    >
                      Previous Address
                    </a>
                  </div>
                ) : (
                  <div>
                    <div className={styles.address}>
                      <p>{user.address}</p>
                    </div>
                    <a
                      className={styles.link}
                      href="#/"
                      onClick={activateInput}
                    >
                      Edit Address
                    </a>
                  </div>
                )}
              </div>
              <div className={styles.cartListContainer}>
                <h1 className={styles.title}>Your Products</h1>
                {cart.productcarts?.map((el) => {
                  return (
                    <div key={el.productId} className={styles.cartContainer}>
                      <div>
                        <img
                          src={el.product.image}
                          alt="img not found"
                          className={styles.imgProduct}
                        ></img>
                      </div>
                      <div className={styles.description}>
                        <p>{el.product.name}</p>
                        <p>Cantidad: {el.quantity}</p>
                        <p>Total: $ {el.totalValue} </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.button}
                  disabled={isSubmitting}
                  type="submit"
                >
                  Buy
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className={styles.summary}>
          <h1>Purchase summary</h1>
          <hr className={styles.line}></hr>
          <div className={styles.detailSumaryContainer}>
            <span className={styles.left}>
              Products {`(${productsQuantity})`}
            </span>

            <span className={styles.rigth}>{`$ ${cart.totalValue}`}</span>
          </div>
          <hr className={styles.line}></hr>
          <div className={styles.detailSumaryContainer}>
            <span className={styles.left}>Total</span>
            <span className={styles.rigth}>{`$ ${cart.totalValue}`}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
