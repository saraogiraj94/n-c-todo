var {User}=require('./../models/Users');

//Middlewar
var authenticate = (req,res,next)=>{
    var token=req.header('x-auth');

    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
       }   
       //Here we will modify the request object
       req.user=user;
       req.token=token;
        next();
    }).catch((err)=>{
        res.status(401).send();
    });
    
}

module.exports={authenticate};