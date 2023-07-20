import React from 'react'
import { CartContext } from '../../../Contexts/CartContext'
import { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Header from '../Header/Header';
import Card from 'react-bootstrap/Card';
import './Billing.css'
export default function Billing() {
 const cartinfo=useContext(CartContext)
  return (
    <>
    <Header />
    <Row className='billing '>
    <Form className='col-8 borderbox g-3'>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    </Row>

    <Form.Group className="mb-3" controlId="formGridAddress1">
      <Form.Label>Address</Form.Label>
      <Form.Control placeholder="1234 Main St" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridAddress2">
      <Form.Label>Address 2</Form.Label>
      <Form.Control placeholder="Apartment, studio, or floor" />
    </Form.Group>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label>City</Form.Label>
        <Form.Control />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>State</Form.Label>
        <Form.Select defaultValue="Choose...">
          <option>Choose...</option>
          <option>...</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Zip</Form.Label>
        <Form.Control />
      </Form.Group>
    </Row>

    <Form.Group className="mb-3" id="formGridCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>

  <div className='col-4 gotopay g-3'>
  <Card body>
<p>نوع ارسال:</p>
<Card body className='mt-3'>ارسال با پست پیشتاز</Card>
<Card body className='mt-3'>ارسال با تیباکس </Card>
<p className='mt-4'>نوع پرداخت:</p>
<Card body className='mt-3'>انتقال مستقیم بانکی</Card>
<Card body className='mt-3'> پرداخت در محل  </Card>

<Card body className='mt-3 bg-danger text-white'>


  <div> جمع کل مبلغ: {cartinfo.totalprice()} تومان </div>
</Card>
<Card body className='mt-3 bg-success text-white'>


  <div>ثبت سفارش</div>
</Card>
  </Card>
  </div>
  </Row>
  
  </>
    
    )
}
