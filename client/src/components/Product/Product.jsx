// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BtnAddCart from "../Cart/BtnAddCart/BtnAddCart.jsx";
// import { addProductToCart } from "../../actions";
import style from "./Product.module.css";

const Product = ({ data }) => {
  // const { user, cart } = useSelector((state)=>state);
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   if(cart?.productcarts && cart.productcarts[0] && !user?.id) localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart])

  // const onClickHandler = (productId) => {
  //   if (user && user.id) {
  //     dispatch(addProductToCart(productId, user.id));
  //   }else{
  //     //2) En el app usar useEffect -> para cada que cambie el estado cart se envie la data a (localstorage)
  //     //3) En el app usar useEffect -> cada que se monte el componente app se ponga toda la data del localstorage en el estado cart
  //     //4) Al momento del login pasar todo el storage a la DB
  //     //{totalValue, productCarts: [{quantity, totalValue, productId, product: {id, name, price, image, stock}}]}
  //     let productCart = {quantity: 1, totalValue: data.price, productId: data.id, product: data}
  //     dispatch({type: 'ADD_PRODUCT_STORAGE', payload: productCart});
  //   }
  // }

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
          {/* <button className={style.btnAddCart} onClick={() => onClickHandler(data.id)}>Add to cart</button> */}
          <div className={style.btnAddCart}>
            <BtnAddCart data={data}/>
          </div>
        </div>
      </article>
    </li>
  );
};

export default Product;
