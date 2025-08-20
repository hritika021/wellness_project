const express=require("express");
const authMiddleware = require("../middleware/middleware");
const { Booking } = require("../db");
const router=express.Router();

router.post('/book',authMiddleware,async(req,res)=>{

    try{ 
 const {serviceId,scheduledDate}=req.body;
 if(req.user.role!=='client'){
    return res.status(403).json({msg:"Only clients can book services"})
 }

  const booking = await Booking.create({
      service: serviceId,
      client: req.user.userId,
      scheduledDate
    });

    res.json({
      msg: "Booking created successfully",
      booking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  

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
