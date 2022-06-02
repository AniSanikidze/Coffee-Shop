import axios from "axios";

import {
  ALL_COFFEE_FAIL,
  ALL_COFFEE_REQUEST,
  ALL_COFFEE_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";


export const getCoffee =
  (keyword = "", price = [20, 50], singleOrigin = null, origin = null, sort) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_COFFEE_REQUEST });

      let link = `api/coffee`;

      if (keyword !== "" || singleOrigin !== null || price[0] > 20 || price[1] < 50 || origin !== null || sort) {
        link = `api/coffee?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&sort=${sort}`
        if (origin !== null) { 
            link = `api/coffee?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&sort=${sort}&origin=${origin}&singleOrigin=true`
        }
        if(singleOrigin !== null) {
          link = `api/coffee?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&sort=${sort}&singleOrigin=${singleOrigin}`
        }
    
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_COFFEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_COFFEE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/coffee");

    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/coffee/${id}`);

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.retrievedcoffee,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (productName,singleOrigin,origin,desc,bagSize,stock,price,roastLevel,img,aroma,flavor,finish) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/coffee/new`,
      {productName,singleOrigin,origin,desc,bagSize,stock,price,roastLevel,img,aroma,flavor,finish},
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id,price,roastLevel,singleOrigin,origin,desc,stock,bagSize,productName,img) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/coffee/${id}`,
      {price,roastLevel,singleOrigin,origin,desc,stock,bagSize,productName,img},
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/coffee/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductInfo = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/coffee/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.retrievedcoffee,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (rating,comment,coffeeId) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/coffee/add-review`, {rating,comment,coffeeId}, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};