import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import style from "./CreateProductModalHooks.module.css";
import * as yup from "yup";
import Modal from "../Modal/Modal";
import { createProduct, getCategories } from "../../actions";
import Spinner from "../Spinner/Spinner";
import CustomSelect from "../CustomSelect/CustomSelect";

const isRequired = "is a required field";

const validationSchema = yup.object().shape({
  name: yup.string().required(`Name ${isRequired}`),
  price: yup.number().required(`Price ${isRequired}`),
  stock: yup.number().required(`Stock ${isRequired}`),
  condition: yup.object().required(`Condition ${isRequired}`),
  categories: yup.array().required(`Categories ${isRequired}`).min(1),
  state: yup.object().required(`State ${isRequired}`),
  image: yup.string().required(`Image ${isRequired}`),
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

const initialValues = {
  name: "",
  price: "",
  image: "",
  description: "",
  brand: "",
  model: "",
  stock: "",
  state: "",
  condition: "",
  categories: [],
};

export default function CreateProductModalHooks(props) {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const dispatch = useDispatch();
  const {
    loadingProductCreation,
    user: { id: userId },
    categories,
  } = useSelector((state) => state);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      if (!previewSource) return;
      const { categories, condition, state } = formik.values;
      const body = {
        ...formik.values,
        condition: condition.value,
        state: state.value,
        categories: categories.map((c) => c.value),
        userId,
      };
      console.log(body);
      dispatch(createProduct(body));
      formik.resetForm();
      setFileInputState("");
      setPreviewSource("");
    },
  });
  const categoriesOptions = categories.map((c) => {
    return { value: c.id, label: c.name };
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!previewSource) return;
    formik.setFieldValue("image", previewSource);
  }, [previewSource]);

  const handleFileInputChange = (e) => {
    setFileInputState(e.target.value);
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <Modal {...props}>
      <div className={style.create_product_container}>
        <form onSubmit={formik.handleSubmit} className={style.formContainer}>
          <h3 className={style.title}>Add a new product</h3>
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
              name="price"
              className={style.input}
              placeholder="Price (*)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.errors.price && formik.touched.price && (
              <p className={style.error}>{formik.errors.price}</p>
            )}
          </div>
          <div className={style.fieldContainer}>
            <input
              type="text"
              name="stock"
              className={style.input}
              placeholder="Stock (*)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stock}
            />
            {formik.errors.stock && formik.touched.stock && (
              <p className={style.error}>{formik.errors.stock}</p>
            )}
          </div>
          <div className={style.fieldContainer}>
            <CustomSelect
              onChange={(values) => {
                if (values) formik.setFieldValue("categories", values);
                else formik.setFieldValue("categories", []);
              }}
              value={formik.values.categories}
              options={categoriesOptions}
              placeholder="Categories (*)"
              isSearchable={true}
              isMulti={true}
              isClearable={true}
            />
            {formik.errors.categories && formik.touched.categories ? (
              <div className={style.error}>{formik.errors.categories}</div>
            ) : null}
          </div>
          <div className={style.fieldContainer}>
            <CustomSelect
              onChange={(value) => {
                if (value) formik.setFieldValue("condition", value);
                else formik.setFieldValue("condition", "");
              }}
              value={formik.values.condition}
              options={conditionOptions}
              placeholder="Condition (*)"
            />
            {formik.errors.condition && formik.touched.condition ? (
              <div className={style.error}>{formik.errors.condition}</div>
            ) : null}
          </div>
          <div className={style.fieldContainer}>
            <CustomSelect
              onChange={(value) => {
                if (value) formik.setFieldValue("state", value);
                else formik.setFieldValue("state", "");
              }}
              value={formik.values.state}
              options={stateOptions}
              placeholder="State (*)"
            />
            {formik.errors.state && formik.touched.state && (
              <p className={style.error}>{formik.errors.state}</p>
            )}
          </div>
          <div className={style.fieldContainer}>
            <input
              type="text"
              name="brand"
              className={style.input}
              placeholder="Brand"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.brand}
            />
            {formik.errors.brand && formik.touched.brand && (
              <p className={style.error}>{formik.errors.brand}</p>
            )}
          </div>
          {formik.values?.brand && (
            <div className={style.fieldContainer}>
              <input
                type="text"
                name="model"
                className={style.input}
                placeholder="Model"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.model}
              />
              {formik.errors.model && formik.touched.model && (
                <p className={style.error}>{formik.errors.model}</p>
              )}
            </div>
          )}
          <div className={style.fieldContainer}>
            <textarea
              name="description"
              placeholder="Description"
              className={style.textarea}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            ></textarea>
            {formik.errors.description && formik.touched.description && (
              <p className={style.error}>{formik.errors.description}</p>
            )}
          </div>
          <div className={style.fieldContainer}>
            <input
              type="file"
              name="image"
              onChange={(e) => handleFileInputChange(e)}
              value={fileInputState}
            />
            {formik.errors.image && formik.touched.image && (
              <p className={style.error}>{formik.errors.image}</p>
            )}
          </div>
          <div className={style.fieldContainer}>
            {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: "220px" }}
              />
            )}
          </div>
          <div className={style.fieldContainer}>
            <button type="submit" className={style.button}>
              Add product
            </button>
          </div>
          {loadingProductCreation && <Spinner />}
        </form>
        <button
          className={style.button_close}
          title="close"
          onClick={props.closeModal}
        >
          <span className="material-symbols-rounded">close</span>
        </button>
      </div>
    </Modal>
  );
}
