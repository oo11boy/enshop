import React, { useContext, useEffect, useState } from 'react';
import './Category.css';
import { CategoryContext } from '../../../Contexts/CategoryContext';
import { Button } from 'react-bootstrap';
import { Api } from '../../../api';
import { Link } from 'react-router-dom';

export default function Category() {
    const catinfo = useContext(CategoryContext);
    const [catlist, setcatlist] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        content();
    }, []);

    const content = async () => {
        const res = await fetch(`${Api}/category`);
        const data = await res.json();
        setcatlist(data);
    };

    useEffect(() => {
        const imgList = [];
        for (let x = 0; x < catlist.length; x++) {
            imgList.push(`https://picsum.photos/400/30${x}`);
        }
        setImages(imgList);
    }, [catlist]);

    return (
        <div className="bgcat">
            <div className="bodycat">
                <div className='headercat'>
                    <p>
                        دسته بندی محصولات
                    </p>
                    <p onClick={catinfo.falsestatus}>بازگشت</p>
                </div>
                <div className='container pt-5 overflow-auto pb-5'>
                    <div className='row justify-content-between'>
                    {catlist.map((item, index) => (
                        <div className="col-12 g-3 col-md-6 col-sm-6 col-lg-6 categoryitem" key={item.catname}>

                            <img src={images[index]} alt="" />
                            <Link to={'../category/' + item.catid}>{item.catname}</Link>
                        </div>
                    ))}
                </div>
                </div>
                <div className="btncat">
                    <Button onClick={catinfo.falsestatus} className="btn btn-danger text-white">
                        بازگشت
                    </Button>
                </div>
            </div>
        </div>
    );
}
