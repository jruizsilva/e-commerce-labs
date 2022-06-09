import style from './Pagination.module.css';

const Pagination = ({ allProducts, pagination, currentPage }) => {
  const totalPages = Math.ceil(allProducts / 9);

  return (
    <div className={style.paginationContainer}>
      <a
        onClick={() =>
          pagination(currentPage === 1 ? currentPage : currentPage - 1)
        }
      >
        Prev
      </a>
      {currentPage} de {totalPages}
      <a
        onClick={() =>
          pagination(currentPage === totalPages ? currentPage : currentPage + 1)
        }
      >
        Next
      </a>
    </div>
  );
  /*
  return (
    <>
      <nav>
        <ul>
          {pageNumber &&
            pageNumber.map(number => (
              <li key={number} className={style.paginado}>
                <Link to="#" onClick={() => paginado(number)}>
                  {number}{' '}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );*/
};

export default Pagination;
