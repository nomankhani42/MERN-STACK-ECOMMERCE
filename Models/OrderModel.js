import mongoose, { model, ObjectId, Schema } from "mongoose";


const OrderSchema=new Schema({
    first_Name:{type:String,required:true},
    last_Name:{type:String,required:true},
    email:{type:String,required:true},
    userId:{type:ObjectId,required:true},
    phone:{type:String,required:true},
    street:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    postal_code:{type:Number,required:true},
    country:{type:String,required:true},
    cart_items:Array,
    NetAmount:Number,
    payment:{type:Boolean,default:false},
    status:{type:String,default:'Pending'}
    

});

export const OrderModel = model('Orders',OrderSchema);