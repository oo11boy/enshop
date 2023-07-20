import React from 'react'
import './Header.css'
import Sec1Header from './Sec1Header/Sec1Header'
import Sec2Header from './Sec2Header/Sec2Header'
export default function Header() {
  return (
    <div className="containerHeader">
    <div className='upheader'></div>
<Sec1Header />
<Sec2Header />

    </div>
  )
}
