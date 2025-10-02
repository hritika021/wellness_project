const express=require("express");
const authMiddleware = require("../middleware/middleware");
const { Booking, Service } = require("../db");
const router=express.Router();

router.post('/book/:serviceId',authMiddleware,async(req,res)=>{
  try{
    const service=await Service.findById(req.params.serviceId);
    if(!service){
      return res.status(400).json({msg:"Service not found"})
    }
    const booking=new Booking({
      serviceId:service._id,
      client:req.user.userId,
      scheduledDate
    })
    await booking.save();
    res.json({msg:"Service booked successfully!", booking})
  }

  catch(err){
    console.error(err)
  }
})

router.get("/my-bookings", authMiddleware, async(req,res)=>{
   try{
     if(req.user.role!=='client'){
        res.status(403).json({msg:"Access denied"})
    }

    const bookings=await Booking.find({client:req.user.userId})
    .populate('service', 'title description category')
    .populate('provider', 'name email')

    res.json({bookings})
   }
   catch(err){
    console.error(err);
    res.status(403).json({msg:"Server error"})
   }
})


module.exports=router
