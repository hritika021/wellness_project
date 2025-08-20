const express=require("express");
const router=express.Router();
const zod=require("zod");
const { User } = require("../db");
const jwt=require('jsonwebtoken');
const JWT_SECRET = require("../token");
const bcrypt=require('bcryptjs');
const authMiddleware = require("../middleware/middleware");




const signupSchema=zod.object({
    name:zod.string(),
    password:zod.string(),
   
    email:zod.email(),
    role:zod.enum(['client','provider']),
    location: zod.object({
        type:zod.literal('Point'),
        coordinates:zod.tuple([zod.number(), zod.number()])
    })


})

router.post("/signup", async(req,res)=>{
    const result=signupSchema.safeParse(req.body )
    if(!result.success){
        return res.status(400).json({
            msg:"Incorrect inputs"
        })
    }
    const {password,email,name,role,location}=result.data;

    const user=await User.findOne({
        email
    })
console.log("User found:",user)

if(user){
    return res.status(500).json({
        msg:"Email already taken"
    })
}

const hashedPassword=await bcrypt.hash(password,10);
const newUser=await User.create({
    email,
    password:hashedPassword,
    name,
    role,
  location
})

const userId=newUser._id;
const userRole=newUser.role

const token=jwt.sign({
    userId,userRole
},JWT_SECRET,{expiresIn:'7d'});

res.json({
    msg:"User created successfully",
    token:token,
        newUser: {
        name: newUser.name,
        role: newUser.role,
        email: newUser.email
    }
})

})

const loginSchema=zod.object({
    email:zod.email(),
    password:zod.string()
})

router.post('/login',async(req,res)=>{
const result=loginSchema.safeParse(req.body);
if(!result.success){
    return res.status(403).json({
        msg:"Invalid inputs"
    }) 

}
try{
   const {email,password}=result.data;

    const findUser= await User.findOne({
        email
    })

    if(!findUser){
        return res.status(404).json({
            msg:"User not found"
        })
    }

    const isMatch=await bcrypt.compare(password,findUser.password);
    if(!isMatch){
        return res.status(401).json({
            msg:"Invalid  username or password"
        })
    }

    const token=jwt.sign({userId:findUser._id, role:findUser.role},JWT_SECRET, {expiresIn:'7d'})
    res.json({
        msg:"Logged in",
        token,
            findUser: {
        name: findUser.name,
        role: findUser.role,
        email: findUser.email
    }
    })

} catch(err){
    console.log(err);
        res.status(500).json({ msg: "Server error" });
}

})

router.get('/me',authMiddleware, async(req,res)=>{
  try{ 
    const user=await User.findById(req.user.userId).select('-password')
    if(!user){
        return res.status(403).json({
            msg:"User not found"
        })
    }

    res.json({
        msg:'User fetched successfully',
        user
    })

  } catch(err){

    console.error(err)
    res.status(500).json({
        msg:"Server error"
    })
  }
})
module.exports=router