import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ConfirmationEmail.module.css";

export default function Confimation() {
  let { userId, token } = useParams();
  const navigate = useNavigate();

  // console.log("🚀 ~ file: RestorePassword.jsx ~ line 6 ~ RestorePassword ~ token", token);

  const [success, setSuccess] = useState({
    successMsg: "",
  });

  const successMessage = "Your email was confirmed successfully";

  function onsubmitHandler(e) {
    e.preventDefault();

    const confirmEmail = {
      token,
      userId,
    };

    console.log("Enviando datos");
    axios.put("/api/forgotpassword/", confirmEmail);

    setSuccess({
      successMsg: successMessage,
    });
    localStorage.removeItem("token_id");
  }

  return (
    <div>
      {
        success.successMsg === successMessage ? (
          <div className={styles.container}>
            <div className={styles.msgContainer}>
              <h3>{successMessage}</h3>
            <div className={styles.goHomeBtnContainer}>
              <button 
              className={styles.goHomeBtn} 
              onClick={() => navigate("/signin")}>
                Sign in
              </button>
            </div>
            </div>
          </div>
        ) : <div className={styles.container}>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <p>
              Clic the button to confirm your registration.
            </p>
            <button className={styles.btn} type="submit" onClick={onsubmitHandler} id="submitBtn">
              Confirm
            </button>
          </form>
        </div>
      </div>
    }
    </div>
  );
}
