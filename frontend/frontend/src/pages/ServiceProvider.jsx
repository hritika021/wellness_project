import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom'
function ServiceProviders(){
    const {id}=useParams();
    const [provider,setProvider]=useState([]);
    const [service,setService]=useState(null)
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
useEffect(()=>{
    console.log("Fetching providers for id:", id)
    axios.get(`http://localhost:3000/api/auth/services/services/${id}`)
.then(res=>{
    console.log(res.data);
    setProvider(res.data.provider);
    setService(res.data.service)
})
      .catch(err=>console.log("Error fetching providers: ",err

        ))
},[id])
    if(!service)
        return <p>Loading....</p>

return(
    <section className="py-16 px-6 max-w-7xl">
<h1 className="text-3xl mt-16 ">{service.title} Providers</h1>
<div className="flex justify-between">
   <div> <p>{service?.description}</p>

<ul>{service.provider.name}</ul>
</div>
<button className="bg-blue-800 text-white px-3 py-2 rounded-lg mr-40 " onClick={()=>{
    if(!(localStorage.getItem("token"))){
        alert("Please login to  book the service")
        navigate('/login')
    }else{
axios.post(`http://localhost:3000/api/auth/booking/book/${service._id}`),{},{
headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
}
        .then(res=>{
            alert ("Booking Successsful!")
        })
        .catch(err=>console.error(err))
    }
}}>Book Now</button>
</div>

    </section>
)
}
export default ServiceProviders