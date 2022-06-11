// import style from "./Pagination.module.css";
import "./Pagination.css";

const Pagination = ({ allProducts, pagination, currentPage }) => {
  const totalPages = Math.ceil(allProducts / 9);

  const prevPage = () => {
    pagination(currentPage - 1);
  };
  const nextPage = () => {
    pagination(currentPage + 1);
  };

  return (
    <>
      <div className="page_container">
        <ul className="page">
          <li className="page_btn">
            {currentPage === 1 ? (
              <button
                type="button"
                className="page_button"
                onClick={nextPage}
                disabled
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: "18px" }}
                >
                  chevron_left
                </span>
              </button>
            ) : (
              <button type="button" className="page_button" onClick={prevPage}>
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: "18px" }}
                >
                  chevron_left
                </span>
              </button>
            )}
          </li>
          <li className="page__numbers">{currentPage}</li>
          <li className="page__dots">...</li>
          <li className="page__numbers">{totalPages}</li>
          <li className="page_btn">
            {currentPage === totalPages ? (
              <button
                type="button"
                className="page_button"
                onClick={nextPage}
                disabled
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: "18px" }}
                >
                  chevron_right
                </span>
              </button>
            ) : (
              <button type="button" className="page_button" onClick={nextPage}>
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: "18px" }}
                >
                  chevron_right
                </span>
              </button>
            )}
          </li>
        </ul>
      </div>

      {/* <div className={style.paginationContainer}>
        <a
          className={style.link}
          onClick={() =>
            pagination(currentPage === 1 ? currentPage : currentPage - 1)
          }
        >
          {" "}
          Prev{" "}
        </a>
        {currentPage} de {totalPages}
        <a
          className={style.link}
          onClick={() =>
            pagination(
              currentPage === totalPages ? currentPage : currentPage + 1
            )
          }
        >
          {" "}
          Next{" "}
        </a>
      </div> */}
      {/* <div className="page_container">
        <ul className="page">
          <li className="page__btn">
            <button
              type="button"
              className="page_button"
              onClick={() =>
                pagination(currentPage === 1 ? currentPage : currentPage - 1)
              }
            >
              <span className="material-symbols-rounded">chevron_left</span>
            </button>
          </li>
          <li className="page__numbers">{currentPage}</li>
          <li className="page__dots">...</li>
          <li className="page__numbers">{totalPages}</li>
          <li className="page__btn">
            <button
              type="button"
              className="page_button"
              onClick={() =>
                pagination(
                  currentPage === totalPages ? currentPage : currentPage + 1
                )
              }
            >
              <span className="material-symbols-rounded">chevron_right</span>
            </button>
          </li>
        </ul>
      </div> */}
    </>
  );
};

export default Pagination;
