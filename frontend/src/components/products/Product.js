import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductInfo,
  newReview,
} from "../../actions/productAction";
// import ReviewCard from "./ReviewCard.js";
import Loader from '../loading/Loader';
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import Select from 'react-select'
import SelectStyle from '../search/SelectStyle';
import SelectLogic from '../search/SelectLogic';
import { addItemsToCart } from "../../actions/cartAction";
import { 
    // Search, 
    ArrowDropDown, ArrowDropUp, ArrowUpward, ArrowUpwardOutlined } from "@material-ui/icons";

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
  // console.log(props.reviews.length)
  const alert = useAlert()
    const [descriptionClicked,setDescriptionClicked] = useState(false)
    const [reviewsClicked,setReviewsClicked] = useState(false)
    const [productQuantity, setProductQuantity] = useState(1)
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch()
    const imgs = ['images/Home/f4c7d390b212215a5adf545cec88f834.jpg','images/Home/download (1).jpg']
    // console.log(props.productName)
    const { sortOptions, setSortResultHandler,sortResult, coffeeType,selectCoffeeTypeHandler,selectCoffeeTypeOptions} = SelectLogic();
    const { customThemes, customStyles } = SelectStyle();
    const options = {
        size: "large",
        value: props.rating,
        readOnly: true,
        precision: 0.5,
        isHalf:true
      };
      const {loading,error,products} = useSelector(state=>state.product)

      const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );

    function increaseProductQuantity () {
      if (productQuantity != props.stock){
        setProductQuantity(productQuantity + 1)
      }
    }

    function decreaseProductQuantity () {
      if (productQuantity - 1 >= 1){
        setProductQuantity(productQuantity - 1)
      }
    }

    const addToCartHandler = () => {
      // console.log(props.id,productQuantity,coffeeType)
      console.log(coffeeType)
      dispatch(addItemsToCart(props.id,productQuantity,coffeeType))
      alert.success("Item added to cart")
    }

    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };
  
    const reviewSubmitHandler = () => {
      
      const myForm = new FormData();

      console.log(rating,comment,props.id)
      // myForm.set("rating", rating);
      // myForm.set("comment", comment);
      // myForm.set("productId", props.id);
      // console.log(myForm)
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
      // dispatch(getProductDetails(match.params.id));
    }, [dispatch, error, alert, reviewError, success]);
  

    // console.log(coffeeType)

  return (
    <Fragment> 
      <Fragment>
        {/* <MetaData title={`${props.productName} -- ECOMMERCE`} /> */}
        <div className="ProductDetails">
          <div style={{'textAlign':'center','justifyContent':'center',"alignItems":'center'}}>
            {/* {console.log(props.reviews[0].username)} */}
            {/* <Carousel> */}
              {/* {props.imgs &&
                props.imgs.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))} */}
                {/* //  props.imgs.map((item)=>( */}
                     <img className="CarouselImage"
                    //  key ={item.url} 
                    style={{'margin':"auto"}}
                     src='/images/Home/finall.png'
                    //   alt={`${item.i} Slide`}
                      />
            {/* </Carousel> */}
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
                 <p>Walnut aroma, sweet earthly flavor, soft finish</p></div>
                 {/* <Select
                defaultValue="Sort by"
                options={selectCoffeeTypeOptions}
                // value={coffeeType}
                styles={customStyles}
                theme={customThemes}
                onChange={selectCoffeeTypeHandler}
                // className="select-coffee"
                placeholder="Whole Beans"
              /> */}
              <Select
                // defaultValue="Sort by"
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
              <p style={{'color': props.stock > 0 ? "green" : "red"}}>
                <p>{props.stock > 0 ? "InStock" : "Out of Stock"}</p>
                
                {/* <b className={props.Stock < 1 ? "redColor" : "greenColor"}>
                  {props.Stock < 1 ? "OutOfStock" : "InStock"}
                </b> */}
              </p>
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
                <b>Weight:</b> {props.weight}
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
            <Review review={review}/>
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
        {/* {console.log(props.reviews)} */}
      </Fragment>
    
  </Fragment>
      // <div className="ProductDetails">
      //     <div>
      //     {/* <Carousel>
      //       {
      //           props.imgs.map( (item, i) => <img  src={item.url} key={i} item={item} /> )
      //       }
      //   </Carousel> */}
      //         {/* <Carousel>
      //           {props.imgs &&
      //            props.imgs.map((item,i)=>(
      //                <img className="CarouselImage" key ={item.url} src={item.url} alt={`${i} Slide`}/>
      //            ))}
      //         </Carousel> */}
      //         {/* <Carousel> */}
      //                         {props.imgs &&
      //           //  props.imgs.map((item)=>(
      //                <img className="CarouselImage"
      //               //  key ={item.url} 
      //                src='/images/Home/finall.png'
      //               //   alt={`${item.i} Slide`}
      //                 />
      //           //  ))
      //       }
      //            </div>
      //            {/* </Carousel> */}
      //       <div>
      //         <div className="detailsBlock-1">
      //           <h2>{props.productName}</h2>
      //         </div>
      //         <div className="detailsBlock-2">
      //           <Rating style={{'color': 'rgb(175, 164, 131)'}}
      //           {...options}
      //            />
      //           <span className="detailsBlock-2-span">
      //             {" "}
      //             ({props.numOfReviews} Reviews)
      //           </span>
      //         </div>
      //         <div className="detailsBlock-3">
      //             <h1>Profile</h1>
      //             <span>Walnut aroma, sweet earthly flavor, soft finish</span>
      //         </div>
      //         <div className="detailsBlock-3">
      //             {/* <p></p> */}
      //         <h1>{`₾${props.price}`}</h1>
      //         </div>
      //         <div className="detailsBlock-3">
              // <Select
              //   defaultValue="Sort by"
              //   options={sortOptions}
              //   styles={customStyles}
              //   theme={customThemes}
              //   onChange={setSortResultHandler}
              //   className="sort"
              //   placeholder="Select Ground Type"
              //   style={{'position': 'relative !important'}}
              // />
      //         </div>
      //         <div className="detailsBlock-3">
      //           <div className="detailsBlock-3-1">
      //             <div className="detailsBlock-3-1-1">

      //               <button 
      //               // onClick={decreaseQuantity}
      //               >-</button>
      //               <input readOnly type="number" 
      //               value={1}
      //                />
      //               <button 
      //               // onClick={increaseQuantity}
      //               >+</button>
      //                <button className="add-cart"
      //               disabled={props.stock < 1 ? true : false}
      //               // onClick={addToCartHandler}
      //             >
      //               Add to Cart
      //             </button>
      //             </div>
      //           </div></div>
      //           <p>
      //             Status:
      //             <b className={props.stock < 1 ? "redColor" : "greenColor"}>
      //               {props.stock < 1 ? "OutOfStock" : "InStock"}
      //             </b>
      //           </p>
      //           <div className="detailsBlock-2 extra-info">
      //                <div className="product-description" onClick={() => setDescriptionClicked(!descriptionClicked)}>
      //                    <h1 style={{'marginBottom':'0'}}>PRODUCT DESCRIPTION</h1>
      //                   <span className="drop-down-arrow">
      //                    {descriptionClicked ? <ArrowDropUp/> : <ArrowDropDown className="arrow"/>}
      //                    </span>
      //                    </div>{console.log(descriptionClicked)}
      //                    <div className={descriptionClicked ? "content" : "content-hidden"}>
      //                        <span>
      //                        <b>Origin:</b> Peru</span>
      //                        <span><b>Weight:</b> 0.250kg</span>
      //                        <span><b>Description:</b>as I saidhety how are you tell me heyy I love you you swweet sweet girl</span>
      //                        <span><b>Roast Level:</b> Medium</span>
      //                    </div>
      //           </div>
      //           <div className="detailsBlock-2 extra-info">
      //                <div className="product-description">
      //                    <h1 style={{'marginBottom':'0'}}>REVIEWS</h1>
      //                    <span className="drop-down-arrow">
      //                    {descriptionClicked ? <ArrowDropUp/> : <ArrowDropDown className="arrow"/>}
      //                    </span>
      //                    <div className={descriptionClicked ? "content" : "content-hidden"}>
      //                       hey
      //                    </div>
      //                    </div>
      //           </div>
      //       </div>
      // </div>
  );
};

export default Product;