import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import style from "./CheckoutHooks.module.css";
import createPreferenceObj from "../../helpers/createPreference";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const { format } = new Intl.NumberFormat("es-ES");
const isRequired = "is a required field";

const validationSchema = yup.object().shape({
  street_name: yup.string().required(`Street name ${isRequired}`),
  street_number: yup.number().required(`Street number ${isRequired}`),
  zip_code: yup.string().required(`Zip code ${isRequired}`),
  phone: yup.string().required(`Phone ${isRequired}`).length(12),
  country: yup.string().required(`Country ${isRequired}`),
  city: yup.string().required(`City ${isRequired}`),
});

const initialValues = {
  street_name: "",
  street_number: "",
  zip_code: "",
  phone: "",
  country: "",
  city: "",
};

export default function Checkout() {
  const { cart, user } = useSelector((state) => state);
  const [mercadopago, setMercadopago] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  console.log(cart);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      const shipping = formik.values;
      const preference = createPreferenceObj(cart, user, shipping);
      const body = { preference, shipping };
      console.log(body);
      const response = await axios.post("/api/mercadopago", body);
      setPreferenceId(response.data.preferenceId);
    },
  });

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

  return (
    <div className={style.container}>
      <div className={style.checkout_container}>
        <form onSubmit={formik.handleSubmit} className={style.form_container}>
          <div className={style.fieldContainer}>
            <input
              type="text"
              name="street_name"
              className={style.input}
              placeholder="Street name (*)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.street_name}
            />
            {formik.errors.street_name && formik.touched.street_name && (
              <p className={style.error}>{formik.errors.street_name}</p>
            )}
          </div>
          <div className={style.fieldContainer}>
            <input
              type="text"
              name="street_number"
              className={style.input}
              placeholder="Street number (*)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.street_number}
            />
            {formik.errors.street_number && formik.touched.street_number && (
              <p className={style.error}>{formik.errors.street_number}</p>
            )}
          </div>
          <div className={style.fieldContainer}>
            <input
              type="text"
              name="zip_code"
              className={style.input}
              placeholder="Zip code (*)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zip_code}
            />
            {formik.errors.zip_code && formik.touched.zip_code && (
              <p className={style.error}>{formik.errors.zip_code}</p>
            )}
          </div>
          <div className={style.fieldContainer}>
            <PhoneInput
              country={"ar"}
              value={formik.values.phone}
              onChange={(value) => {
                console.log(value);
                if (value) formik.setFieldValue("phone", value);
                else formik.setFieldValue("phone", "");
              }}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className={style.error}>{formik.errors.phone}</p>
            )}
          </div>
          <div className={style.fieldContainer}>
            <input
              type="text"
              name="country"
              className={style.input}
              placeholder="Country (*)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            />
            {formik.errors.country && formik.touched.country && (
              <p className={style.error}>{formik.errors.country}</p>
            )}
          </div>
          <div className={style.fieldContainer}>
            <input
              type="text"
              name="city"
              className={style.input}
              placeholder="City (*)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.errors.city && formik.touched.city && (
              <p className={style.error}>{formik.errors.city}</p>
            )}
          </div>
          <div className={style.buttonContainer}>
            <button className={style.button} type="submit">
              Buy
            </button>
          </div>
        </form>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody className={style.tbody}>
            {console.log(cart)}
            {cart?.productcarts?.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.product.image} alt={p.name} className="img" />
                </td>
                <td>
                  <span>{p.product.name}</span>
                  <span>{format(p.quantity)} items</span>
                </td>
                <td style={{ fontWeight: 500 }}>${format(p.product.price)}</td>
                <td style={{ fontWeight: 500 }}>${format(p.totalValue)}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td style={{ fontWeight: 500 }}>Total</td>
              <td style={{ fontWeight: 600 }}>${format(cart.totalValue)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
