import style from "./Product.module.css";

const Product = ({ data }) => {

  return (
    <li className={style.productItem}>
      <article className={style.productContainer}>
        <div className={style.image_container}>
          <img src={data.image} className={style.image} alt="product" />
        </div>
        <div className={style.description}>
          <h3 className={style.title}>$ {data.price}</h3>
          <p className={style.p}>condicion</p>
          <button className={style.btnAddCart}>Agregar al carrito</button>

        </div>
      </article>
    </li>
  );
};

export default Product;
