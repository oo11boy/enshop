import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import MobileHeader from '../MobileHeader/MobileHeader';
import Footer from '../Footer/Footer';
import { Form, FormControl, InputGroup, Container, Row, Col } from "react-bootstrap";
import { FiSearch } from 'react-icons/fi';
import { CartContext } from '../../../Contexts/CartContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsCartPlus } from 'react-icons/bs';
import './SearchPage.css'
import { TbSortDescending2 } from 'react-icons/tb';
import { AiOutlineFilter } from 'react-icons/ai';
import { Api } from '../../../api';
export default function SearchPage() {
  

const [loading,setloading]=useState(true)

  const [searchtext, setsearchtext] = useState(' ');

  const [sort, setsortby] = useState(['asc', 'pricet'])


  const [minprice, setminprice] = useState(0)

  const [maxprice, setmaxprice] = useState(1000000000000)
  const [cat, setcat] = useState('')
  const searchval = (event) => {
    setsearchtext(event.target.value);

  };
const [statussort,setstatussort]=useState(false)

const showsort=()=>{
  setstatussort(!statussort)
  setstatusorder(false)
}
const [statusorder,setstatusorder]=useState(false)

const showorder=()=>{
  setstatusorder(!statusorder)
  setstatussort(false)
}


  

  const Productandcart = useContext(CartContext);

  useEffect(() => {
    contentporduct()
  }, [searchtext, sort, minprice, maxprice, cat])



  const [datafetchproduct, setdatafetchproduct] = useState([])


  const contentporduct = async () => {
    const res = await fetch(`${Api}/product/?${cat !== '' && 'cat=' + cat}&q=${searchtext}&_sort=${sort[1]}&_order=${sort[0]}&price_gte=${minprice}&price_lte=${maxprice}`)
    const data = await res.json()
    setdatafetchproduct(data)
    setloading(false)

  }



  useEffect(() => {
    contentcat()
  }, [])
  const [categoriylist, setcategoriylist] = useState([])


  const contentcat = async () => {
    const res = await fetch(`${Api}/category`)
    const data = await res.json()
    setcategoriylist(data)

  }
  return (
    <>
      <Header />
      <MobileHeader />
      <div className='paddingtopmob searchbody'>
        <div className='rightsearchside'>

          <div className='rightbox fixmob'>

            <span className='hiddenmobile'> جستجو</span>
            <form>

              <FiSearch />
          
              <input value={searchtext} onChange={searchval} type="search" placeholder="نام محصول را وارد کنید" />

            </form>
            <div className='d-flex hiddendesktop undersearchmob justify-content-between'>
<div onClick={showorder} className='btn'> <TbSortDescending2  /> مرتب سازی</div>

<div onClick={showsort} className='btn'><AiOutlineFilter / >فیلترگذاری </div>

</div>
          </div>



<div className={statussort ? 'filter' :'hiddenmobile w-100'}>
          <div className='rightbox'>

            <span> فیلتر قیمت</span>


            <div className='inputpricefilter'>
              <span>
                از  :
              </span>
              <input type="number" onChange={(event) => { setminprice(event.target.value) }} />
            </div>

            <div className='inputpricefilter'>
              <span>
                تا :
              </span>
              <input type="number" onChange={(event) => { setmaxprice(event.target.value) }} />
            </div>
          </div>
          <div className='rightbox'>

            <span> فیلتر دسته بندی</span>

         {categoriylist.map((item) => (


              <li onClick={() => { setcat(item.catid) }}>{item.catname}</li>

            ))}

            <li onClick={() => { setcat('') }}>همه</li>
          </div>

        </div>
        </div>

        <div className='leftsidesearch'>

   <div className={statusorder==false && 'hiddenmobile'}>
          <div className="sortsearch  mt5">
            <span><TbSortDescending2 />  مرتب سازی بر اساس:</span>
            <ul className='sortsearchbody'>
              <li onClick={() => { setsortby(['asc', 'pricet']) }} >ارزانترین</li>
              <li onClick={() => { setsortby(['desc', 'pricet']) }}>گرانترین</li>
              <li onClick={() => { setsortby(['desc', 'takhfif']) }}>بیشترین تخفیف</li>

            </ul>

          </div>
          </div>
          <div className="productserach">



            {
             loading ?<div className='loading pt-3'>در حال بارگذاری...</div>:
            datafetchproduct.map((item) => (

              <div className='productbody'>

                <div className='productname' >
                  <img src={'../' + item.img} alt="" />

                  <Link to={'../product/' + item.cat + '/' + item.id} >{item.name}</Link>

                  {item.takhfif !== 0 && <span className='takhfif'>{item.takhfif}%</span>
                  }

                </div>
                {item.takhfif !== 0 ? <div className='bynotakhfif'> <span className='pricenot'>{item.price} تومان</span> <p className='pricebyt'>{item.pricet} تومان</p>    </div> :


                  <p>{item.price} تومان</p>

                }

                <Button className='tocartproduct' onClick={() => Productandcart.addtocard(item.id)}>

                  <BsCartPlus />
                  <span className='tocarttext'>افزودن به سبد خرید</span>
                </Button>

              </div>

            ))}

          </div>
        </div>
      </div>

      <div className="hiddenmobile">
        <Footer />
      </div>
    </>
  );
}
