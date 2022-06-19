import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import style from "./LoginFormik.module.css";
import { GoogleLogin } from "react-google-login";
import { googleAuth, loginAuth } from "../../actions/index.js";

export default function LoginFormik() {
  const { googleAuthErrorMessage, loginErrorMessage } = useSelector(
    (state) => state
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function successResponse(googleData) {
    dispatch(googleAuth(googleData));
  }
  function failResponse(resp) {
    console.log("Error", resp);
  }

  return (
    <>
      <div className={style.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(form) => {
            let err = {};
            if (!form.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
              err.email = "You have to enter a valid email";
            if (!form.email) err.email = "You have to enter an email";
            if (!form.password) err.password = "You have to enter a password";
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
              <h3 className={style.title}>Sign in</h3>
              <div className={style.fieldContainer}>
                <input
                  type="email"
                  name="email"
                  className={style.input}
                  placeholder="E-Mail"
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
                  Sign in
                </button>
                {loginErrorMessage && (
                  <p className={style.error}>{loginErrorMessage}</p>
                )}
              </div>
              <GoogleLogin
                clientId="804485400642-ql0oec6nnarp74n4keo22bq9ou539gme.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={successResponse}
                onFailure={failResponse}
                cookiePolicy={"single_host_origin"}
              />
              {googleAuthErrorMessage && (
                <p className={style.error}>{googleAuthErrorMessage}</p>
              )}
              <a className={style.link} onClick={() => navigate("/forgot-password")}>
                Forgot password?
              </a>
              <a className={style.link} onClick={() => navigate("/signup")}>
                You don't have an account already? Sign up
              </a>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
