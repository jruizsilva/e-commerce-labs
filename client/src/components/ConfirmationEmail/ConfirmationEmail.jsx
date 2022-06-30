import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export default function Confimation() {
  let { userId, token } = useParams();
  const navigate = useNavigate();

  // console.log("🚀 ~ file: RestorePassword.jsx ~ line 6 ~ RestorePassword ~ token", token);

  const [success, setSuccess] = useState({
    successMsg: "",
  });

  const successMessage = "Your email was confirm";

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
    navigate("/signin");
  }

  return (
    <div>
      {success.successMsg === successMessage ? (
        <div>
          <div>
            <h3>{successMessage}</h3>
          </div>
        </div>
      ) : null}
      <div>
        <form>
          <button type="submit" onClick={onsubmitHandler} id="submitBtn">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
