import { Rating } from "@material-ui/lab";
import React from "react";

const Review = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <div className="reviewer" style={{'display':'flex','flexDirection':'row','alignItems':'center'}}>
      <p >{review.username}</p>
      <Rating {...options} style={{'color': 'rgb(175, 164, 131)'}} />
      </div>
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default Review;