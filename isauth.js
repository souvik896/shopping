// module.exports=(req,res,next)=>{
// if(!req.session.isLoggedIn)
// {
//    res.redirect('/login')
// }
// next();
// }





// module.exports=(req,res,next)=>{
//     if(!req.session.isLoggedIn)
//     {
//       return  res.redirect('/login')
//     }
//     next();
//     }
    





// module.exports=(req,res,next)=>{
//     if(!req.session.isLoggedIn)
//     {
//         res.redirect('/login')
//     }
    
//     else{
//         next();
//     }
//     }
const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{

    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error =new Error('Not Authenticated');
        error.statusCode= 401;
        throw error;
    }

// const token = authHeader.split(' ')[1];  //its use for bearer
const token = authHeader.split()[0];//collect token from header
let decodeToken;

try{
    decodeToken = jwt.verify(token,'ABCD');

    

}
catch(err){
    err.statusCode = 500;
    throw err;

}

if(!decodeToken){
    const error = new Error('Not Authorize');
    error.statusCode  = 401;
    throw error;
}

req.email = decodeToken.email;

next()
}