import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../MetaData";
import { NEW_PRODUCT_RESET } from "../../../constants/productConstants";
import { useHistory } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";


const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory()

  const { loading, error, success } = useSelector((state) => state.newProduct);

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
  let [img, setImg] = useState(null);

  const roastLevels = [
      "Light",
      "Medium",
      "Dark"
  ]
  const coffeeType = [
      "Single Origin",
      "Blended"
  ]

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
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
            dispatch(createProduct(productName,singleOrigin,origin,desc,bagSize,stock,price,roastLevel,img,aroma,flavor,finish));
        });
      }
    );


  };


  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <input
                type="text"
                placeholder="Name"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Origin"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
            <div>
              <select onChange={(e) => setSingleOrigin(e.target.value == "Single Origin" ? "true" : "false")}>
                <option value="">Choose Coffee Type</option>
                {coffeeType.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Aroma"
                required
                value={aroma}
                onChange={(e) => setAroma(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Flavor"
                required
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Finish"
                required
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
              />
            </div>
            <div>
              <select onChange={(e) => setRoastLevel(e.target.value)}>
                <option value="">Choose Roast Level</option>
                {roastLevels.map((roastLevel) => (
                  <option key={roastLevel} value={roastLevel}>
                    {roastLevel}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Bag size"
                required
                onChange={(e) => setBagSize(e.target.value)}
              />
            </div>
            <div>
              <textarea
                placeholder="Product Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="createProductFormFile" style={{display:'flex',flexDirection: 'column'}}>
            <input
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <p>{img !== null && img.name}</p>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
              onClick={createProductSubmitHandler}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;