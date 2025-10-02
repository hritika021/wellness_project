import axios from "axios";
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"

export  default function Signup(){
const [email,setEmail]=useState("")
const [password,setPassword]=useState("");
const [role,setRole]=useState("role")
const [name,setName]=useState("");
const [longitude,setLongitude]=useState("");
const [latitude,setLatitude]=useState("")

const handleSubmit=async(e)=>{
    e.preventDefault();
    const location={
        type:"Point",
        coordinates:[parseFloat(longitude), parseFloat(latitude)],
    };
    try{
        const res=await axios.post('http://localhost:3000/api/auth/user/signup',{
            email,password,name,location,role
        });
        localStorage.setItem("token", res.data.token);
        alert("Signup successful!");
        Navigate('/services')
    } 
    catch(err){
        console.error(err);
           alert(
        err.response?.data?.msg || "Signup failed. Check your inputs!"
      );
    }
}


    return(
     <div className="bg-gray-200 h-screen  flex justify-center items-center">
                 <div className="w-full max-w-md rounded-xl shadow-2xl bg-white p-4 ">
                     <div className="mt-8 text-3xl text-shadow-sm font-sans font-semibold flex justify-center ">Signup</div>
     <div className="px-5 mt-4 ">
        <input onChange={(e)=>{
         setEmail(e.target.value)
        }} type="email" placeholder="Email" value={email} required className=" rounded-md pl-2 border border-1 w-full mt-4 py-2"></input>
     
        <input onChange={(e)=>{
         setPassword(e.target.value)
        }} type="password" placeholder="Password"  value={password} required className=" rounded-md pl-2 border border-1 w-full mt-4 py-2"></input>
     
        <input onChange={(e)=>{
         setPassword(e.target.value)
        }} type="text" placeholder="Name" value={name} className=" rounded-md pl-2 border border-1 w-full mt-4 py-2"></input>
     
     <select value={role} className="w-full p-2 border rounded mt-4" onChange={(e)=>{
        setRole(e.target.value)}
        }>
        <option value="client">Client</option>
        <option value="provider">Provider</option>

     </select>

     

<div className="flex gap-2 mt-4">
    <input className="w-1/2 p-2 border rounded" type="number" value={latitude} placeholder="Latitude" required onChange={(e)=>{
        setLatitude(e.target.value) 
    }} />

<input
            type="number"
            placeholder="Longitude"
            value={longitude}
            required
            onChange={(e) => setLongitude(e.target.value)}
            className="w-1/2 p-2 border rounded"
          />
</div>


        <button type="submit" className="hover:bg-green-700 bg-green-600 text-white w-full mt-10 py-2 rounded-lg" onClick={handleSubmit}>Signup</button>
        <p className="mt-5 text-gray-900 flex justify-center">New User? <Link to={"/signup"} className="text-decoration-none hover:underline hover:text-blue-600">Signup</Link></p>
     </div>
                 </div>
             </div>
    )
}