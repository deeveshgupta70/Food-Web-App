import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname: {
        type:String,
        require:true,
    },
    lastname: {
        type:String,
        require:true,
    },
    email: {
        type:String,
        unique:true,
        require:true,
    },
    image:String,
    password: String,
    confirmpassword: String,
});

const user = mongoose.model("userData-foodApp" , userSchema);
export default user;