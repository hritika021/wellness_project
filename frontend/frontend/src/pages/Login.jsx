import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate()
const handleLogin=async(e)=>{
e.preventDefault();
try{
    const res=await axios.post('http://localhost:3000/api/auth/user/login',{
        email,password
    })
    localStorage.setItem("token",res.data.token)
    alert("Login successful!")
    navigate('/services')
}catch(err){
    console.error(err)
    alert("Login failed")
}
}


    return (
        <div className="bg-gray-200 h-screen flex justify-center items-center">
            <div className="w-96 h-96  rounded-xl shadow-2xl bg-white ">
                <div className="mt-8 text-3xl text-shadow-md font-sans font-semibold flex justify-center ">Login</div>
<div className="px-5 mt-4 ">
   <input onChange={(e)=>{
    setEmail(e.target.value)
   }} type="text" placeholder="Username" className=" rounded-md pl-2 border border-1 w-full mt-4 py-2"></input>

   <input onChange={(e)=>{
    setPassword(e.target.value)
   }} type="password" placeholder="Password" className=" rounded-md pl-2 border border-1 w-full mt-4 py-2"></input>

   <button type="submit" onClick={handleLogin} className="hover:bg-green-700 bg-green-600 text-white w-full mt-10 py-2 rounded-lg">Login</button>
   <p className="mt-5 text-gray-900 flex justify-center">New User? <Link to={"/signup"} className="text-decoration-none hover:underline hover:text-blue-600">Signup</Link></p>
</div>
            </div>
        </div>
    )
}