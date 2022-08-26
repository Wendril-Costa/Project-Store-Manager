const ProductsModel = require('../models/productsModel');

const findById = async (id) => {
  const productData = await ProductsModel
    .getById(id);

  if (!productData) return null;

  return productData;
};

module.exports = {
  findById,
};