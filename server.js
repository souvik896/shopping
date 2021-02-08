const express=require('express');


require('dotenv').config();
const mongoose=require('mongoose');
const multer=require('multer');
const flash=require('connect-flash');
// Multer is nodejs middleware
const session=require('express-session');
const UserModel=require('./model/auth');
const main_route=require('./router/admin-route');
const shop_route=require('./router/shop-route')
const auth_route=require('./router/auth-router');

const cookieParser=require("cookie-parser");
const csurf=require('csurf');                                  ////
const Mongodb_session=require('connect-mongodb-session')(session);
const  appServer=express();
const path=require('path');
const bodyParser=require('body-parser');
                                ///

const storeValue=new Mongodb_session({
    uri:"mongodb+srv://souvik_node:741852963@cluster0.4ywb9.mongodb.net/product",
    collection:'my-session'
})

 appServer.use(bodyParser.json());
appServer.use(express.static(path.join(__dirname,'public')));
appServer.use('/upload',express.static(path.join(__dirname,'upload')));

appServer.set('view engine','ejs');
appServer.set('views','view');
const csurfProtection=csurf();  
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
    
});
const fileFilter=(req,file,cb)=>{
  if(file.mimetype.includes("png") ||  file.mimetype.includes('jpg') || file.mimetype.includes('jpeg'))
{
    cb(null,true)
}
else{
    cb(null,false)
}
}

appServer.use(multer({
    storage:fileStorage,fileFilter:fileFilter,limits:{
        fieldSize:1024*1024*5
    }
}).single('product_img'));
appServer.use(flash())
appServer.use((req,res,next)=>{

    if(req,res,next)
    {
        return next();
    }
    UserModel.findById(req.session.user._id)  
    .then(userValue=>{
        req.user=userValue;
        console.log('app'+req.user)
        next();
    })
    .catch(err=>console.log(err));

})
appServer.use(session({secret:'my-secret',resave:false,saveUninitialized:false,store:storeValue}))
appServer.use(cookieParser());
// appServer.use(csurfProtection);
appServer.use((req,res,next)=>{
    res.locals.isAuthenticated=req.session.isLoggedIn;
    // res.locals.csrfToken=req.csrfToken()
       next();
    })
 

    
appServer.use(main_route);
appServer.use(shop_route);
appServer.use(auth_route);

mongoose.connect(process.env.db_url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
  
    appServer.listen(2000,(req,res)=>{

        console.log("serevr is running");
        })
}).catch(err=>{
    console.log(err);
})
