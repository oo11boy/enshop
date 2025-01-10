import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import MobileHeader from '../MobileHeader/MobileHeader';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { BsCartPlus, BsFilter, BsSortDown, BsSortUp } from 'react-icons/bs';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { Api } from '../../../api';
import { useAuth } from '../../../Contexts/AuthContext';
import { CartContext } from '../../../Contexts/CartContext';
import './Search.css';

export default function Search() {
  // Use useParams to get the URL parameters
  const { text } = useParams();
  const Productandcart = useContext(CartContext);
  const { isLoggedIn } = useAuth(); // Get login status from context
  const [datafetchproduct, setDatafetchproduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default'); // Sorting state

  useEffect(() => {
    setTimeout(() => {
      fetchProducts();
    }, 2000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [text, datafetchproduct, priceRange, showDiscountOnly, sortBy]);

  const fetchProducts = async () => {
    const res = await fetch(`${Api}/product`);
    const data = await res.json();
    setDatafetchproduct(data);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = datafetchproduct;
  
    // Filter by search text (show all products if text is "all")
    if (text && text.toLowerCase() !== 'all') {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      );
    }
  
    // Filter by price range
    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );
  
    // Filter by discount
    if (showDiscountOnly) {
      filtered = filtered.filter((item) => item.discount > 0);
    }
  
    // Sort products
    if (sortBy === 'priceLowToHigh') {
      filtered.sort((a, b) => (a.pricet || a.price) - (b.pricet || b.price)); // Use pricet if available
    } else if (sortBy === 'priceHighToLow') {
      filtered.sort((a, b) => (b.pricet || b.price) - (a.pricet || a.price)); // Use pricet if available
    } else if (sortBy === 'discount') {
      filtered.sort((a, b) => b.discount - a.discount);
    }
  
    setFilteredProducts(filtered);
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange([0, value]);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      <Header />
      <MobileHeader />

      <div className="search-content">
        <div className={`products`}>
          {!text=="all" &&
          <div className="titerproduct my-4">
            
          <p>Search results for: {text}</p>
        </div>
          
          }

          {/* Filter Section */}
          <div className="filter-section mb-4">
            <Row className="align-items-center">
   
              <Col md={4}>
                <Form.Check
                  type="checkbox"
                  label="Show Discounted Only"
                  checked={showDiscountOnly}
                  onChange={(e) => setShowDiscountOnly(e.target.checked)}
                />
              </Col>
              <Col md={4}>
                <Form.Select value={sortBy} onChange={handleSortChange}>
                  <option value="default">Sort By</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="discount">Discount</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>
                  Price Range: €0 - €{priceRange[1]}
                </Form.Label>
                <Form.Range
                  min={0}
                  max={200}
                  value={priceRange[1]}
                  onChange={handlePriceRangeChange}
                />
              </Col>
            </Row>
          </div>

          {/* Product Display */}
          <div className="product-grid">
  {loading ? (
    <div className="loading pt-3">Loading...</div>
  ) : filteredProducts.length === 0 ? (
    <Alert variant="info" className="m-3">
      No products found matching your criteria.
    </Alert>
  ) : (
    filteredProducts.map((item) => (
      <div key={item.id} className="product-card">
        <div className="productname">
          <img src={item.img} alt={item.name} />
          <Link to={'../product/' + item.id}>{item.name}</Link>

          {item.discount != 0 && (
            <span className="discount">{item.discount}%</span>
          )}
        </div>

        {item.discount != 0 ? (
          <div className="bynodiscount">
            <span className="pricenot">{item.price} €</span>
            <p className="pricebyt">{item.pricet} €</p>
          </div>
        ) : (
          <p style={{padding:"10px"}}>{item.price} €</p>
        )}

        <Button
          className="tocartproduct"
          onClick={() =>
            isLoggedIn
              ? Productandcart.addtocard(item.id)
              : alert('Please log in to add to cart')
          }
        >
          <BsCartPlus />
          <span className="tocarttext">Add to cart</span>
        </Button>
      </div>
    ))
  )}
</div>
        </div>
      </div>

      <Footer />
    </>
  );
}