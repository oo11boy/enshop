import React from 'react'

export default function Boxheader(props) {
    const {icon,title,body}=props
  return (
    <div className="boxheader">
   {icon}
    <div className='informboxheader'>
       <h3>{title}</h3>
       <p>{body}</p>
    </div>
</div>
  )
}
