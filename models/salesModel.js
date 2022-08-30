const connection = require('./connection');

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
  create,
};