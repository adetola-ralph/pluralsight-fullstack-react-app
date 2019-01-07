import GroceryItem from '../model/GroceryItems';

class GroceryItemController {
 * getGroceryItems() {
    const groceryItems = yield GroceryItem.find().exec();
    return groceryItems.map(item => item.toObject());
  }

 * newGroceryItems(item) {
    const groceryItem = yield new GroceryItem(item).save();
    return groceryItem;
  }

 * findOneGroceryItem(id) {
    return yield GroceryItem.findOne({ _id: id });
  }
}

export default new GroceryItemController();

