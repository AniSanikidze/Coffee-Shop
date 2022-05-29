import React,{useEffect} from 'react';
import CardItem from './CardItem';
import './Cards.css';
import {clearErrors, getProduct} from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../loading/Loader';
import { useAlert } from 'react-alert';
import Searchbox from '../search/Searchbox'

function Cards({match}) {
  const alert = useAlert()
  const dispatch = useDispatch()
  let {loading,error,products} = useSelector(state=>state.products)
  const { input } = Searchbox();

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  },[dispatch,error,input,alert])

  function setFeaturedCoffee () {
    switch(window.location.pathname){
      case '/':
        products = products.slice(0, 4)
         return products
      default:
        return products;
    }
  }
  setFeaturedCoffee();

  return (
    <div className='cards'>
      <h1>Featured Products </h1>
      <div className='products-container'>
      {loading ? <Loader/> : 
      products && products.map(product => (
      <CardItem 
      key={product._id}
      productName={product.productName}
      id={product._id}
      price={product.price}
      numOfReviews={product.numOfReviews}
      stock={product.stock} 
      rating={product.rating}
      img={product.img}
      />
      ))}
      </div>
    </div>
  );
}

export default Cards;