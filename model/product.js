const mongoose=require('mongoose');
const  Schema=mongoose.Schema;
const ProductSchema=new Schema({

    title:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
description:{
    type:String,
    required:true
},

product_img:{
    type:String,
    required:true 
}
})
module.exports=mongoose.model('Products',ProductSchema);//(collectionname,schemaname)