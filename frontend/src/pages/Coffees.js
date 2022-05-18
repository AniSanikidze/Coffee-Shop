import React, { useEffect, useContext } from 'react';
import { VerticalFilter } from '../components/filtration/VerticalFilter';
import Select from 'react-select'
import Navbar from '../components/navbar/Navbar';
import SelectStyle from '../components/search/SelectStyle';
import SelectLogic from '../components/search/SelectLogic';
import './Coffee.css'
import { UserContext } from '../UserContext';
import {getProduct} from '../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../components/loading/Loader';
import CardItem from '../components/cards/CardItem';
import {clearErrors} from '../actions/productAction'
import MetaData from '../components/MetaData';
import Footer from '../components/footer/Footer';

export default function Coffees() {
  const dispatch = useDispatch()
  const {loading,error,products} = useSelector(state=>state.products)
  const { searchInput } = useContext(UserContext);
  const { price } = useContext(UserContext);
  const {singleOriginFilter} = useContext(UserContext)
  const {origin} = useContext(UserContext)
  const { sortOptions, setSortResultHandler,sortResult } = SelectLogic();
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct(searchInput,price,singleOriginFilter,origin,sortResult))
  },[dispatch,alert,error,searchInput,price,singleOriginFilter,origin,sortResult])

  
  const { customThemes, customStyles } = SelectStyle();
  return (
    <>
    <MetaData title={"Roasted Coffee - Coffee Berry"}/>
    <Navbar/>
      <div className="coffee-hero-container" >
      <div className="coffee-cards-header" style={{'display':'flex','flexDirection':'row'}}>
              <Select
                defaultValue="Sort by"
                options={sortOptions}
                styles={customStyles}
                theme={customThemes}
                onChange={setSortResultHandler}
                className="sort"
                placeholder="Sort by"
              />
          </div>
          <div style={{'display':'flex'}}>
        <VerticalFilter
        />
        <div className="coffee-cards-container">
          <div className='cards' style={{'padding':0}}>
      <div className='products-container' 
      >
      {loading ? <Loader/> : 
      products[0] ? products.map(product => (
      <CardItem productName={product.productName}
      id={product._id}
      price={product.price}
      numOfReviews={product.numOfReviews}
      rating={product.rating}
      category={product.category}
      stock={product.stock}
      />
      )) : <p>Products not found</p>}</div>
      </div><div className='cards__container'>
      </div>
    </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
