const ProductsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await ProductsModel.getAll();

  if (products === null) return null;

  return products;
};

const findById = async (id) => {
  const productData = await ProductsModel
    .getById(id);

  if (!productData) return null;

  return productData;
};

module.exports = {
  getAll,
  findById,
};