import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../actions";
import style from "./Product.module.css";

const Product = ({ data }) => {

  const dispatch = useDispatch();

  const onClickHandler = (id) => {
    dispatch(addToCart(id));
    localStorage.setItem(
      'localCart', JSON.stringify(data)
    )
  }

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
          <button className={style.btnAddCart} onClick={() => onClickHandler(data.id)}>Add to cart</button>
        </div>
      </article>
    </li>
  );
};

export default Product;
