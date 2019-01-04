import Boom from 'boom';
import GroceryItemController from '../controller/groceryItem';

export default (router) => {
  router.route('/items')
    .get(function* (req, res) {
      try {
        const items = yield GroceryItemController.getGroceryItems();
        res.json(items);
      } catch (err) {
        throw Boom.badImplementation('Server error, please try again later', err);
      }
    })
    .post(function* (req, res) {
      const item = req.body;

      const groceryItem = yield GroceryItemController.newGroceryItems(item);
      res.status(201).json(groceryItem);
    });

  router.route('/items/:id')
    .delete(function* (req, res) {
      const { id } = req.params;

      const groceryItem = yield GroceryItemController.findOneGroceryItem(id);

      if (!groceryItem) {
        throw Boom.notFound();
      } else {
        yield groceryItem.remove();
        res.status(200).json({
          message: 'Item has been deleted',
        });
      }
    })
    .patch(function* (req, res) {
      const { id } = req.params;

      const groceryItem = yield GroceryItemController.findOneGroceryItem(id);

      if (!groceryItem) {
        throw Boom.notFound();
      } else {
        const keys = Object.keys(req.body);
        for (const key of keys) {
          if (key !== '_id') {
            groceryItem[key] = req.body[key];
          }
        }

        yield groceryItem.save();
        res.json(groceryItem);
      }
    });
};
