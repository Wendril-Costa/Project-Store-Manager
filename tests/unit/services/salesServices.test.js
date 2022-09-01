const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const SalesService = require('../../../services/salesService');
const SalesModel = require('../../../models/salesModel');

describe('Busca por todos as vendas no BD', () => {

  describe('quando não existem vendas cadastradas', () => {
    before(async () => {
      sinon.stub(SalesModel, 'getAll')
        .resolves(null);
    });

    after(async () => {
      SalesModel.getAll.restore();
    });
    it('retorna null', async () => {
      const response = await SalesModel.getAll();
      expect(response).to.be.equal(null);
    });
  });

  describe('quando existem as vendas', () => {

    before(() => {
      sinon.stub(SalesModel, 'getAll')
        .resolves([
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:29.000Z",
            "productId": 1,
            "quantity": 2
          },
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:54.000Z",
            "productId": 2,
            "quantity": 2
          }
        ]);
    });

    after(() => {
      SalesModel.getAll.restore();
    });

    it('retorna um array de objetos', async () => {
      const response = await SalesModel.getAll();

      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await SalesModel.getAll();

      expect(response).to.be.not.empty;
    });

    it('tal primeiro objeto do array possui as propriedades: "productId", "quantity"', async () => {
      const item = await SalesModel.getById(1);

      expect(item[0]).to.include.all.keys('productId', 'quantity');
    });
  });
})

describe('Busca apenas uma venda no BD por seu ID', () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando não existe uma venda com o ID informado', () => {
    it('retorna um objeto', async () => {
      const response = await SalesService.getById();

      expect(response).to.be.an('object');
    });

    it('o objeto possui o código 404', async () => {
      const response = await SalesService.getById();

      expect(response.code).to.be.equal(404);
    });
  });

  describe('quando existe uma venda com o ID informado', () => {

    before(() => {
      sinon.stub(SalesModel, 'getById')
        .resolves(
          [
            {
              "date": "2021-09-09T04:54:29.000Z",
              "productId": 1,
              "quantity": 2
            },
            {
              "date": "2021-09-09T04:54:54.000Z",
              "productId": 2,
              "quantity": 2
            }
          ]
        );
    });

    after(() => {
      SalesModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesService.getById(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await SalesService.getById(1);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades: "code", "sale"', async () => {
      const item = await SalesService.getById(1);

      expect(item).to.include.all.keys('code', 'sale');
    });
  });
});

describe('Insere uma nova venda no BD', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadProduct = [{ productId: 1, quantity: 0 }];

    it('retorna um code', async () => {
      const response = await SalesService.create(payloadProduct);

      expect(response).to.have.a.property('code');
    });

    it('retorna uma message', async () => {
      const response = await SalesService.create(payloadProduct);

      expect(response).to.have.a.property('message');
    });

  });

  describe('quando é inserido com sucesso', () => {
    const payloadProduct = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];

    before(() => {
      sinon.stub(SalesModel, 'create')
        .resolves(payloadProduct);
    });

    after(() => {
      SalesModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesService.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedade "code" e "newSale"', async () => {
      const response = await SalesService.create(payloadProduct);

      expect(response).to.include.all.keys('code', 'newSale');
    });
  });
});