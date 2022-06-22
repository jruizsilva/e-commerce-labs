function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const formatUpdateInitialValues = (editProduct) => {
  return {
    name: editProduct.name,
    price: editProduct.price,
    description: editProduct.description,
    brand: editProduct.brand,
    model: editProduct.model,
    stock: editProduct.stock,
    state: {
      value: editProduct.state,
      label: capitalizeFirstLetter(editProduct.state),
    },
    condition: {
      value: editProduct.condition,
      label: capitalizeFirstLetter(editProduct.condition),
    },
    categories: editProduct.categories.map((c) => {
      return { value: c.id, label: c.name };
    }),
  };
};

module.exports = formatUpdateInitialValues;
