import { model, ObjectId, Schema } from "mongoose";

const ProductSchema= new Schema({
    title:String,
    description:String,
    quantity:Number,
    category:{
        type:ObjectId
    },
    price:Number,
    photo:{
        data:Buffer,
        contentType:String
    },

})

export const ProductModel=model('Products',ProductSchema);