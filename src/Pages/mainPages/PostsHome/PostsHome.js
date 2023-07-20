import React from 'react'
import './PostsHome.css'
import Postdata from '../../Database/PostsData'
import { Link } from 'react-router-dom'

export default function PostsHome() {
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
