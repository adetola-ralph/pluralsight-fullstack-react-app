import Boom from 'boom';
import GroceryItem from '../model/GroceryItems';

export default (router) => {
  router.get('/', function* (req, res) {
    res.send('hey there, howdy');
  });

  router.route('/items')
    .get(function* (req, res) {
      try {
        const groceryItems = yield GroceryItem.find().exec();
        return res.json(groceryItems.map(item => item.toJSON()));
      } catch (err) {
        throw Boom.badImplementation('Server error, please try again later', err);
      }
    })
    .post(function* (req, res) {
      const item = req.body;

      try {
        const groceryItem = yield new GroceryItem(item).save();
        res.status(201).json(groceryItem);
      } catch (err) {
        throw Boom.badImplementation('Server error, please try again later', err);
      }
    });

    router.route('/items/:id')
      .delete(function* (req, res) {
        const { id } = req.params;

        const groceryItem = yield GroceryItem.findOne({ _id: id });

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

        const groceryItem = yield GroceryItem.findOne({ _id: id });

        if (!groceryItem) {
          throw Boom.notFound();
        } else {
          for (const key in req.body) {
            if (key !== '_id') {
              groceryItem[key] = req.body[key];
            }
          }

          yield groceryItem.save();
          res.json(groceryItem);
        }
      });
};
