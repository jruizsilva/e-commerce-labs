import React from "react";
import style from "./FormRegisterFormik.module.css";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import { useDispatch } from "react-redux";
import { createUser } from "../../actions/index.js";

const FormRegisterFormik = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className={style.container}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            repeatPass: "",
          }}
          validate={(form) => {
            let err = {};
            if (!form.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
              err.email = "You have to enter a valid email";
            if (form.password !== form.repeatPass)
              err.repeatPass = "Password does not match";
            // if (isNaN(form.phone)) err.phone = "El telefono debe ser un número";
            if (!form.name) err.name = "You have to enter a name";
            if (!form.email) err.email = "You have to enter an email";
            if (!form.password || !form.repeatPass)
              err.password = "You have to enter a password";
            return err;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            console.log(values);
            dispatch(createUser(values));
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
            <form className={style.formContainer} onSubmit={handleSubmit}>
              <h3 className={style.title}>Sign up</h3>
              <div className={style.fieldContainer}>
                <input
                  type="text"
                  name="name"
                  className={style.input}
                  placeholder="Name (*)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <p className={style.error}>{errors.name}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <input
                  type="text"
                  name="address"
                  className={style.input}
                  placeholder="Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                {errors.address && touched.address && (
                  <p className={style.error}>{errors.address}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <input
                  type="text"
                  name="phone"
                  className={style.input}
                  placeholder="Phone number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                {errors.phone && touched.phone && (
                  <p className={style.error}>{errors.phone}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <input
                  type="email"
                  name="email"
                  className={style.input}
                  placeholder="E-Mail (*)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <p className={style.error}>{errors.email}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <input
                  type="password"
                  name="password"
                  className={style.input}
                  placeholder="Password (*)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <p className={style.error}>{errors.password}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <input
                  type="password"
                  name="repeatPass"
                  className={style.input}
                  placeholder="Repeat password (*)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repeatPass}
                />
                {errors.repeatPass && touched.repeatPass && (
                  <p className={style.error}>{errors.repeatPass}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <button
                  type="submit"
                  className={style.button}
                  disabled={isSubmitting}
                >
                  Sign up
                </button>
              </div>
              <a className={style.link} onClick={() => navigate("/signin")}>
                You already have an account? Sign in
              </a>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormRegisterFormik;
