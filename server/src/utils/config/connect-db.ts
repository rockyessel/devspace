import mongoose from 'mongoose';

export const ConnectDatabase = async () => {
    try {
      const url = `${process.env.MONGO_URI}`;
    const connect = await mongoose.connect(url);

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
