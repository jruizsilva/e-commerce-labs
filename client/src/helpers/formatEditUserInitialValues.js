function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const formatEditUserInitialValues = (user) => {
  let {
    id = user.id,
    name = "",
    email = "",
    address = "",
    phone = "",
    bank_account = "",
    role = "",
  } = user;

  return {
    id,
    name,
    email,
    address,
    phone,
    bank_account: !bank_account && "",
    password: "",
    role: !role
      ? {
          value: "user",
          label: "User",
        }
      : {
          value: role,
          label: capitalizeFirstLetter(role),
        },
  };
};

export { formatEditUserInitialValues };
