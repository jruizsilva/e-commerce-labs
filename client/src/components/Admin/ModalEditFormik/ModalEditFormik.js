import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { updateUser } from "../../../actions/index.js";
import style from "./ModalEditFormik.module.css";
import { formatEditUserInitialValues } from "../../../helpers/formatEditUserInitialValues.js";
import CustomSelect from "../../CustomSelect/CustomSelect";
import * as yup from "yup";

const isRequired = "is a required field";

const validationSchema = yup.object().shape({
  name: yup.string().required(`Name ${isRequired}`).max(254),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Required")
    .max(254),
  address: yup.string().max(254),
  phone: yup.number(),
  bank_account: yup.number().max(254),
  password: yup
    .string()
    .required(`Password ${isRequired}`)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
      "Password must be longer than 8, it must have at least one number and one capital letter."
    ),
  role: yup.object().required(`Role ${isRequired}`),
});

const rolOptions = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "Regular user",
  },
];

export default function ModalEditFormik({ show, onClose, user }) {
  const dispatch = useDispatch();
  console.log(user);

  const formik = useFormik({
    initialValues: formatEditUserInitialValues(user),
    validationSchema,
    onSubmit: () => {
      console.log(formik.values);
      dispatch(updateUser(formik.values));
    },
  });

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <h1>User edit</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className={style.modalBody}>
            <input
              className={style.inpModal}
              name="name"
              type="text"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <p className={style.error}>{formik.errors.name}</p>
            )}
            <input
              className={style.inpModal}
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <p className={style.error}>{formik.errors.email}</p>
            )}
            <input
              className={style.inpModal}
              name="address"
              type="text"
              placeholder="Address"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.address}
            />
            {formik.errors.address && formik.touched.address && (
              <p className={style.error}>{formik.errors.address}</p>
            )}
            <input
              className={style.inpModal}
              name="phone"
              type="number"
              placeholder="phone"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className={style.error}>{formik.errors.phone}</p>
            )}
            <input
              className={style.inpModal}
              name="bank_account"
              type="text"
              placeholder="bank_account"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.bank_account}
            />
            {formik.errors.bank_account && formik.touched.bank_account && (
              <p className={style.error}>{formik.errors.bank_account}</p>
            )}
            <input
              className={style.inpModal}
              name="password"
              type="text"
              placeholder="password"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <p className={style.error}>{formik.errors.password}</p>
            )}
            <CustomSelect
              onChange={(value) => {
                if (value) formik.setFieldValue("rol", value);
                else formik.setFieldValue("rol", "");
              }}
              value={formik.values.role}
              options={rolOptions}
              placeholder="Rol (*)"
            />
            {formik.errors.role && formik.touched.role && (
              <p className={style.error}>{formik.errors.role}</p>
            )}
          </div>
          <div className={style.modalFooter}>
            <button type="submit" className={style.btnSend}>
              Send
            </button>
            <button
              type="button"
              className={style.btnCancel}
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
