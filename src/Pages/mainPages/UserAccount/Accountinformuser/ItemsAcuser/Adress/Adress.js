import React from 'react'
import { Alert } from 'react-bootstrap'
import {TiWarning} from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { domain } from '../../../../../../api'
export default function Address() {
  return (
    <div style={{height:"80%", display:"flex" ,alignItems:"center", justifyContent:"center", with:"95%",flexDirection:"column"}} className="m-auto mt-4">
    <Alert className='w-75'>
        <TiWarning  className='ms-2 fs-1'/>
      آدرسی را ثبت نکردید.

    </Alert>

    <div>
        <Link to={domain+'search'} className='btn btn-primary'>مرور محصولات</Link>
    </div>
    </div>
  )
}
