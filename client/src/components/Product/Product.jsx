import style from "./Product.module.css";

const Product = ({ data }) => {

  return (
    <li className={style.productItem}>
      <article className={style.productContainer}>
        <img src={data.image} alt="" />
        <h3>$ {data.price}</h3>
        <label htmlFor="">condicion</label>
        <div className={style.btnAddCart}>
          <button>Add cart</button>
        </div>
      </article></li>
  );
};

export default Product;
