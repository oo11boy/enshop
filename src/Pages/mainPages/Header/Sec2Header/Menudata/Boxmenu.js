import React from 'react'

export default function Boxmenu(props) {
    const {title,body}=props

  return (
    <div className='boxmenu'>
    <h3 className='titleboxmenu'>{title}</h3>
    <ul className='contentboxmenu'>

        {body.map((item ,index)=>{
       return <li key={index}>{item}</li>
        })}
    
    </ul>
       </div>
  )
}
