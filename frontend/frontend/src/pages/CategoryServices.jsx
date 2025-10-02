import React, {  useEffect, useState } from "react";
import axios from "axios";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { data, useNavigate, useParams } from "react-router-dom";
function CategoryServices(){
    const [services,setServices]=useState([]);
    const [loading,setLoading]=useState(true)
 const {category}=useParams()
 const navigate=useNavigate()

 useEffect(()=>{
    axios.get(`http://localhost:3000/api/auth/services/services/category/${encodeURIComponent(category)}`)
 
    .then((res)=>{
        console.log(res.data.services)
        setServices(res.data.services);
        setLoading(false);
    
    })

    .catch((err)=>{
        console.error(err)
    })
 },[category])

 if(loading){
    return <p className="text-center mt-10">Loading services...</p>;

 }

 if(!services.length){
    return <p className="text-center mt-10">No users found for {category}</p>
 }
    return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{category} Providers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <AnimateOnScroll key={service._id}>
            <div
              className="relative group rounded-xl overflow-hidden shadow-lg   hover:shadow-2 xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/services/${service._id}`)}
            >
              <div
                style={{
                  backgroundImage: `url(${service.image || "/placeholder.png"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "200px",
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-300" />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-gray-700 text-sm mb-2">{service.description}</p>
                <p className="text-gray-500 text-sm">
                  Provider: {service.provider?.name || "Unknown"}
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
export default CategoryServices