import chai from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';

const { expect } = chai;

import app from '../server';
import db, { items } from '../server/db-config';
import GroceryItemController from '../server/controller/groceryItem';
import GroceryItem from '../server/model/GroceryItems';

const api = supertest.agent(app);
let newGroceryListItem;

describe('Intergration tests', () => {
  describe('GroceryItem retreival', () => {
    before(async () => {
      const promise = [];
      items.forEach((item) => {
        promise.push(new GroceryItem(item).save());
      });

      await Promise.all(promise);
    });

    it('should return list of all the GroceryItems', async () => {
      const res = await api.get('/api/items').expect(200);

      expect(res.body).to.not.be.empty;
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(4);
    });

    it('should create a new groceryIte,', async () => {
      const res = await api.post('/api/items')
        .send({ name: 'Basil' })
        .expect(201);

      newGroceryListItem = res.body;
      expect(newGroceryListItem).to.haveOwnProperty('name', 'Basil');

      const res2 = await api.get('/api/items').expect(200);
      expect(res2.body).to.have.lengthOf(5);
      expect(res2.body).to.deep.include(newGroceryListItem);
    });

    it('should edit an item', async () => {
      const res = await api.patch(`/api/items/${newGroceryListItem._id}`)
        .send({ purchased: true })
        .expect(200);

      expect(res.body).to.eql({ ...newGroceryListItem, purchased: true });
    });

    it('should delete an item', async () => {
      const res = await api.delete(`/api/items/${newGroceryListItem._id}`)
        .expect(200);

      expect(res.body.message).to.equal('Item has been deleted');

      const res2 = await api.get('/api/items').expect(200);
      expect(res2.body).to.have.lengthOf(4);
      expect(res2.body).to.not.deep.include(newGroceryListItem);
    });

    it('should return 404 when you try to edit a non-existing item', async () => {
      const res = await api.patch(`/api/items/${newGroceryListItem._id}`)
        .send({ purchased: true })
        .expect(404);

      // expect(res.body).to.eql({ ...newGroceryListItem, purchased: true });
    });

    describe('error handling', () => {
      before(() => {
        const stub = sinon.stub(GroceryItemController, 'getGroceryItems')
        stub.throws('This is an error');
      });

      it('should return 500 on event of an error', async () => {
        const res = await api.get('/api/items').expect(500);
      });

      after(() => {
        sinon.resetBehavior();
      });
    });

    after(() => {
      db.dropCollection('groceryitems');
    });
  });
});
