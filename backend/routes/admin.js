const express=require("express");
const authMiddleware = require("../middleware/middleware");
const { isAdminMiddleware } = require("../middleware/isAdmin");
const { User, Service, Booking } = require("../db");
const router=express.Router();
router.get("/users",authMiddleware,isAdminMiddleware,async(req,res)=>{
    const users=await User.find();
    res.json({users})
})

router.get("/services", authMiddleware, isAdminMiddleware, async(req,res)=>{
    const services=await Service.find()
    .populate("provider", "name email");
    res.json({services})
})


router.get("/booking",authMiddleware,isAdminMiddleware, async(req,res)=>{
const bookings=await Booking.find().populate("client", "name email").populate("service")
res.json({bookings})
})


module.exports=router