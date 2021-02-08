const express=require('express');
const exp_router=express.Router();
const homeController=require('../controller/admin-controller')
exp_router.get('/admin',homeController.getFormView);
exp_router.post('/pp',homeController.viewpage);
exp_router.get('/formdetails',homeController.viewdetalis);
// exp_router.get('/productdetails',homeController.shopproductlist);
exp_router.get('/admin/edit/:p_id',homeController.updateproductsdetails)
exp_router.post('/admin/update/eachupdate',homeController.updateform)

exp_router.get('/admin/delete/:del_id',homeController.adminDelete)


exp_router.post('/shop/productdetails/search',homeController.productsearch)
 module.exports=exp_router;