import React, {useState} from "react";
import style from "./FormRegisterFormik.module.css";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../actions/index.js";

const isRequired = "is a required field";

const validationSchema = yup.object().shape({
  name: yup.string().required(`Name ${isRequired}`),
  email: yup.string().email().required(`Email ${isRequired}`),
  password: yup.string().required(`Password ${isRequired}`),
  phone: yup.string().length(12),
  repeatPass: yup.string().required(`Password confirmation ${isRequired}`).oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const initialValues={
  name: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  repeatPass: "",
}

const FormRegisterFormik = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { registerErrorMessage } = useSelector((state) => state);
 
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
            const values = formik.values;
            console.log(values);
            dispatch(createUser(values));
          }
  });

  return (
    <>
      <div className={style.container}>
        <form onSubmit={formik.handleSubmit} className={style.formContainer}>
              <h3 className={style.title}>Sign up</h3>
              <div className={style.fieldContainer}>
                <input
                  type="text"
                  name="name"
                  className={style.input}
                  placeholder="Name (*)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (
                  <p className={style.error}>{formik.errors.name}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <input
                  type="text"
                  name="address"
                  className={style.input}
                  placeholder="Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.errors.address && formik.touched.address && (
                  <p className={style.error}>{formik.errors.address}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <PhoneInput
                  name="phone"
                  country={"ar"}
                  value={formik.values.phone}
                  placeholder="+54"
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
                  type="email"
                  name="email"
                  className={style.input}
                  placeholder="E-Mail (*)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className={style.error}>{formik.errors.email}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <input
                  type="password"
                  name="password"
                  className={style.input}
                  placeholder="Password (*)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className={style.error}>{formik.errors.password}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <input
                  type="password"
                  name="repeatPass"
                  className={style.input}
                  placeholder="Repeat password (*)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.repeatPass}
                />
                {formik.errors.repeatPass && formik.touched.repeatPass && (
                  <p className={style.error}>{formik.errors.repeatPass}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <button
                  type="submit"
                  className={style.button}
                >
                  Sign up
                </button>
              </div>
              {registerErrorMessage && (
                <p className={style.error}>{registerErrorMessage}</p>
              )}
              <a className={style.link} onClick={() => navigate("/signin")}>
                You already have an account? Sign in
              </a>
        </form>
      </div>
    </>
  );
};

export default FormRegisterFormik;
