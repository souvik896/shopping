const productModel=require("../model/product");
const AddCartModel=require("../model/cart");
const arrval=[];
exports.getFormView=(req,res)=>
{
res.render('admin/add-product',{
    title:'mypage',
    path:'/admin'
})

}
exports.viewpage=async(req,res,next)=>{        //insert purpouse
       
    const formvalue=req.body;
    const title=req.body.title;
    const description=req.body.description;
    const image=req.body.image;
    const price=req.body.price;   
    // const product_img=req.file;
    // console.log(product_img);
    // const img_url=product_img.path;


    if(!title)
    {
        return res.status(401).json({
            success:false,
            message:"product title is required"
        })
    }
    else if(!description)
    {
        return res.status(401).json({
            success:false,
            message:"description title is required"
        }) 
    }
    else if(!image)
    {
        return res.status(401).json({
            success:false,
            message:"image is required"
        }) 
    }
    else if(!price)
    {
        return res.status(401).json({
            success:false,
            message:"price is required"
        }) 
    }
    // else if(!product_img)
    // {
    //     return res.status(401).json({
    //         success:false,
    //         message:"product img is required"
    //     }) 
    // }
    else{

        const Product=new productModel({title:title,image:image,price:price,description:description});
        const savedata= await Product.save()

       if(savedata)
       {
        return res.status(200).json({
            success:true,
            message:"product saved successful",
            result:savedata
        })
       }
       else{
           return res.status(401).json({
            success:false,
            message:"product not saved ",
            result:savedata 
           })
       }


    }
   
   
  
 
     
     
  
}
exports.viewdetalis= async(req,res)=>{
  
  
  
    const savedata= await   productModel.find()

   if(savedata)
   {
    return res.status(200).json({
        success:true,
        message:"product fetched successful",
        result:savedata
    })
   }
   else{
       return res.status(401).json({
        success:false,
        message:"product not fetched ",
        result:savedata 
       })
   }
    
           }





exports.updateproductsdetails=async(req,res)=>{
    const product_id=req.params.p_id;
    console.log(product_id);

    const savedata= await    productModel.findById(product_id)

    if(savedata)
    {
     return res.status(200).json({
         success:true,
         message:" each product fetched successful",
         result:savedata
     })
    }
    else{
        return res.status(401).json({
         success:false,
         message:" each product not fetched ",
         result:savedata 
        })
    }


 
    
 }


 exports.updateform=async(req,res)=>
 {
    const form_update_id=req.body.product_id;
   console.log(form_update_id);
    const title=req.body.title;
    const description=req.body.description;
    const image=req.body.image;
    const price=req.body.price; 
    const product_img=req.file;
    console.log(product_img);
    const img_url=product_img.path;

    if(!title)
    {
        return res.status(401).json({
            success:false,
            message:"product title is required"
        })
    }
    else if(!description)
    {
        return res.status(401).json({
            success:false,
            message:"description title is required"
        }) 
    }
    else if(!image)
    {
        return res.status(401).json({
            success:false,
            message:"image is required"
        }) 
    }
    else if(!price)
    {
        return res.status(401).json({
            success:false,
            message:"price is required"
        }) 
    }

     else{

       
       const productData =await productModel.findById(form_update_id);
       console.log(productData);
       if(productData){
        productData.title=title;
        productData.image=image;
        productData.price=price;
        productData.description=description;
        productData.product_img=img_url;
        const savedata= await productData.save()
       if(savedata)
       {
        return res.status(200).json({
            success:true,
            message:"product update successful",
            result:savedata
        })
       }
       else{
           return res.status(401).json({
            success:false,
            message:"product update not saved ",
            result:savedata 
           })
       }
    }
    else
    {
        console.log("data not found");
    }

    }


    // productModel.findById(form_update_id).then(productData=>{
    //     console.log(productData);
    //     productData.title=title;
    //     productData.image=image;
    //     productData.price=price;
    //     productData.description=description;
    //     return productData.save().then(result=>{
    //         console.log(result,"data updated");
    //         res.redirect("/formdetails");
    //     })
    // })
    // .catch(err=>{
    //     console.log(err)
    // })

 }



 exports.adminDelete=async(req,res)=>  //  by post method
 {
 const product_id=req.params.del_id;
 console.log(product_id);


 const savedata= await    productModel.deleteOne({_id:product_id})

 if(savedata)
 {
  return res.status(200).json({
      success:true,
      message:" product deleted",
      result:savedata
  })
 }
 else{
     return res.status(401).json({
      success:false,
      message:" delete not successfull",
      result:savedata 
     })
 }



//  productModel.deleteOne({_id:product_id}).then(
//      result=>{
//          console.log(result);
//          res.redirect("/formdetails");
//      }).catch(
//         err=>{
//             console.log(err);
//         }
//     )

 }









exports.productsearch=(req,res)=>{

    const prodserach_title=req.body.ptitle;
console.log(prodserach_title)
productModel.find({title:prodserach_title}).then(product=>{
    console.log(product)
      res.render('admin/admin-product',{
        data:product,
        path:''
      })

}).catch(err=>{
    console.log(err);
})

}




     