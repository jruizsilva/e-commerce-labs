import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { eliminateFromCart } from "../../actions";
import styles from './Cart.module.css';

export default function Cart() {

    let cartList = useSelector(state => state.cart);

    const [quantityToBuy, setQuantitytoBuy] = useState(1);

    const dispatch = useDispatch();

    const onClickHandler = (e, stock) => {
        if(e.target.name === '-') {
            if(quantityToBuy > 0)
            setQuantitytoBuy(quantityToBuy - 1);
        }
        if(e.target.name === '+' && quantityToBuy < stock) {
            setQuantitytoBuy(quantityToBuy + 1);
        } else if (e.target.name === '+' && quantityToBuy >= stock) {
            alert('La cantidad de productos a comprar no puede ser superior a la cantidad de stock disponible')
        }
    }

    const onChangeHandler = (e) => {
        setQuantitytoBuy(e.target.value);
    }

    const eliminateFromCartFunction = (id) => {
        dispatch(eliminateFromCart(id));
    }

    if(!cartList.length) {
        return(
            <div>
                <h2>You have not added any product to your cart yet.</h2>
            </div>
        )
    }

    return(
        <div className={styles.container}>
            <div className={styles.cartListContainer}>
                <ul>
                    {
                        cartList.map((p, i) => { //momentáneamente use i para las key pero se puede reemplazar por la id del producto
                            return(
                                <li key={i} className={styles.cartProduct} id={p.id}>
                                    <div className={styles.purchaseDetails}>
                                        <img src={p.image} 
                                        alt="img not found"
                                        className={styles.imgProduct}
                                        /> 
                                        <h2>{p.name}</h2> {/* cambiar el i de 'data-id' al id del producto */}
                                        {/* cambiar la imágen de muestra */}
                                        <h3>Price: <b>${p.price}</b></h3>
                                        <div className={styles.quantityToBuyCss}>
                                            <button onClick={e => onClickHandler(e, p.stock)} name="-">-</button>
                                            <input type="tel" 
                                            name="quantity" 
                                            id={'quantityOf' + p.id} 
                                            value={quantityToBuy} 
                                            onChange={onChangeHandler}
                                            />
                                            <button onClick={e => onClickHandler(e, p.stock)} name="+">+</button>
                                            <p>Stock available: {p.stock}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={e => eliminateFromCartFunction(p.id)}>Eliminar</button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}