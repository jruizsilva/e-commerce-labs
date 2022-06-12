import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import style from "./LoginFormik.module.css";
import { GoogleLogin } from "react-google-login";
import { googleAuth, loginAuth } from "../../actions/index.js";

export default function LoginFormik() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function successResponse(googleData) {
    dispatch(googleAuth(googleData));
  }
  function failResponse(resp) {
    console.log("Error");
  }

  return (
    <>
      <div className={style.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(form) => {
            let err = {};
            if (!form.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
              err.email = "Debe ingresar un correo valido";
            if (!form.email) err.email = "Debe ingresar un correo";
            if (!form.password) err.password = "Debe ingresar una contraseña";
            return err;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            // console.log(values);
            dispatch(loginAuth(values));
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
              <h3 className={style.title}>Inicia sesión</h3>
              <div className={style.fieldContainer}>
                <input
                  type="email"
                  name="email"
                  className={style.input}
                  placeholder="Correo"
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
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <p className={style.error}>{errors.password}</p>
                )}
              </div>
              <div className={style.buttonContainer}>
                <button
                  type="submit"
                  className={style.button}
                  disabled={isSubmitting}
                >
                  Iniciar Sesión
                </button>
              </div>
              <GoogleLogin
                clientId="804485400642-ql0oec6nnarp74n4keo22bq9ou539gme.apps.googleusercontent.com"
                buttonText="Inicia Sesión con Google"
                onSuccess={successResponse}
                onFailure={failResponse}
                cookiePolicy={"single_host_origin"}
              />
              <a className={style.link} onClick={() => navigate("/register")}>
                ¿Aún no tienes cuenta? Regístrate
              </a>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
