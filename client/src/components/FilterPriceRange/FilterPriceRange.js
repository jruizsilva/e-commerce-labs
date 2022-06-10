import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { validatePriceRangeForm } from "../../helpers/form-validations";

import style from "./FilterPriceRange.module.css";

const initialValidationValues = { success: false, msg: "" };
const initialFormValues = { min: "", max: "" };

export default function FilterPriceRange() {
  const [params, setParams] = useSearchParams();
  const [form, setForm] = useState(initialFormValues);
  const [validation, setValidation] = useState(initialValidationValues);

  const updatePriceRange = (e) => {
    const type = e.target.name;
    if (type === "price_range") {
      const [min, max] = e.target.value.split(",");
      params.set("min_price", min);
      params.set("max_price", max);
    }
    if (type === "min_price") {
      params.delete("max_price");
      params.set("min_price", e.target.value);
    }
    if (type === "max_price") {
      params.set("max_price", e.target.value);
    }

    setParams(params);
  };
  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const { min, max } = form;
    if (min !== "" || max !== "") {
      const { success, msg } = validatePriceRangeForm(form);
      setTimeout(() => {
        setValidation({ success, msg });
      }, 500);
    }
  }, [form]);

  useEffect(() => {
    if (params.toString().includes("reset=true")) {
      setForm(initialFormValues);
      setParams({});
    }
  }, [params]);

  const handleFilterButton = (e) => {
    e.preventDefault();
    const { min, max } = form;
    if (min === "") {
      params.delete("min_price", form.max);
      params.set("max_price", form.max);
    }
    if (max === "") {
      params.delete("max_price", form.max);
      params.set("min_price", form.min);
    }
    if (max !== "" && min !== "") {
      params.set("min_price", form.min);
      params.set("max_price", form.max);
    }
    setParams(params);
  };

  return (
    <div className={style.container}>
      <h4 className={style.title}>Precio</h4>
      <button
        type="button"
        className={style.link}
        onClick={updatePriceRange}
        name="max_price"
        value="10000"
      >
        Hasta $10.000
      </button>
      <br />
      <button
        type="button"
        className={style.link}
        onClick={updatePriceRange}
        name="price_range"
        value="10000,30000"
      >
        $10.000 a $30.000
      </button>
      <button
        type="button"
        className={style.link}
        onClick={updatePriceRange}
        name="min_price"
        value="30000"
      >
        Más de $30.000
      </button>
      <input
        placeholder="Mínimo"
        onChange={updateForm}
        name="min"
        value={form.min}
        pattern="^[0-9]+$"
        style={{ maxWidth: "100%" }}
      />
      <input
        placeholder="Máximo"
        onChange={updateForm}
        name="max"
        value={form.max}
        pattern="^[0-9]+$"
        style={{ maxWidth: "100%" }}
      />
      {validation.msg && <p style={{ fontSize: "14px" }}>{validation.msg}</p>}
      {validation.success ? (
        <button onClick={handleFilterButton}>Enviar</button>
      ) : (
        <button disabled>Enviar</button>
      )}
    </div>
  );
}
