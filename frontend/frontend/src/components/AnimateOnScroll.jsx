import { useEffect, useRef, useState } from "react";

export default function AnimateOnScroll({children,delay}){
  const [isVisible,setIsVisible]=useState();
  const ref=useRef(null);


  useEffect(()=>{
    const observer=new IntersectionObserver(
      ([entry])=>{
        if(entry.isIntersecting){
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {threshold:0.1}
    )


    if(ref.current){
      observer.observe(ref.current)
    }
  },[])



  return (
      <div ref={ref} className={`transition-all duration-700 ease-out ${isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-20'} `} style={{transitionDelay:`${delay} ms`}}>{children}</div>
  )
}