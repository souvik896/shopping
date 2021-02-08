const mongoose=require('mongoose');
const  Schema=mongoose.Schema;
const ProductSchema=new Schema({

   cartproduct:[{
       type:Object,
       required:true
    }],
   userId:{
       type:Schema.Types.ObjectId,
       required:true
   }
})
module.exports=mongoose.model('addtocart',ProductSchema);//(collectionname,schemaname)