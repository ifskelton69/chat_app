import mongoose from "mongoose";
export const connectdb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected : ${con.connection.host}`);

    } catch (error) {
        console.log(`Mongodb connected :`, error.message);

    }
}