import style from "./FormRegister.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { createUser } from "../../actions/index.js";

function validateForm(form) {
  let err = {};
  if (!form.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
    err.email = "Debe ingresar un correo valido";
  if (form.password != form.repeatPass)
    err.password = "La contraseña no coincide";
  if (isNaN(form.phone)) err.phone = "El telefono debe ser un número";
  if (!form.name) err.name = "Debe ingresar un nombre";
  if (!form.email) err.email = "Debe ingresar un correo";
  if (!form.password || !form.repeatPass)
    err.password = "Debe ingresar una contraseña";
  return err;
}

const FormRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    adress: "",
    password: "",
    repeatPass: "",
  });
  const [formError, setFormError] = useState(form);
  const dispatch = useDispatch();
  useEffect(() => {
    setFormError(validateForm(form));
  }, [form]);

  function handlerChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handlerSubmit(e) {
    e.preventDefault();
    if (!Object.keys(formError)[0]) {
      dispatch(createUser(form));
    }
  }

  return (
    <form
      className={style.formRegisterUser}
      onSubmit={(e) => {
        handlerSubmit(e);
      }}
    >
      <h1>Registrarse</h1>
      <div>
        <input
          value={form.name}
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => {
            handlerChange(e);
          }}
        />
        {formError.name && <label>{formError.name}</label>}
      </div>
      <div>
        <input
          value={form.email}
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => {
            handlerChange(e);
          }}
        />
        {formError.email && <label>{formError.email}</label>}
      </div>
      <div>
        <input
          value={form.phone}
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={(e) => {
            handlerChange(e);
          }}
        />
        {formError.phone && <label>{formError.phone}</label>}
      </div>
      <div>
        <input
          value={form.adress}
          type="text"
          placeholder="Adress"
          name="adress"
          onChange={(e) => {
            handlerChange(e);
          }}
        />
      </div>
      <div>
        <input
          value={form.password}
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => {
            handlerChange(e);
          }}
        />
        {formError.password && <label>{formError.password}</label>}
      </div>
      <div>
        <input
          value={form.repeatPass}
          type="password"
          placeholder="Password"
          name="repeatPass"
          onChange={(e) => {
            handlerChange(e);
          }}
        />
      </div>
      <div className={style.btnContain}>
        <button type="submit">Registrarse</button>
      </div>
    </form>
  );
};

export default FormRegister;
