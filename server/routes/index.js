import boom from 'boom';
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
        throw boom.badImplementation('Server error, please try again later', err);
      }
    })
    .post(function* (req, res) {
      const item = req.body;

      try {
        const groceryItem = yield new GroceryItem(item).save();
        res.status(201).json(groceryItem);
      } catch (err) {
        throw boom.badImplementation('Server error, please try again later', err);
      }
    });
};
