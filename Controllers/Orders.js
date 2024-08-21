import { response } from "express";
import { OrderModel } from "../Models/OrderModel.js";
import stripe from 'stripe';

const Stripe = new stripe('sk_test_51PlqUxBdG0truyJNzu7ra5ysG0KMEs3FMytB0STu1jtJIU0qftkp4211y3lVEqYF6c8Z79rBScZgMU5rs1PiTVkH00EBRPUzdi');

export const createOrder = async (req, res) => {
  try {
    // Save the order to the database
    const order =await new OrderModel({ ...req.body });
    await order.save();

    // Map cart items to Stripe's line items format
    const line_items = req.body.cart_items.map((item) => ({
      price_data: {
        currency: "PKR",
        product_data: {
          name: item.title,
        },
        unit_amount: Math.round(item.price * 100*278), // Stripe expects amount in the smallest currency unit (e.g., cents)
      },
      quantity: item.quantity,
    }));

    //  const OrderData=await OrderModel.findOne({userId:req.body.userId})
    // Create a Stripe checkout session
    const session = await Stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `http://localhost:8080/success?success=true&order_id=${order._id} `, // Replace with your success URL
      cancel_url: 'https://yourdomain.com/cancel', // Replace with your cancel URL
    });

    // Respond with the checkout session URL
    return res.json({
      success: true,
      message: 'Order Created Successfully',
      sessionId: session.id, // Provide the session ID to your frontend
      url: session.url, // Provide the checkout URL to redirect users
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the order',
      error: error.message,
    });
  }
};


export const verifyOrder=async(req,res)=>{
  try {
        const updateOrder=await OrderModel.findByIdAndUpdate(req.body.id,{payment:true},{new:true});

        

        return res.json({
          success:true,
          message:'Order Verified Successfully',
          updateOrder
        });
  }
    catch (error) {
     console.log(error)
  }
}

export const getUserOrders=async(req,res)=>{
    
  const UserOrders=await OrderModel.find({userId:req.user._id});
   
  return res.json({
    success:true,
    message:'User Order Fetched Successfully',
    UserOrders
  })
}

export const getAllOrders=async(req,res)=>{
  try {
      const AllOrders=await OrderModel.find({});

      return res.json({
        success:true,
        message:'All Orders Fetched Successfully',
        AllOrders
      })
  }
   catch (error) {
      console.log(error)
  }
}


export const updateOrderStatus=async(req,res)=>{
  try {
      const updateOrder=await OrderModel.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});


      return res.json({
        success:true,
        message:'Order Status Updated Successfully',
        updateOrder

      })
  }
  
  catch (error) {
    console.log(error)
  }
}