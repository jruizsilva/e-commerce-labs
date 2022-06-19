import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart /*addOrder*/ } from '../../actions';
import { Formik } from 'formik';
import styles from './Checkout.module.css';

export default function Checkout() {
  const { cart, user } = useSelector(state => state);
  const [inputActivate, setInputActivate] = useState(false);

  const dispatch = useDispatch();

  let productsQuantity = 0;
  for (let i = 0; i < cart[0].products.length; i++) {
    productsQuantity += cart[0].products[i].cantidad;
  }

  const addOrder = values => {
    console.log(values);
  };

  const activateInput = e => {
    e.preventDefault();
    inputActivate ? setInputActivate(false) : setInputActivate(true);
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          userId: user.id,
          products: cart[0].products,
          address: user.address,
        }}
        validate={form => {
          let err = {};
          if (!form.address) {
            err.address =
              'You have to enter an address or take the previous one';
            document.getElementById('address').focus();
          }
          return err;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          addOrder(values);
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
                  <a className={styles.link} href="#/" onClick={activateInput}>
                    Previous Address
                  </a>
                </div>
              ) : (
                <div>
                  <div className={styles.address}>
                    <p>{user.address}</p>
                  </div>
                  <a className={styles.link} href="#/" onClick={activateInput}>
                    Edit Address
                  </a>
                </div>
              )}
            </div>
            <div className={styles.cartListContainer}>
              <h1 className={styles.title}>Your Products</h1>
              {cart[0].products.map(el => {
                return (
                  <div key={el.productID} className={styles.cartContainer}>
                    <div>
                      <img
                        src={el.image}
                        alt="img not found"
                        className={styles.imgProduct}
                      ></img>
                    </div>
                    <div className={styles.description}>
                      <p>{el.productName}</p>
                      <p>Cantidad: {el.cantidad}</p>
                      <p>Total: $ {el.totalProducto} </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button}disabled={isSubmitting} type="submit">
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

          <span className={styles.rigth}>{`$ ${cart[0].total}`}</span>
        </div>
         <hr className={styles.line}></hr>
        <div className={styles.detailSumaryContainer}>
          <span className={styles.left}>Total</span>
          <span className={styles.rigth}>{`$ ${cart[0].total}`}</span>
        </div>
      </div>
    </div>
  );
}
