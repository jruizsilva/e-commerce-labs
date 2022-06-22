import axios from "axios";
import { useState } from "react";
import { RESET_MESSAGES } from "../../actions/types";
import styles from "./ForgotPassword.module.css";
import { useDispatch } from "react-redux";
import {
  setRestorePasswordErrorMessage,
  setRestorePasswordSuccessMessage,
} from "../../actions";
import Spinner from "../Spinner/Spinner";

export default function ForgotPassword() {
  const [email, setEmail] = useState({
    email: "",
  });
  const [error, setError] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  function validateInputs(input) {
    let error = {
      email: "",
    };

    if (input.email === "") {
      error.email = "Email can't be empty.";
      console.log("Email vacío");
    } else if (!emailRegex.test(input.email)) {
      error.email = "Invalid email format.";
      console.log("Formato de email inválido");
    } else {
      console.log("Email válido");
      error.email = "";
    }

    return error;
  }

  function onChangeHandler(e) {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
    let errorResults = validateInputs({
      ...email,
      [e.target.name]: e.target.value,
    });
    setError(errorResults);
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    setLoading(true);

    const requirements = {
      email: email.email,
    };

    if (email.email === "") {
      dispatch(
        setRestorePasswordErrorMessage("Please introduce your email first.")
      );
      setTimeout(() => {
        dispatch({ type: RESET_MESSAGES });
      }, 3000);
    }

    if (email.email !== "" && error.email === "") {
      console.log(`Enviando información: ${email.email}`);
      try {
        const response = await axios.post("/api/forgotpassword", requirements);
        setLoading(false);
        dispatch(setRestorePasswordSuccessMessage(response.data));
        setTimeout(() => {
          dispatch({ type: RESET_MESSAGES });
        }, 3000);
        document.getElementById("submitBtn").className =
          styles.submitBtnDisabled;
        document.getElementById("submitBtn").disabled = true;
        document.getElementById("submitBtn").innerHTML = "Check your email";
      } catch (error) {
        setLoading(false);
        dispatch(setRestorePasswordErrorMessage(error.response.data));
        setTimeout(() => {
          dispatch({ type: RESET_MESSAGES });
        }, 3000);
      }
    } else if (error.email !== "") {
      dispatch(setRestorePasswordErrorMessage("Email not valid"));
      setTimeout(() => {
        dispatch({ type: RESET_MESSAGES });
      }, 3000);
    }
  }

  return (
    <div>
      <div className={styles.container}>
        <form className={styles.formContainer}>
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Introduce your email..."
            onChange={onChangeHandler}
            className={styles.emailInput}
          />

          <button
            onClick={onSubmitHandler}
            id="submitBtn"
            className={styles.submitBtn}
          >
            Send restoration email
          </button>
          {loading && <Spinner />}
        </form>
      </div>
    </div>
  );
}
