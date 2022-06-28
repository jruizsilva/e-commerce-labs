import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import style from "./ReviewPage.module.css";
import Spinner from "../../components/Spinner/Spinner";
import { Rating } from "react-simple-star-rating";
import { fetchAddReview } from "../../actions";

const isRequired = "is a required field";

const initialValues = {
  score: null,
  comment: "",
};
const validationSchema = yup.object().shape({
  score: yup.number().required(`Score ${isRequired}`),
  comment: yup.string().required(`Comment ${isRequired}`).max(254),
});

export default function ReviewPage() {
  const { user } = useSelector((state) => state);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      console.log(formik.values);
      dispatch(fetchAddReview(user.id, product.id, formik.values));
    },
  });

  useEffect(() => {
    axios.get(`/api/products/product/${productId}`).then((res) => {
      setProduct(res.data[0]);
    });
  }, [productId]);

  const handleImageClick = () => {
    navigate(`/details/${productId}`);
  };

  return (
    <>
      {!product ? (
        <Spinner />
      ) : (
        <div className={style.container}>
          <form className={style.form} onSubmit={formik.handleSubmit}>
            <section className={style.review_container}>
              <div className={style.review_description}>
                <h2 className={style.review_title}>
                  What did you think of your product?
                </h2>
                <p className={style.review_product_name}>{product.name}</p>
                <Rating
                  transition
                  onClick={(value) => {
                    console.log(value);
                    if (value) formik.setFieldValue("score", value);
                    else formik.setFieldValue("score", null);
                  }}
                  ratingValue={formik.values.score}
                  initialValue={formik.values.score}
                />
                {formik.errors.score && formik.touched.score && (
                  <p className={style.error}>{formik.errors.score}</p>
                )}
              </div>
              <div className={style.product_image_container}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={style.image}
                  onClick={handleImageClick}
                />
              </div>
            </section>
            <section className={style.comment_container}>
              <h3 className={style.comment_title}>
                Tell other people about your product
              </h3>
              <div className={style.field_container}>
                <textarea
                  name="comment"
                  className={style.form_textarea}
                  placeholder="Write your opinion of the product..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.comment}
                ></textarea>
                {formik.errors.comment && formik.touched.comment && (
                  <p className={style.error}>{formik.errors.comment}</p>
                )}
              </div>
              <button type="submit" className={style.form_submit}>
                Enviar
              </button>
            </section>
          </form>
        </div>
      )}
    </>
  );
}
