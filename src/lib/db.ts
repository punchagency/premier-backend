import mongoose from 'mongoose';

declare global {
    var mongoose: {
      conn: typeof import('mongoose') | null;
      promise: Promise<typeof import('mongoose')> | null;
    };
  }

if (!process.env.MONGO_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI!);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;