const express=require("express");
const zod=require('zod');
const authMiddleware = require("../middleware/middleware");
const { Service, Booking } = require("../db");
const router=express.Router();
const serviceSchema=zod.object({
title:zod.string().min(3),
description:zod.string().optional(),
price:zod.number().min(0),
category:zod.string().optional()

})

router.post('/create',authMiddleware,async(req,res)=>{
if(req.user.role!=='provider'){
    return res.status(403).json({
        msg:"Only providers can create services"
    })
}
    const result=serviceSchema.safeParse(req.body);
try{
    const newService=await Service.create({
        ...result.data,
        provider:req.user.userId
    })

    res.json({msg:"Service created successsfully",service:newService})
}catch(err){
    console.error(err),
    res.status(500).json({
        msg:"server error"
    })
}
})

router.get("/bookings",authMiddleware, async(req,res)=>{
    try{
        if(req.user.role!=='provider'){
            return res.status(403).json({msg:"Only providers can view this"})
        }

        const bookings=await Booking.find().populate('client', 'name email').populate('service','title price') 
        const providerBookings=bookings.filter(booking=>{
            return booking.service?.provider?.toString() === req.user.userId
        })

        return res.json({providerBookings})
    }
    catch(err){
return res.status(403).json({msg:"Server issue"})
    }
})





module.exports=router