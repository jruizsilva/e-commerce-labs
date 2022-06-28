function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const formatSaleUpdateInitialValue = (productToEdit) => {
  return {
    state: {
      value: productToEdit.state,
      label: capitalizeFirstLetter(productToEdit.state),
    },
  };
};

export { formatSaleUpdateInitialValue };
