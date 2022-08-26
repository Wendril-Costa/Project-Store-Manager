const ProductsService = require('../services/productsService');

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await ProductsService.findById(id);
    if (!movie) {
      return res.status(404).send('Not Found');
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  findById,
};