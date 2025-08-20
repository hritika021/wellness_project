import yogaVideo from '../assets/img/imgs/yogaVideo.mp4'

export default function Hero({to}){
return(
    <div >
    <section className="relative h-screen overflow-hidden   ">
    <video loop autoPlay muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" >
    <source src={yogaVideo} type="video/mp4"/>
    </video>
<div className="absolute inset-0 bg-black/20 "/>
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <div className='animate-slidein'> 
             <h1 className="opacity-96 text-shadow-lg text-5xl md:text-6xl font-poppins font-bold mb-6" >Book Wellness at Your Doorstep</h1></div>
      
        <p className="animate-slidein font-poppins text-xl md:text-2xl text-shadow mb-6"> Premium at-home spa, massage, and therapy services</p>
        <button className=" animate-slidein bg-teal-700 hover:bg-teal-800 rounded-full font-poppins px-10 py-4 shadow-lg hover:scale-105 text-lg  ">Find your Service</button>
    </div>

<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-300'>
 <div className='w-6 h-10 border-2 border-white rounded-full flex justify-center '>
    <div className='w-1 h-3  bg-white rounded-full mt-2 '></div>
    
 </div>
</div>

    </section>
    </div>

    
)
}