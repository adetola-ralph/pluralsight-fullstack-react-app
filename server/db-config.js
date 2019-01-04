import mongoose from 'mongoose';
import GroceryItem from './model/GroceryItems';

let dbUrl;

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  dbUrl = process.env.MONGO_DB_URI;
} else {
  dbUrl = process.env.TEST_MONGO_DB_URI;
}

export const items = [
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

mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => {
  /* istanbul ignore next */
  console.error('Mongo db connection error', error);
});

db.once('open', () => {
  console.log('Database connection successful');

  GroceryItem.estimatedDocumentCount().then((count) => {
    /* istanbul ignore next */
    if (count === 0 && process.env.NODE_ENV !== 'test') {
      items.forEach((item) => {
        new GroceryItem(item).save();
      });
    }
  });
});

export default db;
