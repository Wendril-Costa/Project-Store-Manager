const bodyParser = require('body-parser');

const ProductsController = require('./controllers/productsController');
const SalesCrontroller = require('./controllers/salesController');

const app = require('./app');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.get('/products/search', ProductsController.search);
app.get('/products', ProductsController.getAll);
app.get('/products/:id', ProductsController.findById);
app.post('/products', ProductsController.create);
app.post('/sales', SalesCrontroller.create);
app.get('/sales', SalesCrontroller.getAll);
app.get('/sales/:id', SalesCrontroller.getById);
app.put('/products/:id', ProductsController.update);
app.delete('/products/:id', ProductsController.delProduct);
app.delete('/sales/:id', SalesCrontroller.delSale);
app.put('/sales/:id', SalesCrontroller.update);
