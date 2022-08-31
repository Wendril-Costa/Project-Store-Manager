const connection = require('./connection');

const getAll = async () => {
  const query = `
    SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity 
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s 
    ON sp.sale_id = s.id
    ORDER BY sale_id, product_id;`;
  const [sales] = await connection.query(query);

  if (sales.length === 0) return null;

  return sales;
};

const getById = async (id) => {
  const query = `
    SELECT s.date, sp.product_id AS productId, sp.quantity 
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s 
    ON sp.sale_id = s.id
    WHERE id = ?
    ORDER BY sale_id, product_id;`;

  const [sale] = await connection.query(query, [id]);

  if (sale.length === 0) return null;

  return sale;
};

const create = async (newSales) => {
  const queryDate = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [resultDate] = await connection.query(queryDate);

  const querySalesProducts = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES(?, ?, ?)
  `;
  
  const queryMap = await newSales.map((e) => {
    connection.query(querySalesProducts, [resultDate.insertId, e.productId, e.quantity]); 
    return { productId: e.productId, quantity: e.quantity };
  });
  
  return {
    id: resultDate.insertId,
    itemsSold: queryMap,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};