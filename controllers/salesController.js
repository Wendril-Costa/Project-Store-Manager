const SalesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const { sales, code, message } = await SalesService.getAll();
  if (!sales) return res.status(code).json({ message });

  return res.status(code).json(sales);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { sale, code, message } = await SalesService.getById(id);
    if (!sale) return res.status(code).json({ message });
    
    return res.status(code).json(sale);
};

const create = async (req, res) => {
  const reqBody = req.body;

  const { newSale, code, message } = await SalesService.create(reqBody);

  if (!newSale) return res.status(code).json({ message });

  return res.status(code).json(newSale);
};

module.exports = {
  getAll,
  getById,
  create,
};
