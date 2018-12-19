import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const groceryItemSchema = new Schema({
  name: String,
  purchased: Boolean,
  id: String,
});

export default model('GroceryItem', groceryItemSchema);
