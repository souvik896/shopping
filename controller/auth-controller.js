const authmodel=require("../model/auth");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken")
const {validationResult}=require('express-validator');
exports.registration=async(req,res)=>{
    
  const  name=req.body.name;
  const  email=req.body.email;
  const  password=req.body.password;
  const  phone=req.body.phone;


  if(!name)
  {
      return res.status(401).json({
          success:false,
          message:"name is required"
      })
  }
  else if(!email)
  {
      return res.status(401).json({
          success:false,
          message:"email is required"
      }) 
  }
  else if(!password)
  {
      return res.status(401).json({
          success:false,
          message:"password is required"
      }) 
  }
  else if(!phone)
  {
      return res.status(401).json({
          success:false,
          message:"phone is required"
      }) 
  }

  else {

    const savedata= await  authmodel.findOne({email:email})

    if(savedata)
    {
     return res.status(200).json({
         success:true,
         message:"email found",
         result:savedata
     })
    }
    else{
      const bcryptpassword=await bcrypt.hash(password,12)
      const  userdetails=new authmodel({name:name,email:email,password:bcryptpassword,phone:phone});
       const savedata=userdetails.save();
       if(savedata)
       {
         return res.status(201).json({
           success:true,
           message:"registration done",
           result:savedata
         })
       }
       else{
        return res.status(401).json({
        success:false,
        message:"not done registration"
      
        })

       }



    }
 
  }





}


exports.registrationForm=(req,res)=>{

 
    res.render('auth/registration',
  {path:'/registration',error:[]}
    )
    
}


exports.loginForm=(req,res)=>{
  let message=req.flash('error');
  console.log(message);
  if(message.length>0)
  {
    message=message[0]
  }
  else{
    message=null
  }
  res.render('auth/login',
  {path:'/login',cookie_data:req.cookies,errorMsg:message}
  )
}







exports.logindetails=async(req,res)=>{
        const email=req.body.email;
        const password=req.body.password;

     
      if(!email)
      {
          return res.status(401).json({
              success:false,
              message:"email is required"
          })
      }
      else if(!password)
      {
          return res.status(401).json({
              success:false,
              message:"password is required"
          }) 
      }   

       
        const savedata= await   authmodel.findOne({email:email})

    if(!savedata)
    {
     return res.status(200).json({
         success:false,
         message:"email not exist",
         result:savedata
     })
    }
    else
    {
     const uservalue= await   authmodel.findOne({email:email})
      const savedata= await bcrypt.compare(password,uservalue.password);
      if(savedata)
      {

        req.session.isLoggedIn=true;

        req.session.user=uservalue;
        req.session.save(err=>{
      if(err)
      {
        console.log(err);
      }
      else{
        const token_jwt=jwt.sign({email:uservalue.email},"ABCD",{expiresIn:'1h'});
        return res.status(200).json({

          success:true,
          message:"Login successful",
          full_name:uservalue.name+" "+uservalue.email,
          email:uservalue.email,
          user_id:uservalue._id,
          token:token_jwt

        })
      }


        })
        
  

      }
      else{
        return res.status(401).json({
        success:false,
        message:"email or password not matched"
      
        })

       }
    }

        
}














exports.welcomerender=(req,res)=>{
res.status(201).json({
  success:true,
  message:"welcome to our page"

})


}


exports.logoutsession=(req,res,next)=>{
  req.session.destroy(err=>{
    if(err){
        console.log(err);
    }
    else{
        
        res.redirect('/login');
    }
})
  
}