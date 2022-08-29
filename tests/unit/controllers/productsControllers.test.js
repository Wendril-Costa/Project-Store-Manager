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

describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      
      // sinon.stub(ProductsService, 'create')
      //   .resolves({});
    })

    it('é chamado o status com o código 400', async () => {
      await ProductsController.create(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "name is required"', async () => {
      await ProductsController.create(request, response);
      
      expect(response.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
    });

  });

  describe('quando o nome tem menos de 5 caracteres', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'Lami'
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    })

    it('é chamado o status com o código 422', async () => {
      await ProductsController.create(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "name length must be at least 5 characters long"', async () => {
      await ProductsController.create(request, response);

      expect(response.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
    });
  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'Lamina do Caos',
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(ProductsService, 'create')
        .resolves({ code: 201, product: { id: 4, name: request.body.name}});
    })

    after(() => {
      ProductsService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await ProductsController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Produto criado com sucesso!"', async () => {
      await ProductsController.create(request, response);

      expect(response.json.calledWith({ id: 4, name: request.body.name })).to.be.equal(true);
    });

  });
});