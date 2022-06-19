import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../../actions/index.js";
import style from './BtnAddCart.module.css';

const BtnAddCart = ({data}) => {
  const { user, cart } = useSelector((state)=>state);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(cart?.productcarts && cart.productcarts[0] && !user?.id) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])

  const onClickHandler = (productId) => {
    if (user && user.id) {
      dispatch(addProductToCart(productId, user.id));
    }else{
      //{totalValue, productCarts: [{quantity, totalValue, productId, product: {id, name, price, image, stock}}]}
      let productCart = {quantity: 1, totalValue: data.price, productId: data.id, product: data}
      dispatch({type: 'ADD_PRODUCT_STORAGE', payload: productCart});
    }
  }

  return (
    <button onClick={() => onClickHandler(data.id)}>
      Add to cart
    </button>
  )
}


export default BtnAddCart;