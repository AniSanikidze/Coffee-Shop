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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

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
  const [singleOrigin, setSingleOrigin] = useState(null)
  const [origin, setOrigin] = useState("")
  const [price, setPrice] = useState(0);
  const [aroma,setAroma] = useState("");
  const [flavor, setFlavor] = useState("")
  const [finish, setFinish] = useState("")
  const [desc, setDesc] = useState("");
  const [bagSize, setBagSize] = useState(0)
  const [roastLevel, setRoastLevel] = useState("");
  const [stock, setStock] = useState(0);
  const [img,setImg] = useState(null)

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
    if(!loading){
             if (product){
          console.log(product)
        setProductName(product.productName);
        setDesc(product.desc);
        setPrice(product.price);
        setSingleOrigin(product.singleOrigin)
        setOrigin(product.origin);
        setRoastLevel(product.roastLevel)
        setBagSize(product.bagSize)
        setStock(product.stock); 
        setAroma(product.aroma);
        setFinish(product.finish);
        setFlavor(product.flavor)
     }
    }
  },[loading])
  console.log(roastLevel)

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    if (img !== null){
      const fileName = new Date().getTime() + img.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        
      (error) => {
        // Handle unsuccessful uploads
      },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            let img = downloadURL
            dispatch(updateProduct(productId,price,roastLevel,singleOrigin,origin,desc,stock,bagSize,productName,img));
          });
        }
      );
    }
    else{
      dispatch(updateProduct(productId,price,roastLevel,singleOrigin,origin,desc,stock,bagSize,productName));
    }
   
  };
  const roastLevels = [
    "Light",
    "Medium",
    "Dark"
]

console.log(img)

  return (
    <Fragment>
    <MetaData title="Create Product" />
    {loading ? <Loader/> : <div className="dashboard">
      <div className="newProductContainer">
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
              <input
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          </div>

          <div id="createProductFormImage">
              {product.img && img == null && <img src={product.img} alt="Product Preview" 
              style={{width:'13rem',height:'18rem'}}
              />}
              {img && <p>{img.name}</p>}
          </div>
          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
            onClick={updateProductSubmitHandler}
          >
            Update
          </Button>
        </form>
      </div>
    </div>}
  </Fragment>
  );
};

export default UpdateProduct;