
import dbConnect from '../../../db/connectdb';
import Dish from '../../../db/dish';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  await dbConnect();

  try {
    const { dishId } = await req.json();
    const dish = await Dish.findOne({ dishId });

    if (!dish) {
      return NextResponse.json({ success: false, error: 'Dish not found' });
    }

    dish.isPublished = !dish.isPublished;
    await dish.save();

    return NextResponse.json({ success: true, dish });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to toggle publish status' });
  }
}




