import React, { useContext ,useState,useEffect } from 'react'
import { AccountContext } from '../../Contexts/AccountContext'
import { Navigate, useNavigate } from 'react-router-dom'

export default function PrivateRoute(props) {
    useEffect (()=>{
        content()
      },[])
      const [UserLogindata,setUserLogindata]=useState([]) 
    
    
      const content=async()=> {
      
      const res =await fetch (`http://localhost:5000/UserLogindata`)
      const data= await res.json()
    
      setUserLogindata(data) 
    
      }

      
    const acinfo=useContext(AccountContext)
const {children}=props
const statuslogin=UserLogindata.some((item)=>item.email===acinfo.emaillogin && item.password && acinfo.passlogin)
if(statuslogin){
    return <>{children}</>
}
else{
    return <Navigate to='../useraccount/login'/>
}
}



