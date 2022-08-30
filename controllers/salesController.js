const SalesService = require('../services/salesService');

const create = async (req, res) => {
  const reqBody = req.body;

  const { newSale, code, message } = await SalesService.create(reqBody);

  if (!newSale) return res.status(code).json({ message });

  return res.status(code).json(newSale);
};

module.exports = {
  create,
};
