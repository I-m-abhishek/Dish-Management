import mongoose from 'mongoose';
import { AutoIncrement } from './autoIncrement';

const DishSchema = new mongoose.Schema({
  dishId : { type: String, unique: true },
  dishName: String,
  imageUrl: String,
  isPublished: Boolean,
});

// DishSchema.plugin(AutoIncrement, { inc_field: 'dishId' });

const Dish = mongoose.models.Dish || mongoose.model('Dish', DishSchema);

export default Dish;
