const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../../services/productsService');
const ProductsController = require('../../../controllers/productsController');

describe('Ao chamar o controller de getAll', () => {
  describe('quando não existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {

      };

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(ProductsService, 'getAll')
        .resolves(null);
    });

    after(() => {
      ProductsService.getAll.restore();
    });

    it('é chamado o método "status" passando 404', async () => {
      await ProductsController.getAll(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "send" passando a mensagem "Not Found"', async () => {
      await ProductsController.getAll(request, response);

      expect(response.send.calledWith('Not Found')).to.be.equal(true);
    });

  });

  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductsService, 'findById')
        .resolves({
          id: 1,
          name: 'Example Product',
        });
    });

    after(() => {
      ProductsService.findById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await ProductsController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await ProductsController.findById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});



describe('Ao chamar o controller de findById', () => {
  describe('quando não existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductsService, 'findById')
        .resolves(null);
    });

    after(() => {
      ProductsService.findById.restore();
    });

    it('é chamado o método "status" passando 404', async () => {
      await ProductsController.findById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando a mensagem "Product not Found"', async () => {
      await ProductsController.findById(request, response);

      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });

  });

  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductsService, 'findById')
        .resolves({
          id: 1,
          name: 'Example Product',
        });
    });

    after(() => {
      ProductsService.findById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await ProductsController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await ProductsController.findById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});