import React from 'react'
import './PostsHome.css'
import { Link } from 'react-router-dom'
import { useEffect ,useState } from 'react';

export default function PostsHome() {

  useEffect (()=>{
    content()
  },[])
  const [Postdata,setdataPostdata]=useState([]) 


  const content=async()=> {
  
  const res =await fetch (`http://localhost:5000/posts`)
  const data= await res.json()

    setdataPostdata(data) 

  }

  return (
    <div className='posts mt-3 mb-3'>
      {Postdata.map((item)=>{
        return <Link to={'../post/'+item.id} style={{ backgroundImage: `url(${item.img})`   }} className="postbody" >
          
            <h3>{item.title}</h3>
        </Link>
      })}
    </div>
  )
}
