// import FilterCategories from "../FilterCategories/FilterCategories";
// import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import FilterCondition from "../FilterCondition/FilterCondition";
import FilterPriceRange from "../FilterPriceRange/FilterPriceRange";
import FilterReset from "../FilterReset/FilterReset";
import style from "./Filter.module.css";

const Filter = () => {
  return (
    <form className={style.filterContainer}>
      {/* Filters */}
      <FilterReset />
      {/* <FilterCheckbox /> */}
      <FilterCondition />
      {/* <FilterCategories /> */}
      <FilterPriceRange />
    </form>
  );
};

export default Filter;
