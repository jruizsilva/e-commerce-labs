import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";

const UserSelect = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (location.pathname === "/home") {
      setSelected(null);
    }
  }, [location]);

  const handleChange = ({ value }) => {
    switch (value) {
      case "my-profile": {
        navigate(`/user/${user.id}`);
        setSelected({ value: "my-profile", label: "My profile" });
        break;
      }
      case "publications": {
        navigate("/publications");
        setSelected({ value: "publications", label: "Publications" });
        break;
      }
      case "my-purchases": {
        navigate("/my-purchases");
        setSelected({ value: "my-purchases", label: "My purchases" });
        break;
      }
      case "my-sales": {
        navigate("/my-sales");
        setSelected({ value: "my-sales", label: "My sales" });
        break;
      }
      case "logout": {
        localStorage.removeItem("token_id");
        window.location.reload();
        navigate("/signin");
        setSelected({ value: "logout", label: "Log out" });
        break;
      }
      case "admin": {
        navigate("/admin/users");
        setSelected({ value: "admin", label: "Admin" });
        break;
      }
      default:
        break;
    }
  };

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      maxWidth: "160px",
      marginRight: "auto",
    }),
    menu: (provided, state) => ({
      ...provided,
      maxWidth: "160px",
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
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    }),
  };

  const categoriesOptions = [
    // { value: "history", label: "Mis compras" },
    // { value: "favorites", label: "Favoritos" },
    // { value: "sell", label: "Vender" },
    { value: "my-profile", label: "My profile" },
    { value: "publications", label: "Publications" },
    { value: "my-purchases", label: "My purchases" },
    { value: "my-sales", label: "My sales" },
    { value: "logout", label: "Log out" },
  ];

  const adminOptions = [
    { value: "my-profile", label: "My profile" },
    { value: "publications", label: "Publications" },
    { value: "my-purchases", label: "My purchases" },
    { value: "my-sales", label: "My sales" },
    { value: "admin", label: "Admin" },
    { value: "logout", label: "Log out" },
  ];

  return (
    <Select
      styles={customStyles}
      options={user && user.role == "admin" ? adminOptions : categoriesOptions}
      placeholder={user && user.name}
      onChange={handleChange}
      isSearchable={false}
      value={selected}
    />
  );
};

export default UserSelect;
