

const auth_check=require('../isauth')
const express=require('express');
const exp_router=express.Router();
const {check,body}=require('express-validator')
const homeController=require('../controller/auth-controller');
const isauth = require('../isauth');
exp_router.get('/registration',homeController.registrationForm)
exp_router.post('/registration/request',
[
body('name','Valid name here').isLength({min:3}),
body('phone','Valid phone here').isLength({min:10}),
check('email').isEmail().withMessage("input valid email"),
body('password','enter valid password').isLength({min:3,max:6}).matches()
],
homeController.registration)
exp_router.get('/login',homeController.loginForm)
exp_router.post('/login/request',homeController.logindetails)
exp_router.get('/welcome',isauth,homeController.welcomerender)
exp_router.get('/logoout',homeController.logoutsession)
 module.exports=exp_router;