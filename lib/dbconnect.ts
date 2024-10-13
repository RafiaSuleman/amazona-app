import mongoose from 'mongoose'

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }catch (error) {
    console.error('Connection failed!', error);
    throw new Error('Connection failed!');
  }
}

export default dbConnect