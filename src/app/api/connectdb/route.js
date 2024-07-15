import { MongoClient } from 'mongodb';
const pass= 'Ho48WeVHRneIlRb1';
// const uri = `mongodb+srv://${process.env.Db_user}:${process.env.Db_pass}@cluster0.vs6u1vr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri_new="mongodb://localhost:27017";
const uri = `mongodb+srv://abhishekkatiyar2504:Ho48WeVHRneIlRb1@cluster0.4uwzggx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri);

export async function dbConnect() {
  if (client && client.topology && client.topology.isConnected()) await client.connect();
  return client.db('Dish');
}