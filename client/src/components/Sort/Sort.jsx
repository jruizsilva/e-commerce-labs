import style from "./Sort.module.css";
import { sortByValue } from "../../actions/index";
import { useDispatch } from "react-redux";
import Select from "react-select";

const Sort = () => {
  const dispatch = useDispatch();

  function handleSortValue({ target: { value } }) {
    console.log(value)
    dispatch(sortByValue(value));
    document.getElementById("sortSelect").value = "sortSelected";
  }

  const handleChange = (target) => {
    dispatch(sortByValue(target?.value));
  }

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: "220px",
      paddingRight: "50px",
      marginLeft: "auto",
      marginBottom: "30px",
    }),
    menu: (provided, state) => ({
      ...provided,
      width: "170px",
    }),
  };

  const sortOptions = [
    { value: "AZ", label: "A to Z" },
    { value: "ZA", label: "Z to A" },
    { value: "LESS", label: "Less price" },
    { value: "HIGH", label: "Higher price" },
  ];

  return (
    <>

      {/* <div className={style.sortContainer}>
        <label>Sort by: </label>
        <select id="sortSelect" onChange={e => handleSortValue(e)}>
          <option value="sortSelected" hidden>Sort</option>
          <option value="AZ">A to Z</option>
          <option value="ZA">Z to A</option>
          <option value="LESS">Less price</option>
          <option value="HIGH">Higher price</option>
        </select>
      </div> */}
      {<Select
        styles={customStyles}
        options={sortOptions}
        placeholder="Sort by"
        isClearable
        onChange={handleChange}
      />}
    </>
  );
};

export default Sort;
