import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductInfo,
  newReview,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import Select from 'react-select'
import SelectStyle from '../search/SearchboxStyle';
import SelectLogic from '../search/SelectLogic';
import { addItemsToCart } from "../../actions/cartAction";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import Review from "./Review";

const Product = (props) => {
  const alert = useAlert()
  const [descriptionClicked,setDescriptionClicked] = useState(false)
  const [reviewsClicked,setReviewsClicked] = useState(false)
  const [productQuantity, setProductQuantity] = useState(1)
  const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch()
    const { coffeeType,selectCoffeeTypeHandler,selectCoffeeTypeOptions} = SelectLogic();
    const { customThemes, customStyles } = SelectStyle();
    const options = {
        size: "large",
        value: props.rating,
        readOnly: true,
        name: 'review',
        precision: 0.5,
        ishalf: 'true'
      };
      const {error} = useSelector(state=>state.product)

      const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );

    function increaseProductQuantity () {
      if (productQuantity !== props.stock){
        setProductQuantity(productQuantity + 1)
      }
    }

    function decreaseProductQuantity () {
      if (productQuantity - 1 >= 1){
        setProductQuantity(productQuantity - 1)
      }
    }

    const addToCartHandler = () => {
      dispatch(addItemsToCart(props.id,productQuantity,coffeeType))
      alert.success("Item added to cart")
    }

    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };
  
    const reviewSubmitHandler = () => {
      dispatch(newReview(rating,comment,props.id));
      setOpen(false);
    };

    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (reviewError) {
        alert.error(reviewError);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Review Submitted Successfully");
        dispatch({ type: NEW_REVIEW_RESET });
        dispatch(getProductInfo(props.id))
      }
    }, [dispatch, error, alert, reviewError, success,props.id]);
  
  return (
    <Fragment> 
      <Fragment>
        <div className="ProductDetails">
          <div style={{'textAlign':'center','justifyContent':'center',"alignItems":'center'}}>
                     <img className="CarouselImage"
                    style={{'margin':"auto"}}
                     src={props.img}
                     alt={props.productName}
                      />
          </div>
          <div>
            <div className="detailsBlock-1">
              <h2>{props.productName}</h2>
            </div>
            <div className="detailsBlock-2">
              <Rating {...options} style={{'color': 'rgb(175, 164, 131)'}}/>
              <span className="detailsBlock-2-span">
                {" "}
                ({props.numOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <div><h1>Profile</h1>
                 <p>{props.aroma} aroma, {props.flavor} flavor, {props.finish} finish</p></div>
              <Select
                options={selectCoffeeTypeOptions}
                styles={customStyles}
                theme={customThemes}
                onChange={selectCoffeeTypeHandler}
                className="select-coffee"
                placeholder={coffeeType}
              />
                 <h1>{`₾${props.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button 
                  onClick={decreaseProductQuantity}
                  >-</button>
                  <input readOnly type="number" 
                  value={productQuantity}
                  />
                  <button 
                  onClick={increaseProductQuantity}
                  >+</button>
                </div>
                <button
                  disabled={props.stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
                <p style={{'color': props.stock > 0 ? "green" : "red"}}>{props.stock > 0 ? "InStock" : "Out of Stock"}</p>
              <div className="extra-info" onClick={() => setDescriptionClicked(!descriptionClicked)}>
                      <div className="product-description">
                        <div style={{'display':'flex'}}>
                          <h1 style={{'margin':'0','width':'90%'}}>PRODUCT DESCRIPTION</h1>
                          <span className="drop-down-arrow">
                          {descriptionClicked ? <ArrowDropUp/> : <ArrowDropDown className="arrow"/>}
                          </span></div>
                          <div className={descriptionClicked ? "content" : "content-hidden"}>
              {props.singleOrigin && <p>
                <b>Origin:</b>  {props.origin}
                </p>}
              <p>
                <b>Weight:</b> {props.bagSize}g
              </p>
              <p>
                <b>Roast Level:</b> {props.roastLevel}
              </p>
              <p>
                <b>Description:</b> {props.description}
              </p>
                          </div>
                          </div>
              </div>
              <div className="reviews-drop-down" onClick={() => setReviewsClicked(!reviewsClicked)}>
                      <div className="product-description">
                        <div style={{'display':'flex'}}>
                          <h1 style={{'margin':'0','width':'90%'}}>REVIEWS</h1>
                          <span className="drop-down-arrow">
                          {reviewsClicked ? <ArrowDropUp/> : <ArrowDropDown className="arrow"/>}
                          </span></div>
                          <div className={reviewsClicked ? "content" : "content-hidden"}>
                          {props.reviews && props.reviews[0] ? (
          <div className={reviewsClicked ? "reviews" : "reviews-hidden"}>
          {props.reviews.map((review) => (
            <Review key ={review._id}review={review}/>
                 )
                 )}
                 </div>) : (<div> 
                   No reviews yet
                   </div>)}
                          </div>
                          </div>
              </div>
            </div>
            <button 
            onClick={submitReviewToggle}
             className="submitReview">
              Submit Review
            </button>
          </div>
        </div>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
              style={{'color': 'rgb(175, 164, 131)'}}
            />
            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button 
            onClick={submitReviewToggle} 
            color="secondary">
              Cancel
            </Button>
            <Button 
            onClick={reviewSubmitHandler} 
            color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
  </Fragment>
  );
};

export default Product;