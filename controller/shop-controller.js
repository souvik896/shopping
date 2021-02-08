const AddCartModel=require("../model/cart");
const productModel=require("../model/product");

exports.AddToCart=(req,res)=>{
    addTocartId=req.params.add_id
    const cartproduct=[];
   console.log(addTocartId);
     const userId=req.session.user._id;
     console.log(userId);
   productModel.findById(addTocartId).then(result=>{
   console.log(result)
   cartproduct.push(result);
   
   const addcart= new AddCartModel({userId:userId,cartproduct:cartproduct})
   addcart.save().then(result=>{       
       console.log('created add to cart');

       AddCartModel.find({userId:userId}).then(products=>{
         console.log(products)
        res.render("shop/addtocart",{
          data:products,
           
            path:' ',
           })
    }).catch(err=>{
        console.log(err);
    })

  
     
   }).catch(
       err=>{
           console.log(err);
       }
   )
   
   }).catch(err=>{console.log(err)})
   
   
   }