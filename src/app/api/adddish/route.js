import { dbConnect } from '@/db/connectdb';
import Dish from '../../../db/dish';

export default async function handler(req, res) {
  await dbConnect();
  console.log(dbConnect);

  if (req.method === 'POST') {
    const { dishId, dishName, imageUrl, isPublished } = req.body;
    const newDish = new Dish({ dishId, dishName, imageUrl, isPublished });
    await newDish.save();
    res.status(201).json(newDish);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
