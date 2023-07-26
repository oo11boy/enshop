import React from 'react'
import './PostsHome.css'
import { Link } from 'react-router-dom'
import { useEffect ,useState } from 'react';
import { Api } from '../../../api';

export default function PostsHome() {

  useEffect (()=>{
    content()
  },[])
  const [Postdata,setdataPostdata]=useState([]) 

  const [loading,setloading]=useState(true)

  const content=async()=> {
  
  const res =await fetch (`${Api}/posts`)
  const data= await res.json()

    setdataPostdata(data) 
    setloading(false)
  }

  return (
    <div className='posts mt-3 mb-3'>
      {
        loading ?<div className='loading pt-3'>در حال بارگذاری...</div>:
      Postdata.map((item)=>{
        return <Link to={'../post/'+item.id} style={{ backgroundImage: `url(${item.img})`   }} className="postbody" >
          
            <h3>{item.title}</h3>
        </Link>
      })}
    </div>
  )
}
