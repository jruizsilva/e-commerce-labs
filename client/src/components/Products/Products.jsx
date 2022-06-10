import style from "./Products.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions";
import Product from "../Product/Product.jsx";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";



const Products = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state);
  
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage /*setProductsPage*/] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pagination = pageNumber => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    dispatch(getAllProducts(window.location.search));
  }, [dispatch]);

  useEffect(() => {
    if (params.toString() !== "") {
      dispatch(getAllProducts(window.location.search));
    }
  }, [params]);

  return (
    <>
    <div className={style.productsContainer}>
      {allProducts[0] &&
        allProducts.map((val) => {
          return <Product key={val.id} data={val} />;
        })}
    </div>
<Pagination
        allProducts={allProducts.length}
        pagination={pagination}
        currentPage={currentPage}
      />
</>
  );
};

export default Products;
