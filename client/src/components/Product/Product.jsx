import { Link } from "react-router-dom";
import style from "./Product.module.css";

const Product = ({ data }) => {
  return (
    <li className={style.productItem}>
      <article className={style.productContainer}>
        <Link
          to={`/details/${data.id}`}
          className={style.image_container}
          title={data.name}
        >
          <img src={data.image} className={style.image} alt={`${data.name}`} />
        </Link>
        <div className={style.description}>
          <h3 className={style.title}>$ {data.price}</h3>
          <p className={style.p}>{data.name}</p>
          <button className={style.btnAddCart}>Agregar al carrito</button>
        </div>
      </article>
    </li>
  );
};

export default Product;
