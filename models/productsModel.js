const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.query(
    'SELECT id, name FROM StoreManager.products;',
  );

  if (products.length === 0) return null;
  
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';

  const [product] = await connection.query(query, [id]);

  if (product.length === 0) return null;

  const { name } = product[0];
  const productId = Number(id);
  return {
    id: productId,
    name,
  };
};

module.exports = {
  getAll,
  getById,
};