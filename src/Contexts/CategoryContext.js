import { createContext, useState } from "react";

export const CategoryContext=createContext({
    showcat:()=>{},
    categorystatus:()=>{},
    falsestatus:()=>{}
    
})


export const CategoryContextProvider=({children})=>{

    const [cat,setcat]=useState(false)
   
   const Categoryval={
    showcat,
    categorystatus:cat,
    falsestatus
   }
   function falsestatus(){
    setcat(false)
   }
   function showcat(event){
    event.preventDefault()
    setcat(true)
    
   }


 return   <CategoryContext.Provider value={Categoryval}>
        {children}
         </CategoryContext.Provider>
}