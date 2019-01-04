import GroceryItem from '../model/GroceryItems';

export function* getGroceryItems() {
  const groceryItems = yield GroceryItem.find().exec();
  return groceryItems.map(item => item.toObject());
}

export function* newGroceryItems(item) {
  const groceryItem = yield new GroceryItem(item).save();
  return groceryItem;
}

export function* findOneGroceryItem(id) {
  return yield GroceryItem.findOne({ _id: id });
}
