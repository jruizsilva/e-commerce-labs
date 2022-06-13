const validatePriceRangeForm = (form) => {
  let { min, max } = form;
  const regex = new RegExp("^[0-9]+$");

  if (
    max !== "" &&
    min !== "" &&
    (!regex.test(Number(min)) || !regex.test(Number(max)))
  ) {
    return { success: false, msg: "Ingrese un número valido" };
  }

  if (!regex.test(Number(min)) && !regex.test(Number(max))) {
    return { success: false, msg: "Ingrese un número valido" };
  }

  if (!regex.test(Number(min)) && max === "") {
    return { success: false, msg: "Ingrese un número valido" };
  }

  if (!regex.test(Number(max)) && min === "") {
    return { success: false, msg: "Ingrese un número valido" };
  }

  if (max !== "" && min !== "" && Number(min) >= Number(max)) {
    return { success: false, msg: "Precio mínimo no valido" };
  }

  return { success: true, msg: "" };
};

module.exports = { validatePriceRangeForm };
