const { Product, Category, Question, Answer, User} = require('../models/index.js')
// Me traigo el operador de sequelize 
const {Op} = require('sequelize')
const fs = require('fs-extra')
const {uploadImage, deleteImage} = require('../utils/cloudinary/cloudinary.js') 


//      ---- GET DE PRODUCTOS -----

const getProductsByName = async (req, res, next) => {
  console.log(req.query);
  const { name } = req.query;
  console.log(name);
  try {
    // Se fija si hay un nombre y si lo hay trae solo el que coincida con su nombre
    if (name) {
      if (!name) return res.sendStatus(404);
      const product = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        include: { model: Category },
      });
      return res.json(product);
    }
    /*  // Si no hay un nombre trae todos los productos
        else{
            const products = await Product.findAll({include: [{model: Category}]});
            if(products) res.status(200).json(products);
        } */
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  const { condition, sort, min_price, max_price, state, name, categoryId } =
    req.query;
  try {
    let where = { state: "active" };
    let order;
    if (condition) where.condition = condition;
    if (state) where.state = state;
    // if (travel_cost) where.travel_cost = travel_cost;
    if (min_price || max_price) {
      if (min_price && max_price) {
        where.price = {
          [Op.between]: [min_price, max_price],
        };
      }
      if (min_price && !max_price) {
        where.price = {
          [Op.gte]: min_price,
        };
      }
      if (!min_price && max_price) {
        where.price = {
          [Op.lte]: max_price,
        };
      }
    }

    if (sort === "higher_price") order = [["price", "DESC"]];
    if (sort === "lower_price") order = [["price", "ASC"]];

    // devuelve todos los productos que contenga la categoria con el id enviado
    // busca producto por el nombre que se ingreso en el search anteriormente
    let include = [{ model: Category }];
    if (categoryId) include[0].where = { id: categoryId };
    if (name) where.name = { [Op.iLike]: "%" + name + "%" };
    // ------------------------------------------------------------------------

    const products = await Product.findAll({
      include,
      where,
      order,
    });
    if (products) res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductsById = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.findAll({
      include: [
        {
          model: Category,
          model: Question,
          //  model: Answer, // error: answer is not asociated to Question!
        },
      ],
      where: {
        id: productId,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// -- Creacion de Producto --
const createProducts = async (req, res, next) => {
  // name price image description condition brand model stock score state
  console.log(req.body)
  const {
    name,   
    price, 
    description, 
    condition, 
    brand, 
    model, 
    stock, 
    score, 
    state, 
    categories,
    userId,
    category_id
  } = req.body
  //console.log(req.files.image)

  if(req.files?.image){
    const result = await uploadImage(req.files.image.tempFilePath)
    await fs.unlink(req.files.image.tempFilePath)
    const product = await Product.create({
      name,
      price,
      image: result.secure_url,
      public_id: result.public_id,
      description,
      condition,
      brand,
      model,
      stock,
      score,
      state,
      userId,
      category_id
    })
   //const verFuncionesDisponibles = product.__proto__;
  // console.log(verFuncionesDisponibles);

 
  const categoriesDb = await Category.findAll(
    { where: { name: categories } 
  })
    await product.addCategory(categoriesDb)
    return res.json(product.toJSON())
  }else{
    res.json({message: "Ingresa una imagen"})
  }
  //await categoriesDb.map(c => console.log(c.toJSON()))
}

// Delete product
const deleteProduct = async (req, res, next) => {
  const {id} = req.params
  const product = await Product.findByPk(id)
  await deleteImage(product.public_id)
  await Product.destroy({
    where: {
        id,
    },
  });
  res.json({message: 'Product eliminado'})
}
// Update product
const updateProduct = async (req, res, next) => {
  const {id } = req.params
  const product = req.body
  console.log(product)
  console.log(id)
  const productUpdate = await Product.update(product, {
    where: {
      id: id
    }
  })
  return res.json({message: "Product Updated", productUpdate})
}

module.exports = {
    getProducts,
    getProductsById,
    getProductsByName,
    createProducts,
    deleteProduct,
    updateProduct
}

  


