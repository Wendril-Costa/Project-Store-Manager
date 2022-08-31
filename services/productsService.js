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

const isValid = (name) => {
  switch (true) {
    case name === undefined: return {
      code: 400,
      message: '"name" is required',
    };
    case name.length < 5: return {
      code: 422,
      message: '"name" length must be at least 5 characters long',
    };
    default: return {};
  }
};

const create = async ({ name }) => {
  const isProductValid = isValid(name);
  if (isProductValid.message) return isProductValid;

  const { id } = await ProductsModel.create({ name });
  const product = { id, name };

  return { code: 201, product };
};

const update = async ({ name, id }) => {
  const upProductValid = isValid(name);
  if (upProductValid.message) return upProductValid;
  const productId = await findById(id);
  const upProduct = await ProductsModel.update({ name, id });

  if (!upProduct || !productId) return { code: 404, message: 'Product not found' };

  return { code: 200, upProduct };
};

const delProduct = async ({ id }) => {
  const productId = await findById(id);
  await ProductsModel.delProduct({ id });

  if (!productId) return { code: 404, message: 'Product not found' };

  return { code: 204 };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  delProduct,
};