const express=require("express");
const authMiddleware = require("../middleware/middleware");
const { Booking, Review } = require("../db");
const router=express.Router();
router.post("/review",authMiddleware, async(req,res)=>{
    try{
        const booked=await Booking.findOne({
            service:serviceId,
            client:req.user.userId
        })

        if(!booked){
            return res.status(403).json({msg:"You must book thiss service to add a review"})
        }

        const review=new Review({
            service:serviceId,
            client:req.user.userId,
            comment,
            rating

        })   
        
        await review.save();
        res.json({msg:"Review submitted successfully"})
    }  catch(err){
        console.error(err);
        res.json(403).json({msg:"Error submitting review"})
    }
})


module.exports=router