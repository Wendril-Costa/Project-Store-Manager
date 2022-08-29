const bodyParser = require('body-parser');

const ProductsController = require('./controllers/productsController');

const app = require('./app');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
app.get('/products', ProductsController.getAll);
app.get('/products/:id', ProductsController.findById);
