import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { deleteProductCart, changeQuantityCart } from "../../actions";
import styles from './Cart.module.css';

export default function Cart() {
  const { cart, user } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!user?.id){
      if (cart?.productcarts && cart.productcarts[0]) localStorage.setItem("cart", JSON.stringify(cart))
      else localStorage.removeItem("cart");
    }
  }, [cart])

  let cartList = null;
  if(cart) {cartList = cart.productcarts}
  
  const onClickHandler = (e, stock, price, quantity, productCardId, idProduct) => {
    if (user && user.id) {
      if(e.target.name === '-') {
          if((quantity - 1) > 0) dispatch(changeQuantityCart(productCardId, price, -1, user.id));
          else alert('Cantidad minima 1');
      }
      if(e.target.name === '+') {
          if((quantity + 1) <= stock) dispatch(changeQuantityCart(productCardId, price, 1, user.id)); 
          else alert('La cantidad de productos a comprar no puede ser superior a la cantidad de stock disponible')
      }
    }else{
      if(e.target.name === '-'){
        if((quantity - 1) > 0) dispatch({type: 'UPDATE_PRODUCT_STORAGE', payload: {idProduct, price, cant: -1}});
        else alert('Cantidad minima 1');
      }
      if(e.target.name === '+') {
        if((quantity + 1) <= stock) dispatch({type: 'UPDATE_PRODUCT_STORAGE', payload: {idProduct, price, cant: 1}});
        else alert('La cantidad de productos a comprar no puede ser superior a la cantidad de stock disponible')
      }
    }
  }

  const deleteProdCart = (productCartId, productId) => {
    if (user && user.id) {
      dispatch(deleteProductCart(productCartId, user.id));
    }else{
      dispatch({type: 'DELETE_PRODUCT_STORAGE', payload: productId});
    }
  }

  if(!cartList?.length) {
    return(
      <div>
        <h2>You have not added any product to your cart yet.</h2>
      </div>
    )
  }
  return(
    <>
    <div className={styles.container}>
      <div className={styles.cartListContainer}>
        <ul>
          {
            cartList && cartList.map((p, i) => { //momentáneamente use i para las key pero se puede reemplazar por la id del producto
              return(
                <li key={i} className={styles.cartProduct} id={p.product.id}>
                  <div className={styles.purchaseDetails}>
                    <img src={p.product.image} alt="img not found" className={styles.imgProduct}/> 
                    <div>
                      <h2>{p.product.name}</h2> {/* cambiar el i de 'data-id' al id del producto */}
                      <button className={styles.bntDelete} onClick={() => deleteProdCart(p.id, p.productId)}>Eliminar</button>
                    </div>
                    <h3>Price: <b>${p.totalValue}</b></h3>
                    <div className={styles.quantityToBuyCss}>
                      <div>
                        <button onClick={e => onClickHandler(e, p.product.stock, p.product.price, p.quantity, p.id, p.productId)} name="-">-</button>
                        <input type="tel"  name="quantity" value={p.quantity} readOnly/>
                        <button onClick={e => onClickHandler(e, p.product.stock, p.product.price, p.quantity, p.id, p.productId)} name="+">+</button>
                      </div>
                      <p>Stock available: {p.product.stock}</p>
                    </div>
                  </div>
                </li>
              )
            })
          }
          <div className={styles.totalValue}>
            <h1> Total Value:  ${cart && cart.totalValue} </h1>
          </div>
          <div className={styles.checkout}>
              <button>
                {user ? 
                  <Link to="/checkout">Checkout</Link>:
                  <Link to="/signin">Checkout</Link>
                }
              </button>
          </div>
        </ul>
      </div>
    </div>
    </>
  )
}