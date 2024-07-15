import { NextResponse } from 'next/server';
import connectToDatabase from '../../../db/connectdb';
import Dish from '../../../db/dish';

// Handler for GET method
export async function GET(req, res) {
  await connectToDatabase();

  try {
  const dishes = await Dish.find({});
  return NextResponse.json({success:true , dishes});
  } catch (error) {
  return NextResponse.json({success:true,  error: 'Failed to fetch dishes' });
  }
}

// Handler for POST method
export async function POST(req, res) {
  await connectToDatabase();
  try {
  
    const {dishId, dishName, imageUrl, isPublished } = await req.json();
    // console.log(dishId, dishName, imageUrl, isPublished );
    const newDish = new Dish({dishId,  dishName, imageUrl, isPublished });
    // console.log("back" , newDish);
    await newDish.save();
    return NextResponse.json({success : true , newDish});
  } catch (error) {
    return NextResponse.json({success : false , error: "there is an error"});
  }
}
