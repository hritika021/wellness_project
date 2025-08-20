const { User } = require("../db");

async function isAdminMiddleware(req,res,next){
    try{
        const user=await User.findById(req.user.userId);
        if(!user || user.role !=="admin"){
            return res.status(403).json({msg:"Access denied. Only admins allowed. "})
        }

        next()
    }
    catch(err){
        console.error(err);
    res.status(500).json({msg:"Server error"})

    }
}

module.exports={isAdminMiddleware}
