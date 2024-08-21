import express from 'express';
import { isAdmin, requireSignIn } from '../MiddleWare/authMiddleware.js';
import formidableMiddleware from 'express-formidable';
import { addProduct, deleteProduct, filterProductByCategoryAndPrice, filterSearchProducts, getAllProducts, getProductPhoto, getSingleProduct, updateProduct } from '../Controllers/Product.js';
const Router=express.Router();


Router.post('/add-product',requireSignIn,isAdmin,formidableMiddleware(),addProduct);
Router.get('/get-products',getAllProducts);
Router.get('/get-single-product/:pid',getSingleProduct);
Router.post('/get-filter-products',filterProductByCategoryAndPrice)
Router.get('/search-product/:keyword',filterSearchProducts)
Router.get('/get-product-photo/:pid',getProductPhoto)
Router.put('/update-product/:id',requireSignIn,isAdmin,formidableMiddleware(),updateProduct);
Router.delete('/delete-product/:id',requireSignIn,isAdmin,deleteProduct);





export const ProductRouter=Router;