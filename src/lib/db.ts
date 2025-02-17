import mongoose from 'mongoose';

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {}

if (!process.env.MONGO_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}


async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }
try {
  await mongoose.connect(process.env.MONGO_URI!);
  connection.isConnected = mongoose.connection.readyState;
} catch (error) {
  console.log("error", error)
  process.exit(1)
}
}

export default dbConnect;