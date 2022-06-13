import { sortByValue } from "../../actions/index";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SortSelect = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.has("reset")) {
      setSelected(null);
    }
  }, [params]);

  function handleSortValue({ target: { value } }) {
    console.log(value);
    dispatch(sortByValue(value));
    document.getElementById("sortSelect").value = "sortSelected";
  }

  const handleChange = (target) => {
    setSelected(target);
    dispatch(sortByValue(target?.value));
  };

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      minWidth: "150px",
      marginLeft: "auto",
    }),
    menu: (provided, state) => ({
      ...provided,
      minWidth: "150px",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const sortOptions = [
    { value: "AZ", label: "A to Z" },
    { value: "ZA", label: "Z to A" },
    { value: "LESS", label: "Price ( - )" },
    { value: "HIGH", label: "Price ( + )" },
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
      {
        <Select
          styles={customStyles}
          options={sortOptions}
          placeholder="Sort by"
          isClearable
          onChange={handleChange}
          isSearchable={false}
          value={selected}
        />
      }
    </>
  );
};

export default SortSelect;
