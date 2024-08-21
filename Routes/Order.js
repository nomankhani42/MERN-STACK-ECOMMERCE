import express from 'express';
import { createOrder, getAllOrders, getUserOrders, updateOrderStatus, verifyOrder } from '../Controllers/Orders.js';
import { isAdmin, requireSignIn } from '../MiddleWare/authMiddleware.js';
const Router =express.Router();


Router.post('/create-order',createOrder);
Router.post('/verify-order',verifyOrder);
Router.get('/get-all-orders',()=>{

})

Router.get('/get-user-orders',requireSignIn,getUserOrders)
Router.get('/get-admin-orders',requireSignIn,isAdmin,getAllOrders);
Router.post('/update-order-status/:id',requireSignIn,isAdmin,updateOrderStatus);








export const OrderRouter=Router;