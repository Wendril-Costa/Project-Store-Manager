const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Busca por todas as vendas no BD', () => {

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

  describe('quando existe as vendas', () => {

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

    it('retorna um array de objeto', async () => {
      const response = await SalesModel.getAll();

      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await SalesModel.getAll();

      expect(response).to.be.not.empty;
    });

    it('O array de objeto possui as propriedades: "date", "productId", "quantity", "saleId"', async () => {
      const item = await SalesModel.getAll();

      expect(item[0]).to.include.all.keys('date', 'productId', 'quantity', 'saleId');
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
    it('retorna null', async () => {
      const response = await SalesModel.getById();
      expect(response).to.be.equal(null);
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

    it('retorna um array', async () => {
      const response = await SalesModel.getById(1);

      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await SalesModel.getById(1);

      expect(response).to.be.not.empty;
    });

    it('tal primeiro objeto do array possui as propriedades: "productId", "quantity"', async () => {
      const item = await SalesModel.getById(1);

      expect(item[0]).to.include.all.keys('productId', 'quantity');
    });
  });
});

describe('Insere uma nova venda no BD', () => {
  const payloadSale = [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]

  describe('quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await SalesModel.create(payloadSale);

      expect(response).to.be.a('object')
    });

    it('tal objeto possui a chave "id"', async () => {
      const response = await SalesModel.create(payloadSale);

      expect(response).to.have.a.property('id')
    });

  });
});
