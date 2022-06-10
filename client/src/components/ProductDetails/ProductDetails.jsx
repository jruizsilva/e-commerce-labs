import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from './ProductDetails.module.css'

export default function ProductDetails() {

    let { productId } = useParams();

    console.log("Id del producto: ", productId);


    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/api/products/${productId}`) //VERIFICAR SI DEJO 3000 o 3001 !!!
        .then(r => {
            const response = r.data;
            setDetails(response[0]); // [0] así me ahorro aclarar que es la posición 0 (ya que es el único dato) en futuras ocaciones
            setLoading(false);
        })
    }, [])

    const onClickBuyProduct = (e) => {

        e.preventDefault();
        console.log("Comprar producto");
    };
    const onClickAddToCart = (e) => {

        e.preventDefault();
        console.log("Agregar al carrito");
    };

    if (loading) {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } else {
        console.log(details)
    }

    return(
        <div className={styles.body}>
            <div>

                <div className={styles.imgContainer}>
                    <img src={details.image} alt="not found" className={styles.productImg}/>
                </div>

                <div className={styles.purchaseContainer}>
                    <h1> {details.name}</h1>
                    <p><b>Stock:</b> {details.stock}</p>
                    <button onClick={onClickBuyProduct} className={styles.btnBuy}>Buy now</button>
                    <button onClick={onClickAddToCart} className={styles.btnAddToCart}>Add to cart</button>
                </div>

                <div className={styles.details}>
                    <h2>Description</h2>
                    <p><b>Model:</b> {details.model}</p>

                    <p><b>Condition:</b> {details.condition}</p>

                    <p><b>More info:</b> {details.description}</p>
                </div>


            </div>

        </div>
    )
};