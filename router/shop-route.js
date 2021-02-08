const express=require('express');
const exp_router=express.Router();
const homeController=require('../controller/shop-controller')
const isAuth=require('../isauth');
exp_router.get('/addtocart/:add_id',isAuth,homeController.AddToCart);
module.exports=exp_router;