import axios from "axios";
import {  useEffect, useState } from "react";
import yoga from '../assets/img/imgs/yoga.png'
import physio from '../assets/img/imgs/physiotherapy.jpg';
import dietPlan from '../assets/img/imgs/diet_plan.jpg';
import massage from '../assets/img/imgs/massage.jpg';
import { useNavigate } from "react-router-dom";
import Ripple from 'react-ripples'
import AnimateOnScroll from "../components/AnimateOnScroll";


function ServiceGrid(){

    const  navigate=useNavigate();
    const [services,setServices]=useState([])
    const [loading,setLoading]=useState(true);
 const [categories, setCategories] = useState([
    { name: "Yoga", icon: yoga, accent: "teal" },
    { name: "Physiotherapy", icon: physio, accent: "indigo" },
    { name: "Diet Plan / Meal Prep", icon: dietPlan, accent: "emerald" },
  ]); 

  
useEffect(()=>{
    axios.get("http://localhost:3000/api/auth/services/services")
  .then((res)=>{
    setServices(res.data.services);
    setLoading(false);
  })
    .catch((err)=>console.log("Error fetching services:",err))
},[])
if(loading) {
    return <p className="text-center mt-10">Loading services...</p>;
}
const grouped=categories.map(category=>({
    ...category,
    services: services.filter(s=>s.category===category.name)
}))

    



return (
 <section id="services" className=" py-20 bg-white">
    <div className="mx-auto max-w-7xl px-6 mt-3 relative text-center  ">
        <AnimateOnScroll>
<div className="flex justify-center items-center relative ">
            <div className="bg-gradient-to-r from-transparent to-teal-300 h-px flex-grow mr-4"/>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-1   ">
            <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-gradient animate-float ">Premium Wellness Services</span></h2>
            <div className="bg-gradient-to-r from-teal-300 to-transparent h-px flex-grow"/>
            </div>
<p className="text-blue-600/80 max-w-2xl text-lg mx-auto mb-10">Experience professional care in the comfort of your home.</p>
</AnimateOnScroll>


     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {grouped.map((category,index)=>{
        const {accent,color}=category
        return (
            <AnimateOnScroll key={category.name} delay={index*100}>
            <div 
            className="relative h-96 group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl bg-blue-900/10 hover:bg-blue-900/20 transition-all duration-300 hover:-translate-y-2 h-64 cursor-pointer">
            
   <div onClick={()=>{

    navigate(`/services/category/${encodeURIComponent(category.name)}`)
   }} style={{
                    backgroundImage:`url(${category.icon})`,
                    backgroundSize:"cover",
                    backgroundPosition:"center"
                }} className={`absolute inset-0 bg-center ${color} opacity-90 group group-hover:scale-110`}>

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-300"/>
                </div>
   <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent   ">
    <h3 className="font-bold text-2xl mb-3">{category.name}</h3>
    <p className="text-sm mb-4 opacity-0 group group-hover:opacity-100 transition-opacity duration-500 line-clamp-1 ">{category.services.length} Providers Available</p>

    <button onClick={()=>{
        navigate(`/services/category/${encodeURIComponent(category.name)}`)
    }} className={`bg-${accent}-500 rounded-full mt-3 py-1 hover:text-blue-800 self-start px-3 transition hover:bg-white/90 text-sm backdrop-blur-sm font-medium `}>Explore →</button>
   </div>
   

         

            </div>
         <div className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-${accent}-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                

            </AnimateOnScroll>

        )
       })}
     </div>


    </div>
     </section>
)
}
export default ServiceGrid