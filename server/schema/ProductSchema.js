import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:String,
    image:String,
    price:String,
    category:String,
    description:String
});

const ProductModel = mongoose.model("Product" , productSchema);
export default ProductModel;