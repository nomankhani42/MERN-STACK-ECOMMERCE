import { ProductModel } from "../Models/Product.js";
import fs from 'fs';

export const addProduct=async(req,res)=>{
    try {
        const {photo}=req.files;
        const {title,description,quantity,category,price}=req.fields;

        if(!title){
            return res.json({
                success:false,
                message:'title is required'
            })
        }
        if(!description){
            return res.json({
                success:false,
                message:'Description is required'
            })
        }

        if(!quantity){
            return res.json({
                success:false,
                message:'quantity is required'
            })
            
        }
        if(!category){
            return res.json({
                success:false,
                message:'Category is required'
            })
            
        }
        if(!price){
            return res.json({
                success:false,
                message:'Price is required'
            })
        }

        const Product=await new ProductModel({title,description,quantity,price,category});
        if(photo){
            Product.photo.data=fs.readFileSync(photo.path);
            Product.photo.contentType=photo.type;
        }
          Product.save();

          return res.json({
            success:true,
            message:'Product Added Successfully',
            Product
          })
    } 
    catch (error) {
        console.log(error)
    }
}

export const getAllProducts=async(req,res)=>{
    try {
         const Products=await ProductModel.find({}).select('-photo');

         return res.json({
            success:true,
            message:'All Products are fetched',
            Products
         })
    } 
    catch (error) {
        console.log(error)
    }
}
export const getSingleProduct=async(req,res)=>{
    try {
         const {pid}=req.params.id ;
         const Product=await ProductModel.findById(pid);

         return res.json({
            success:true,
            message:'Single Product Getted',
            Product
         })
    } catch (error) {
        console.log(error)
    }
}

export const getProductPhoto=async(req,res)=>{
    try {
         const ProductPhoto=await ProductModel.findById(req.params.pid).select('photo');

         if(ProductPhoto){
            res.set('Content-Type',ProductPhoto.photo.contentType);
              return   res.send(ProductPhoto.photo.data)
         }
    }
     catch (error) {
        console.log(error)
    }
}

export const updateProduct=async(req,res)=>{
    try {
        const {photo}=req.files;
        const {title,description,quantity,category,price}=req.fields;

        if(!title){
            return res.json({
                success:false,
                message:'title is required'
            })
        }
        if(!description){
            return res.json({
                success:false,
                message:'Description is required'
            })
        }

        if(!quantity){
            return res.json({
                success:false,
                message:'quantity is required'
            })
            
        }
        if(!category){
            return res.json({
                success:false,
                message:'quantity is required'
            })
            
        }
        if(!price){
            return res.json({
                success:false,
                message:'Price is required'
            })
        }

        const Product=await  ProductModel.findByIdAndUpdate(req.params.id,{...req.files,...req.fields},{new:true});
        if(photo){
            Product.photo.data=fs.readFileSync(photo.path);
            Product.photo.contentType=photo.type;
        }
          Product.save();

          return res.json({
            success:true,
            message:'Product Updated Successfully',
            Product
          })
    } 
    catch (error) {
        console.log(error)
    }
}

export const deleteProduct=async(req,res)=>{
    try {
        
        const result=await ProductModel.findByIdAndDelete(req.params.id);

        return res.json({
               success:true,
               message:'Product Deleted Successfully',
               result
        })
    } catch (error) {
         console.log(error)
    }
}


export const filterProductByCategoryAndPrice = async (req, res) => {
    try {
        const { Checked, radio } = req.body;
        let filterArgs = {};

        // Handle the Checked object
        // if (Checked && typeof Checked === 'object') {
        //     // Extract categories with truthy values
        //     const categories = Object.keys(Checked).filter(key => Checked[key]);
            
            if (Checked.length > 0) {
                filterArgs.category = { $in: Checked };
            }
        // }

        // Handle the price filter
        if (radio) {
            filterArgs.price = { $lte: radio };
        }

        // Query the database with the filter arguments
        const products = await ProductModel.find(filterArgs).select('-photo');
        console.log(Checked,filterArgs)
        // Send the response
        return res.json({
            success: true,
            Checked,
            message: 'Products filtered successfully',
            products
        });
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}



export const filterSearchProducts=async(req,res)=>{
    try {
         const {keyword}=req.params;

      const searchProducts = await ProductModel.find({
            "$or": [
                { "title": { $regex: keyword, $options: 'i' } }
            ]
        });

       

         return res.json({
            success:true,
            message:'Searched Products filtered Successfully',
            searchProducts
         })
    } 
    catch (error) {
        console.log(error)
    }
}