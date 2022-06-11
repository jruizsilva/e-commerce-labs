import { useSelector } from "react-redux";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";

const CategorySelect = () => {
  const { categories } = useSelector((state) => state);
  const [params, setParams] = useSearchParams();

  const updateCategory = (target) => {
    if (!target) params.delete("categoryId");
    else {
      params.set("categoryId", target.value);
    }
    setParams(params);
  };

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      minWidth: "220px",
      marginRight: "auto",
    }),
    menu: (provided, state) => ({
      ...provided,
      minWidth: "180px",
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

  const categoriesOptions = categories.map((c) => {
    return { value: c.id, label: c.name };
  });
  console.log("Soy categories options: ", categoriesOptions)

  return (
    <Select
      styles={customStyles}
      options={categoriesOptions}
      placeholder="Categorias"
      isClearable
      isSearchable={false}
      onChange={updateCategory}
    />
  );
};

export default CategorySelect;
