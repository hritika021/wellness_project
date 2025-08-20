const express=require("express");
const { Service, Review } = require("../db");
const router=express.Router();
router.get("/services",async (req,res)=>{
    try{
        const services= await Service.find().populate("provider","name email");
        res.json({services})

    } catch(err){
        console.error(err);
        res.status(500).json("Something went wrong")
    }
})

router.get("/services/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("provider", "name email");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/services/:id/reviews", async(req,res)=>{
    try{
        const reviews=await Review.find({service:req.params.id})
        .populate("client",'name email')
        .sort({createdAt:-1});

        res.json({reviews})
    }
    catch (err) {
    res.status(500).json({ msg: "Error fetching reviews" });
  }
})



router.get("/:serviceId/providers", async(req,res)=>{
const {serviceId}=req.params;
try{
  const service=await Service.findById(serviceId).populate("provider");
  if(!service){
    return res.status(400).json({msg:"Service not found"})
  }
  res.json({providers:service.provider})
}

catch(err){
  console.error(err);
  res.status(500).json({msg:"Something went wrong"})
}
})

module.exports=router