const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [products] = await connection.query(query);

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

const create = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [result] = await connection.query(query, [name]);

  return {
    id: result.insertId,
  };
};

const update = async ({ name, id }) => {
  const query = `
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?;`;

  await connection.query(query, [name, id]);

  return { id, name };
};

const delProduct = async ({ id }) => {
  const query = `
    DELETE FROM StoreManager.products
    WHERE id = ?;`;

  await connection.query(query, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delProduct,
};