import { useNavigate } from "react-router-dom";
import style from "./Product.module.css";

const Product = ({ data }) => {
  const navigate = useNavigate();

  const handleRedirect = (productId) => {
    console.log("hola");
    navigate(`/details/${productId}`);
  };

  return (
    <li className={style.productItem}>
      <article className={style.productContainer}>
        <div className={style.image_container}>
          <img
            src={data.image}
            className={style.image}
            alt="product"
            onClick={() => handleRedirect(data.id)}
          />
        </div>
        <div className={style.description}>
          <h3 className={style.title}>$ {data.price}</h3>
          <p className={style.p}>{data.name}</p>
          <button className={style.btnAddCart}>Add to cart</button>
        </div>
      </article>
    </li>
  );
};

export default Product;
