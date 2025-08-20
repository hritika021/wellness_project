const jwt  = require('jsonwebtoken');
const JWT_SECRET = require('../token');


function authMiddleware(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
return res.status(401).json({msg:"No token provided"})
    }

    const token=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
            req.user={
                    userId:decoded.userId,
                    role:decoded.role
            }
            next()
    } catch(err){
        return res.status(403).json({msg:"Invalid or expired token"});

    }

}

module.exports=authMiddleware;
