const SalesModel = require('../models/salesModel');
const ProductsService = require('./productsService');

const isValid = async ({ productId, quantity }) => {
  const product = await ProductsService.findById(productId);
    switch (true) {
      case !productId: return {
        code: 400, message: '"productId" is required',
      };
      case quantity === undefined: return {
        code: 400, message: '"quantity" is required',
      };
      case quantity <= 0: return {
        code: 422, message: '"quantity" must be greater than or equal to 1',
      };  
      case !product: return {
        code: 404, message: 'Product not found',
      };
      default: return 'valido';  
    }
};

const getAll = async () => {
  const sales = await SalesModel.getAll();

  if (!sales) return { code: 404, message: 'Sale not found' };

  return { code: 200, sales };
};

const getById = async (id) => {
  const sale = await SalesModel.getById(id);

  if (!sale) return { code: 404, message: 'Sale not found' };

  return { code: 200, sale };
};

const create = async (newsale) => {
  const isSaleValid = await Promise.all(
    newsale.map(({ productId, quantity }) => isValid({ productId, quantity })),
  );

  const everyValid = isSaleValid.every((e) => e === 'valido');

  if (!everyValid) return isSaleValid.find((e) => e !== 'valido');

  const newSale = await SalesModel.create(newsale);
  return { code: 201, newSale };
};

module.exports = {
  getAll,
  getById,
  create,
};