import axios from "axios";
import { useEffect, useState } from "react";
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
            <div className={styles.container}>

                <div className={styles.imgContainer}>
                    <img src={details.image} alt="not found" className={styles.productImg}/>
                </div>

                <div className={styles.purchaseContainer}>
                    <div className={styles.infoProduct}>
                        <div className={styles.productName}>
                            <h1>{details.name}</h1>
                        </div>
                        <div className={styles.productScore}>
                            <h1>Score: {(details.score)? details.score : "No reviews done yet"}</h1>
                        </div>
                        <div className={styles.productPrice}>
                            <h1>${details.price}</h1>
                        </div>
                        <div className={styles.productStock}>
                            <p><b>Stock:</b> {details.stock} left</p>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.buyNowBtn}>
                            <button onClick={onClickBuyProduct} className={styles.btnBuy}>Buy now</button>
                        </div>
                        <div className={styles.addToCartBtn}>
                            <button onClick={onClickAddToCart} className={styles.btnAddToCart}>Add to cart</button>
                        </div>
                    </div>

                </div>

                <div className={styles.details}>
                    <div className={styles.information}>
                        <h2>Product information</h2>
                    </div>
                    <div className={styles.descriptionTableContainer}>
                        <table className={styles.descriptionTable}>
                            <tbody>
                                <tr>
                                    <th>asd</th>
                                    <th>asd</th>
                                </tr>
                                <tr>
                                    <td>NO SÉ CÓMO CENTRARME :( </td>
                                    <td>NO SÉ CÓMO CENTRARME :( </td>
                                </tr>
                                <tr>
                                    <th>asd</th>
                                    <th>asd</th>
                                </tr>
                                <tr>
                                    <td>NO SÉ CÓMO CENTRARME :( </td>
                                    <td>NO SÉ CÓMO CENTRARME :( </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.description}>
                        <h2>Description</h2>
                    </div>
                    <div className={styles.descriptionText}>
                        <p>*Acá iría la descripción...si hubiera una*</p>
                    </div>

                    {/* <p><b>Model:</b> {details.model}</p> por el momento no lo agrego. Posiblemente no vaya acá */}

                    {/* <p><b>Condition:</b> {details.condition}</p> lo mismo que arriba */}

                    <div className={styles.moreInfo}>
                        <p><b>More info:</b> {details.description}</p>
                    </div>
                </div>
            </div>

        </div>
    )
};