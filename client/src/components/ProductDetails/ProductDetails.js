import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import styles from "./ProductDetails.module.css";
import Question from "../Question/Question";
import BtnAddCart from "../Cart/BtnAddCart/BtnAddCart";
import { useDispatch, useSelector } from "react-redux";
import { getProductReviews, getUserPublications } from "../../actions";
import { Rating } from "react-simple-star-rating";
import { getRatingPromedio } from "../../helpers/getRatingPromedio";

export default function ProductDetails() {
  let { productId } = useParams();
  const dispatch = useDispatch();

  const { userPublications, user, productReviews } = useSelector(
    (state) => state
  );

  const isUserPublication = userPublications?.filter(
    (el) => el.userId === user?.id
  );

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  useEffect(() => {
    if (user) {
      dispatch(getUserPublications(user?.id, ""));
      dispatch(getProductReviews(productId));
    }
  }, [dispatch, user]);
  // console.log("🚀 ~ file: ProductDetails.jsx ~ line 15 ~ ProductDetails ~ details", details)
  console.log(productReviews);
  console.log(getRatingPromedio(productReviews));

  useEffect(() => {
    axios.get(`/api/products/${productId}`).then((r) => {
      const response = r.data;
      setDetails(response[0]); // [0] así me ahorro aclarar que es la posición 0 (ya que es el único dato) en futuras ocaciones
      setLoading(false);
    });
  }, [productId]);

  const onClickBuyProduct = (e) => {
    e.preventDefault();
    console.log("Comprar producto");
  };

  if (loading) {
    return (
      <div>
        {/* <div><Header /></div> */}
        <div className={styles.spinner}>
          <Spinner />
        </div>
      </div>
    );
  } else {
    // console.log(details);
  }

  return (
    <div>
      {/* <Header /> */}
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img
              src={details?.image}
              alt="not found"
              className={styles.productImg}
            />
          </div>

          <div className={styles.purchaseContainer}>
            <div className={styles.infoProduct}>
              <div className={styles.productName}>
                <h1>{details?.name}</h1>
              </div>
              <div className={styles.productScore}>
                <h1>
                  {productReviews.length > 0 ? (
                    <>
                      <div className={styles.reviews_star_container}>
                        <Rating
                          size="32px"
                          readonly={true}
                          ratingValue={getRatingPromedio(productReviews)}
                          initialValue={getRatingPromedio(productReviews)}
                        />
                      </div>

                      <p>{productReviews.length} reviews</p>
                    </>
                  ) : (
                    "No reviews done yet"
                  )}
                </h1>
              </div>
              <div className={styles.productPrice}>
                <h1>${details?.price}</h1>
              </div>
              <div className={styles.productStock}>
                <p>
                  <b>Stock:</b> {details?.stock} left
                </p>
              </div>
            </div>
            <div className={styles.buttons}>
              <div className={styles.buyNowBtn}>
                <button onClick={onClickBuyProduct} className={styles.btnBuy}>
                  Buy now
                </button>
              </div>
              <div className={styles.addToCartBtn}>
                {/* <button
                  onClick={onClickAddToCart}
                  className={styles.btnAddToCart}
                >
                  Add to cart
                </button> */}
                <div className={styles.btnAddToCart}>
                  <BtnAddCart data={details} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <div className={styles.details}>
              <div className={styles.information}>
                <h2>Product information</h2>
              </div>
              <div className={styles.descriptionTableContainer}>
                <table className={styles.descriptionTable}>
                  <tbody>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.descriptionContainer}>
              <div className={styles.description}>
                <h2>Description</h2>
              </div>
              <div className={styles.descriptionText}>
                <p>{details.description}</p>
              </div>
            </div>

            {/* <p><b>Model:</b> {details.model}</p> por el momento no lo agrego. Posiblemente no vaya acá */}

            {/* <p><b>Condition:</b> {details.condition}</p> lo mismo que arriba */}

            {/* <div className={styles.moreInfo}>
              <p>
                <b>More info:</b> {details?.description}
              </p>
            </div> */}
          </div>
          <div className={styles.questions}>
            {!isUserPublication?.length ? (
              <p className={styles.title}>Ask the seller</p>
            ) : null}
            <Question
              productId={productId}
              productName={details?.name}
              sellerId={details.userId}
            />
          </div>
          <section className={styles.reviews_container}>
            <h3 className={styles.reviews_title}>
              Reviews about {details.name}
            </h3>
            <ul className={styles.reviews_list}>
              {productReviews.map((review) => (
                <li key={review.id} className={styles.reviews_item}>
                  <div className={styles.reviews_star_container}>
                    <Rating
                      size="22px"
                      readonly={true}
                      ratingValue={review.score}
                      initialValue={review.score}
                    />
                  </div>
                  <h4 className={styles.review_comment_title}>
                    {review.title}
                  </h4>
                  <p className={styles.reviews_comment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
