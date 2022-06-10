import style from './Products.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../actions';
import Product from '../Product/Product.jsx';
import Pagination from '../Pagination/Pagination';

const Products = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector(state => state);

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
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className={style.productsContainer}>
        {currentProducts[0] &&
          currentProducts.map(val => {
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
