import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductInfo,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../MetaData";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import { useHistory } from "react-router-dom";
import Loader from "../../loading/Loader";
import './UpdateProductForm.css'

const UpdateProduct = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory()

  const {loading,error,product} = useSelector(state=>state.product)

  const {
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.adminProduct);

  const [productName, setProductName] = useState("");
  const [singleOrigin, setSingleOrigin] = useState(true)
  const [origin, setOrigin] = useState("")
  const [price, setPrice] = useState(0);
  const [aroma,setAroma] = useState("");
  const [flavor, setFlavor] = useState("")
  const [finish, setFinish] = useState("")
  const [desc, setDesc] = useState("");
  const [bagSize, setBagSize] = useState(0)
  const [roastLevel, setRoastLevel] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  const productId = match.params.id;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products-board");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
    loading
  ]);

  useEffect(() => {
      dispatch(getProductInfo(productId))
    //   if ()
    // if (product && product._id !== productId) {
    //     dispatch(getProductInfo(productId));
    //   } else
    if(!loading){
             if (product){
          console.log(product)
        setProductName(product.productName);
        setDesc(product.desc);
        setPrice(product.price);
      //   setFlavor(product.flavor)
        setSingleOrigin(product.singleOrigin)
        setOrigin(product.origin);
        setRoastLevel(product.roastLevel)
        setBagSize(product.bagSize)
        setStock(product.stock); 
        //  console.log(productName)
     }
    }

      //   setOldImages(product.images);
    //   }
  },[loading])
  console.log(roastLevel)

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    // myForm.set("productName", productName);
    // myForm.set("price", price);
    // myForm.set("desc", desc);
    // // myForm.set("category", category);
    // myForm.set("stock", stock);

    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });
    dispatch(updateProduct(productId,price,roastLevel,singleOrigin,origin,desc,stock,bagSize,productName));
  };
  const roastLevels = [
    "Light",
    "Medium",
    "Dark"
]
const coffeeType = [
    "Single Origin",
    "Blended"
]

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
    <MetaData title="Create Product" />
    {loading ? <Loader/> : <div className="dashboard">
      <div className="updateProductContainer">
        <form
          className="updateProductForm"
          encType="multipart/form-data"
          onSubmit={updateProductSubmitHandler}
        >
          <h1>Update Coffee</h1>

          <div >
              <lable className="old-password">Coffee name</lable>
            <input
              type="text"
              placeholder="Name"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div >
              <lable className="old-password">Coffee origin</lable>
            <input
              type="text"
              placeholder="Origin"
              required
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div>
          <lable className="old-password">Coffee type</lable>
            <select value={singleOrigin ? true : false} onChange={(e) => setSingleOrigin(e.target.value == "Single Origin" ? "true" : "false")}>
              {/* <placeholder>{singleOrigin ? "Single Origin" : "Blend"}</placeholder> */}
                  <option value={true}>Single Origin</option>
                  <option value={false}>Blend</option>
            </select>
          </div>
          <div>
          <lable className="old-password">Coffee aroma</lable>
            <input
              type="text"
              placeholder="Aroma"
              required
              value={aroma}
              onChange={(e) => setAroma(e.target.value)}
            />
          </div>
          <div>
          <lable className="old-password">Coffee flavor</lable>
            <input
              type="text"
              placeholder="Flavor"
              required
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
            />
          </div>
          <div>
          <lable className="old-password">Coffee finish</lable>
            <input
              type="text"
              placeholder="Finish"
              required
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
            />
          </div>
          <div>
          <lable className="old-password">Roast level</lable>
            <select value={roastLevel} onChange={(e) => setRoastLevel(e.target.value)}>
              {/* <placeholder>{roastLevel}</placeholder> */}
              {roastLevels.map((roast) => (
                <option key={roast} value={roast} >
                  {roast}
                </option>
              ))}
            </select>
          </div>
          <div>
          <lable className="old-password">Coffee price</lable>
            <input
              type="number"
              placeholder="Price"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
          <lable className="old-password">Bag size</lable>
            <input
              type="number"
              placeholder="Bag size"
              required
              value={bagSize}
              onChange={(e) => setBagSize(e.target.value)}
            />
          </div>

          <div>
          <lable className="old-password">Coffee description</lable>
            <textarea
              placeholder="Product Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              cols="30"
              rows="1"
            ></textarea>
          </div>

          <div>
          <lable className="old-password">Coffee stock</lable>
            <input
              type="number"
              placeholder="Stock"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div id="createProductFormFile">
              <label></label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
            //   onChange={createProductImagesChange}
              multiple
            />
          </div>

          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
            onClick={updateProductSubmitHandler}
          >
            Create
          </Button>
        </form>
      </div>
    </div>}
  </Fragment>
  );
};

export default UpdateProduct;