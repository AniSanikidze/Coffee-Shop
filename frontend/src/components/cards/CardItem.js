import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import './Cards.css';
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";

function CardItem(props) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: '#afa483',
    value: props.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25
  }

  
  const addToCartHandler = (e) => {
    dispatch(addItemsToCart(props.id,1,"Whole Beans"))
    alert.success("Item added to cart")
  }

  return (
    <>
          <Link className='productCard' to={`product/${props.id}`}>
              <img
                alt={props.productName}
                src={props.img ? props.img : '/images/Home/finall.png'}
              />
              {props.stock > 0 && <div className='add-to-cart' style={{'display':'flex', 'flexDirection':'column'}} onClick={(e) => {
                e.preventDefault();
                addToCartHandler();              }
                }>Add to Cart <span style={{'fontSize':'16px'}}>+</span></div>}
              <p style={{'color':'#111111'}}>{props.productName}</p>
            <span style={{'font-family': 'firago'}}>{props.price}₾</span>
            <div>
              <ReactStars {...options}/> <span> ({props.numOfReviews}reviews)</span>
            </div>
          </Link>
    </>
  );
}

export default CardItem;