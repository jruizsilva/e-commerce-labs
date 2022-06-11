import Select from "react-select";

const UserSelect = () => {
  const handleChange = (target) => {
    console.log(target);
  };

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: "160px",
      marginRight: "auto",
    }),
    menu: (provided, state) => ({
      ...provided,
      width: "160px",
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
    // { value: "profile", label: "Mi perfil" },
    // { value: "history", label: "Mis compras" },
    // { value: "favorites", label: "Favoritos" },
    // { value: "sell", label: "Vender" },
    { value: "logout", label: "Cerrar sesión" },
  ];

  return (
    <Select
      styles={customStyles}
      options={categoriesOptions}
      placeholder="User"
      onChange={handleChange}
      isSearchable={false}
    />
  );
};

export default UserSelect;
