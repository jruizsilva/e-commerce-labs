import React, { useEffect } from "react";
import { Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import style from "./CreateProductModal.module.css";
import * as yup from "yup";
import Modal from "../Modal/Modal";
import { createProduct, getCategories } from "../../actions";
import { SelectFieldCondition } from "./SelectFieldCondition";
import { SelectFieldCategories } from "./SelectFieldCategories";
import { SelectFieldState } from "./SelectFieldState";

const isRequired = "is a required field";

export default function CreateProductModal(props) {
  const {
    user: { id: usedId },
    categories,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categoriesOptions = categories.map((c) => {
    return { value: c.id, label: c.name };
  });

  const conditionOptions = [
    {
      value: "new",
      label: "New",
    },
    {
      value: "used",
      label: "Used",
    },
  ];

  const stateOptions = [
    {
      value: "active",
      label: "Active",
    },
    {
      value: "paused",
      label: "Paused",
    },
  ];

  const validationSchema = yup.object().shape({
    name: yup.string().required(`Name ${isRequired}`),
    brand: yup.string().required(`Name ${isRequired}`),
    price: yup.number().required(`Price ${isRequired}`),
    stock: yup.number().required(`Stock ${isRequired}`),
    state: yup.string().required(`State ${isRequired}`),
    condition: yup.string().required(`Condition ${isRequired}`),
    categories: yup.array().required(`Categories ${isRequired}`).min(1),
    description: yup.string().required(`Description ${isRequired}`),
  });

  return (
    <Modal {...props}>
      <div className={style.create_product_container}>
        <Formik
          initialValues={{
            name: "",
            price: "",
            image: "https://i.ibb.co/QrL04yT/245.png",
            description: "",
            condition: "",
            brand: "",
            model: "",
            stock: "",
            score: null,
            state: "",
            categories: [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            const body = { ...values, usedId };
            console.log("/api/products/create");
            console.log(body);
            dispatch(createProduct(body));
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
              <h3 className={style.title}>Add a new product</h3>
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
                  name="price"
                  className={style.input}
                  placeholder="Price (*)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                />
                {errors.price && touched.price && (
                  <p className={style.error}>{errors.price}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <input
                  type="text"
                  name="stock"
                  className={style.input}
                  placeholder="Stock (*)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.stock}
                />
                {errors.stock && touched.stock && (
                  <p className={style.error}>{errors.stock}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <input
                  type="text"
                  name="brand"
                  className={style.input}
                  placeholder="Brand (*)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.brand}
                />
                {errors.brand && touched.brand && (
                  <p className={style.error}>{errors.brand}</p>
                )}
              </div>
              {values?.brand && (
                <div className={style.fieldContainer}>
                  <input
                    type="text"
                    name="model"
                    className={style.input}
                    placeholder="Model"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.model}
                  />
                  {errors.model && touched.model && (
                    <p className={style.error}>{errors.model}</p>
                  )}
                </div>
              )}
              <div className={style.fieldContainer}>
                <Field
                  name={"condition"}
                  component={SelectFieldCondition}
                  options={conditionOptions}
                />
                {errors.condition && touched.condition && (
                  <p className={style.error}>{errors.condition}</p>
                )}
              </div>

              <div className={style.fieldContainer}>
                <Field
                  name={"categories"}
                  component={SelectFieldCategories}
                  options={categoriesOptions}
                />
                {errors.categories && touched.categories && (
                  <p className={style.error}>{errors.categories}</p>
                )}
              </div>

              <div className={style.fieldContainer}>
                <Field
                  name={"state"}
                  component={SelectFieldState}
                  options={stateOptions}
                />
                {errors.state && touched.state && (
                  <p className={style.error}>{errors.state}</p>
                )}
              </div>

              <div className={style.fieldContainer}>
                <textarea
                  name="description"
                  placeholder="Description (*)"
                  className={style.textarea}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                ></textarea>
                {errors.description && touched.description && (
                  <p className={style.error}>{errors.description}</p>
                )}
              </div>
              <div className={style.fieldContainer}>
                <button
                  type="submit"
                  className={style.button}
                  disabled={isSubmitting}
                >
                  Add product
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
