import React,{useEffect} from 'react';
import Navbar from '../components/navbar/Navbar';
import MetaData from '../components/MetaData';
import Product from '../components/products/Product';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductInfo } from '../actions/productAction';
import Loader from '../components/loading/Loader';
import Footer from '../components/footer/Footer';

function ProductPage({match}) {
    const dispatch = useDispatch()
    const {loading,error,product} = useSelector(state=>state.product)
  
    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      dispatch(getProductInfo(match.params.id))
    },[dispatch, match.params.id,error])
    
  return (
    <>
        <MetaData title={`${product.productName} - Coffee Berry`}/>
        <Navbar/>
      {loading ?
     (
      <Loader />
    ) :
     ( <Product imgs={product.imgs} reviews={product.reviews}
      productName={product.productName}
      id={product._id}
      numOfReviews={product.numOfReviews}
      price={product.price}
      stock={product.stock}
      rating={product.rating}
      description={product.desc}
      origin={product.origin}
      singleOrigin={product.singleOrigin}
      weight={product.weight}
      roastLevel={product.roastLevel} 
      // reviews={product.reviews}
      />)}
      <Footer/>
    </>
  );
}

export default ProductPage;
