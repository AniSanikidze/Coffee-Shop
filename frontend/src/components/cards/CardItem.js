// import { Button } from '@material-ui/core';
import React
// { useContext } 
from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
// import { UserContext } from '../../UserContext';
import './Cards.css';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { addItemsToCart } from "../../actions/cartAction";

function CardItem(props) {
  const dispatch = useDispatch();
  const alert = useAlert();
  // const { setClickedSuggestion } = useContext(UserContext)

  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: '#afa483',
    value: props.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25
  }

  
  const addToCartHandler = (e) => {
    // console.log(props.id,productQuantity,coffeeType)
    dispatch(addItemsToCart(props.id,1,"Whole Beans"))
    alert.success("Item added to cart")
  }

  return (
    <>
      {/* <li
        className='product'
        onClick={() => setClickedSuggestion(product.filterValue)}
      > */}
          <Link className='productCard' to={`product/${props.id}`}>
              <img
                // className='cards__item__img'
                alt={props.productName}
                src='/images/Home/finall.png'
              />
              {/* {console.log(props)} */}
              {props.stock > 0 && <div className='add-to-cart' style={{'display':'flex', 'flexDirection':'column'}} onClick={(e) => {
                e.preventDefault();
                addToCartHandler();              }
                }>Add to Cart <span style={{'fontSize':'16px'}}>+</span></div>}
              <p style={{'color':'#111111'}}>{props.productName}</p>
            <span style={{'font-family': 'firago'}}>{props.price}₾</span>
            <div>
              <ReactStars {...options}/> <span> ({props.numOfReviews}reviews)</span>
            </div>
            {/* <div className='btn' style={{'outline': '2px', color:"#555555"}}>Add to Cart</div> */}
          </Link>
        {/* </li> */}
    </>
  );
}

export default CardItem;