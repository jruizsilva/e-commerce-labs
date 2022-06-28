function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const formatSaleUpdateInitialValue = (productToEdit) => {
  return {
    state: {
      value: productToEdit.orderdetail.state,
      label: capitalizeFirstLetter(productToEdit.orderdetail.state),
    },
  };
};

export { formatSaleUpdateInitialValue };
