import GroceryItem from '../model/GroceryItems';

export function* getGroceryItems() {
  const groceryItems = yield GroceryItem.find().exec();
  return groceryItems.map(item => item.toObject());
}
