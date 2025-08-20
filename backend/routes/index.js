const express=require("express")
const userRouter= require("./user") 
const providerRouter=require("./provider");
const serviceRouter=require("./service");
const bookingRouter=require("./booking");
const reviewRouter=require("./review");
const adminRouter=require("./admin")
const router=express.Router();
router.use('/user',userRouter)
router.use('/provider',providerRouter)
router.use("/services",serviceRouter)
router.use("/booking",bookingRouter);
router.use("/review",reviewRouter);
router.use("/admin",adminRouter)

module.exports=router