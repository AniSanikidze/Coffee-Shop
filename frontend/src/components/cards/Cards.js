import React,{useEffect,useContext} from 'react';
import Aos from 'aos'
import 'aos/dist/aos.css';
import CardItem from './CardItem';
// import { TopSuggestionsData } from './TopSuggestionsData'
import './Cards.css';
// import Product from '../products/Product';
import {clearErrors, getProduct} from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../loading/Loader';
import { useAlert } from 'react-alert';
import { UserContext } from '../../UserContext';
import Searchbox, {input} from '../search/Searchbox'

function Cards({match}) {
  // const { searchInput } = useContext(UserContext);
  const alert = useAlert()
  const dispatch = useDispatch()
  let {loading,error,products} = useSelector(state=>state.products)
  const { input, setInput } = Searchbox();

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct())
    setFeaturedCoffee()
  },[dispatch,error,input])

  function setFeaturedCoffee () {
    switch(window.location.pathname){
      case '/':
        products = products.slice(0, 4)
         return products
      default:
        return products;
    }
  }

  // useEffect(() => {
  //     setFeaturedCoffee();
  // },[])

  setFeaturedCoffee();
  
  // console.log(match)
  

  // const a = useEffect(() => {
  //   Aos.init({ duration: 1000 })
  // }, [])
  
  // window.addEventListener('a', a);
  // console.log(useSelector(state => state.products))

  return (
    <div className='cards'>
      <h1>Featured Products </h1>
      <div className='products-container'>
      {loading ? <Loader/> : 
      products && products.map(product => (
        // console.log(product)
      <CardItem productName={product.productName}
      id={product._id}
      price={product.price}
      numOfReviews={product.numOfReviews}
      stock={product.stock} 
      rating={product.rating}
      // category={product.category}
      />
      ))}
      </div><div className='cards__container'>
        {/* <div className='cards__wrapper'>
          <ul className='cards__items'>
            {/* {TopSuggestionsData.map(suggestion => {
              return TopSuggestionsData.indexOf(suggestion) < 2 &&
                      <CardItem
                        src={suggestion.src}
                        text={suggestion.text}
                        label={suggestion.label}
                        filterValue={suggestion.filterValue}
                      />
            })} */}
          {/* </ul> */}
          {/* <ul className='cards__items'>
            {TopSuggestionsData.map(suggestion => {
              return TopSuggestionsData.indexOf(suggestion) >= 2 &&
                      <CardItem
                        src={suggestion.src}
                        text={suggestion.text}
                        label={suggestion.label}
                        filterValue={suggestion.filterValue}
                      />
            })}
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default Cards;