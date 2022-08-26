const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT id, name FROM StoreManager.products;',
  );
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManage.products WHERE id = ?';

  const [product] = await connection.execute(query, [id]);

  if (product.length === 0) return null;

  const { name } = product[0];

  return {
    id,
    name,
  };
};

module.exports = {
  getAll,
  getById,
};