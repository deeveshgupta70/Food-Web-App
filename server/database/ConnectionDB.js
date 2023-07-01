import mongoose from "mongoose";

export const connectDB = async ()=>{
    mongoose.connect(`${process.env.MONGO_URL}`).
    then(()=>console.log('Database Connected')).
    catch((err)=>console.log(err))
}