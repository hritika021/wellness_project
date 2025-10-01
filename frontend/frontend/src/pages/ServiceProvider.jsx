import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'
function ServiceProviders(){
    const {id}=useParams();
    const [provider,setProvider]=useState([]);
    const [service,setService]=useState(null)
    const [loading,setLoading]=useState(true)
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
<h1 className="text-3xl ">{service.title} Providers</h1>
<p>{service?.description}</p>

<ul>{service.provider.name}</ul>
    </section>
)
}
export default ServiceProviders