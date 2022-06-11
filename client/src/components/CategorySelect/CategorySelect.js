import Select from "react-select";

const CategorySelect = () => {
  const handleChange = (target) => {
    console.log(target);
  };

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      minWidth: "180px",
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

  const categoriesOptions = [
    { value: "hogar", label: "Hogar" },
    { value: "tecnologia", label: "Tecnologia" },
    { value: "deporte", label: "Vehículos" },
    { value: "inmuebles", label: "Inmuebles" },
  ];

  return (
    <Select
      styles={customStyles}
      options={categoriesOptions}
      placeholder="Categorias"
      isClearable
      onChange={handleChange}
    />
  );
};

export default CategorySelect;
