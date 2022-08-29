const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const ProductsService = require('../../../services/productsService');
const ProductsModel = require('../../../models/productsModel');

describe('Busca por todos os produtos no BD', () => {

  describe('quando não existem produtos cadastrados', () => {
    before(async () => {
      sinon.stub(ProductsModel, 'getAll')
        .resolves(null);
    });

    after(async () => {
      ProductsModel.getAll.restore();
    });
    it('retorna null', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe os produtos', () => {

    before(() => {
      sinon.stub(ProductsModel, 'getAll')
        .resolves([
          {
            id: 1,
            name: 'Example Product1',
          },
          {
            id: 2,
            name: 'Example Product2',
          },
          {
            id: 3,
            name: 'Example Product3',
          },
        ]);
    });

    after(() => {
      ProductsModel.getAll.restore();
    });

    it('retorna um array de objeto', async () => {
      const response = await ProductsModel.getAll();

      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await ProductsModel.getAll();

      expect(response).to.be.not.empty;
    });

    it('O array possui pelo menos um tamanho de 3', async () => {
      const array = await ProductsModel.getAll();

      expect(array).to.have.length(3);
    });

    it('O array de objeto possui as propriedades: "id", "name"', async () => {
      const item = await ProductsModel.getAll();

      expect(item[0]).to.include.all.keys('id', 'name');
    });
  });
})




describe('Busca apenas um produto no BD por seu ID', () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando não existe um produto com o ID informado', () => {
    it('retorna null', async () => {
      const response = await ProductsService.findById();

      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um filme com o ID informado', () => {

    before(() => {
      sinon.stub(ProductsModel, 'getById')
        .resolves(
          {
            id: 1,
            name: 'Example Product',
          }
        );
    });

    after(() => {
      ProductsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductsService.findById(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await ProductsService.findById(1);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades: "id", "name"', async () => {
      const item = await ProductsService.findById(1);

      expect(item).to.include.all.keys('id', 'name');
    });
  });
});