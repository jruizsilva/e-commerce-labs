import style from "./Products.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions";
import Product from "../Product/Product.jsx";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllProducts(window.location.search));
  }, []);

  useEffect(() => {
    if (params.toString() !== "") {
      dispatch(getAllProducts(window.location.search));
    }
  }, [params]);

  return (
    <div className={style.productsContainer}>
      {allProducts[0] &&
        allProducts.map((val) => {
          return <Product key={val.id} data={val} />;
        })}
    </div>
  );
};

export default Products;
