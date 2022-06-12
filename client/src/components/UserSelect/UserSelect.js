import Select from "react-select";

const UserSelect = ({ user }) => {
  const handleChange = (e) => {
    localStorage.removeItem("token_id");
    window.location.reload();
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
    { value: "logout", label: "Log out" },
  ];

  return (
    <Select
      styles={customStyles}
      options={categoriesOptions}
      placeholder={user && user.name}
      onChange={(e) => {
        handleChange(e);
      }}
      isSearchable={false}
    />
  );
};

export default UserSelect;
