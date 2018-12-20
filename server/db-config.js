import mongoose from 'mongoose';
import GroceryItem from './model/GroceryItems';

const dbUrl = process.env.MONGO_DB_URI;

mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Mongo db connection error', error);
});

db.once('open', () => {
  console.log('Database connection successful');

  const items = [
    {
      name: 'Okra',
    },
    {
      name: 'Banga',
    },
    {
      name: 'Egusi',
      purchased: true,
    },
    {
      name: 'Palm Oil',
    },
  ];

  GroceryItem.estimatedDocumentCount().then((count) => {
    if (count === 0) {
      items.forEach((item) => {
        new GroceryItem(item).save();
      });
    }
  });
});
