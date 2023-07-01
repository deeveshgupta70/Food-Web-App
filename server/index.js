import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./database/ConnectionDB.js";
import User from "./schema/DocumentSchema.js";
import Product from "./schema/ProductSchema.js";
import Stripe from "stripe";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

//MongoDB
connectDB();

//Middleware
app.use(cors());
app.use(express.json({limit:"10mb"}));


////////API SECTION
app.get("/" , (req,res)=>{
    res.status(200).send("Home");
})

//login
app.post("/login" ,async (req,res)=>{

    try {
        
        const {email , password} = req.body;
        const checkDetails = await User.findOne({email});
        if( checkDetails) return res.status(200).json({
            success:true,
            message:"Login Successful",
            data:checkDetails,
        })
        else return res.status(401).json({
            success:false,
            message:"Login unsuccessful",
        })
    } catch (error) {
        console.log(err.message);
    }
})

//sign Up 
app.post("/signup" , async (req,res)=>{

    try {        
        console.log(req.body);
        const {email} = req.body;
    
        const checkEmail = await User.findOne({email} );
        if( checkEmail) return res.send({success:false , message:"Email Already exist"});
    
        await User.create(req.body);
        return res.status(200).json({
            success:true,
            message:"User Created",
        })

    } catch (error) {
        console.log(err.message);
    }
    
})

//Add Product
app.post("/newproduct" , async (req,res)=>{
    try {
        const product = await Product.create(req.body);
        return res.json({
            success:true,
            message:"Product Added"
        })
    } catch (err) {
        console.log(err.message)
    }
})

//GET All product
app.get("/product" , async (req,res)=>{
    const data = await Product.find({});
    res.send(data);
})

/////// Payment Gateway/////
const stripe = new Stripe(process.env.STRIPE_KEY);
app.post("/checkout-payment" , async (req,res)=>{
    try{
        const params = {
            submit_type : 'pay',
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : "auto",
            shipping_options : [{shipping_rate : "shr_1NOojfSCtrxycsmYByZ1MTUl"}],
  
            line_items : req.body.map((item)=>{
              return{
                price_data : {
                  currency : "inr",
                  product_data : {
                    name : item.name,
                    // images : [item.image]
                  },
                  unit_amount : item.price * 100,
                },
                adjustable_quantity : {
                  enabled : true,
                  minimum : 1,
                },
                quantity : item.qty
              }
            }),
  
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`,
  
        }
  
        
        const session = await stripe.checkout.sessions.create(params)
        // console.log(session)
        res.status(200).json(session.id)
       }
       catch (err){
          res.status(err.statusCode || 500).json(err.message)
       }
})



app.listen(PORT , ()=>{
    console.log(`Server is Running => ${PORT}`);
})