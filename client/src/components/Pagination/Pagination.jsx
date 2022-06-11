import style from './Pagination.module.css';

const Pagination = ({ allProducts, pagination, currentPage }) => {
  const totalPages = Math.ceil(allProducts / 9);

  console.log("cantidad productos: ", allProducts)
  console.log("currentPage:", currentPage)
  console.log("totalPages", totalPages)

  return (
    <div className={style.paginationContainer}>
      <a onClick={() =>
          pagination(currentPage === 1 ? currentPage : currentPage - 1)
        }
      > Prev </a>
      {currentPage} de {totalPages}
      <a onClick={() =>
          pagination(currentPage === totalPages ? currentPage : currentPage + 1)
        }
      > Next </a>
    </div>
  );
};

export default Pagination;
