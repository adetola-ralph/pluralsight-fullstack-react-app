import shortid from 'shortid';
import mockingoose from 'mockingoose';
import mongoose from 'mongoose';

// import app from './../server';
import { getGroceryItems, findOneGroceryItem, newGroceryItems } from '../server/controller/groceryItem';
import GroceryItem from '../server/model/GroceryItems';

const _doc = [
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Okra',
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Banga',
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Egusi',
    purchased: true,
  },
];

const newItem = {
  name: 'Beans',
  _id: mongoose.Types.ObjectId(),
};

describe('GroceryItems controller', () => {
  beforeEach(() => {
    mockingoose.GroceryItem.toReturn(_doc, 'find');
    mockingoose.GroceryItem.toReturn(_doc[0], 'findOne');
  });

  it('should return a list of grocery items', function* () {
    const groceryItems = yield getGroceryItems();
    expect(groceryItems).toEqual(_doc);
  });

  it('should find one grocery item', function* () {
    const item = _doc[0];
    const groceryItem = yield findOneGroceryItem(item._id);
    expect(groceryItem.toJSON()).toEqual(item);
  });

  it('should create new groceryitem', function* () {
    mockingoose.GroceryItem.toReturn(newItem, 'save');
    mockingoose.GroceryItem.toReturn(_doc.concat(newItem), 'find');

    const groceryItem = yield newGroceryItems(newItem);
    const items = yield getGroceryItems();
    expect(items).toContainEqual(groceryItem.toJSON());
    expect(items).toHaveLength(4);
  });

  afterEach(() => {
    mockingoose.GroceryItem.reset();
  });
});
