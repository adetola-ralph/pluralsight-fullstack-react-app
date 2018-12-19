export default (router) => {
  router.get('/', function* (req, res) {
    res.send('hey there, howdy');
  });

  router.get('/items', function* (req, res) {
    res.json([
      {
        name: 'Ice Cream',
      },
      {
        name: 'Hot dog',
      },
    ]);
  });
};
