import { useEffect, useState } from "react";

export default function HowItWorks(){

    const [activeStep,setActiveStep]=useState(0);
    const steps=[
        {
            icon:"📅",
            title:"Book Online",
            desc:"Select service,time and location in 60 seconds"
        },{

            icon:"✅", 
            title:"Confirm and Pay",
            desc:"Secure payment and instant confirmation"
        },{

            icon:"🏡",
            title:"Relax & Enjoy",
            desc:"Expert arrives at your doorstep"
        }
    ];


    useEffect(()=>{
        const interval=setInterval(()=>{
            setActiveStep((prev)=>(prev+1) % steps.length)
        },3000)

        return()=>clearInterval(interval)
    },[steps.length])

    return(
      <section className="bg-blue-50 py-16 ">
        <div className="text-center max-w-7xl mx-auto px-6  ">
            <h2 className="font-bold text-3xl md:text-4xl text-blue-800">How It Works</h2>
        </div>
      </section>
    )
}