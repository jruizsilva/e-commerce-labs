import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import style from "./EditSaleModal.module.css";
import * as yup from "yup";
import Modal from "../../../components/Modal/Modal";
import {
  setSaleInitialValue,
  setSaleToEdit,
  updateSale,
} from "../../../actions";
import Spinner from "../../../components/Spinner/Spinner";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";

const isRequired = "is a required field";

const stateOptions = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "sended",
    label: "Sended",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

const validationSchema = yup.object().shape({
  state: yup.object().required(`State ${isRequired}`),
});

export default function EditSaleModal(props) {
  const dispatch = useDispatch();
  const { user, loadingUpdateProduct, editSaleInitialValue, saleToEdit } =
    useSelector((state) => state);

  console.log(saleToEdit);

  const formik = useFormik({
    initialValues: editSaleInitialValue,
    validationSchema,
    onSubmit: () => {
      const { state } = formik.values;
      const body = {
        state: state.value,
        buyerEmail: saleToEdit.buyerEmail,
      };
      dispatch(updateSale(user.id, saleToEdit.orderdetail.id, body));
    },
  });

  const handleCloseButton = () => {
    formik.resetForm();
    dispatch(setSaleToEdit(null));
    dispatch(setSaleInitialValue(null));
    props.closeModal();
  };

  return (
    <Modal {...props}>
      <div className={style.create_product_container}>
        <form onSubmit={formik.handleSubmit} className={style.formContainer}>
          <h3 className={style.title}>Update sale</h3>
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
            <button type="submit" className={style.button}>
              Update sale
            </button>
          </div>
          {loadingUpdateProduct && <Spinner />}
        </form>
        <button
          className={style.button_close}
          title="close"
          onClick={handleCloseButton}
        >
          <span className="material-symbols-rounded">close</span>
        </button>
      </div>
    </Modal>
  );
}
