const ProductsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await ProductsService.getAll();
  if (products === null) return res.status(404).send('Not Found');

  return res.status(200).json(products);
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  const { product, code, message } = await ProductsService.create({ name });

  if (!product) return res.status(code).json({ message });
  
  return res.status(code).json(product);
};

module.exports = {
  getAll,
  findById,
  create,
};