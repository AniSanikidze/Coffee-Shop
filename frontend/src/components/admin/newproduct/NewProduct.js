import React, { useEffect, useState } from "react";
// import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../../../constants/productConstants";
import { useHistory } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import "./newProduct.css";
import { loadUser } from "../../../actions/userAction";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { error: userError } = useSelector((state) => state.user);

  const [productName, setProductName] = useState("");
  const [singleOrigin, setSingleOrigin] = useState(true);
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState(0);
  const [aroma, setAroma] = useState("");
  const [flavor, setFlavor] = useState("");
  const [finish, setFinish] = useState("");
  const [desc, setDesc] = useState("");
  const [bagSize, setBagSize] = useState(0);
  const [roastLevel, setRoastLevel] = useState("");
  const [stock, setStock] = useState(0);
  let [img, setImg] = useState(null);

  const roastLevels = ["Light", "Medium", "Dark"];
  const coffeeType = ["Single Origin", "Blended"];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/products-board");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loadUser());
    console.log(userError);
    if (!loading && userError !== "Token Expired") {
      if (img !== null) {
        const fileName = new Date().getTime() + img.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            switch (snapshot.state) {
              case "paused":
                alert.error("Upload is paused");
                break;
              case "running":
                alert.success("Upload is running");
                break;
              default:
            }
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              let img = downloadURL;
              dispatch(
                createProduct(
                  productName,
                  singleOrigin,
                  origin,
                  desc,
                  bagSize,
                  stock,
                  price,
                  roastLevel,
                  img,
                  aroma,
                  flavor,
                  finish
                )
              );
            });
          }
        );
      } else {
        alert.error("Please add product image");
      }
    } else {
      dispatch(loadUser());
    }
  };

  return (
    <div className="newProduct">
      <h1 className="newProductTitle">New Product</h1>
      <form
        className="newProductForm"
        encType="multipart/form-data"
        onSubmit={createProductSubmitHandler}
      >
        <div className="newProductItem">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Colombia"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="newProductItem">
          <label>Origin</label>
          <input
            type="text"
            placeholder="Colombia"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>
        <div className="newProductItem">
          <label>Select coffee type</label>
          <select
            required
            onChange={(e) =>
              setSingleOrigin(
                e.target.value === "Single Origin" ? "true" : "false"
              )
            }
          >
            <option value="">Choose Coffee Type</option>
            {coffeeType.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="newProductItem">
          <label>Aroma</label>
          <input
            type="text"
            placeholder="Aroma"
            required
            value={aroma}
            onChange={(e) => setAroma(e.target.value)}
          />
        </div>
        <div className="newProductItem">
          <label>Flavor</label>
          <input
            type="text"
            placeholder="Flavor"
            required
            value={flavor}
            onChange={(e) => setFlavor(e.target.value)}
          />
        </div>
        <div className="newProductItem">
          <label>Finish</label>
          <input
            type="text"
            placeholder="Finish"
            required
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
          />
        </div>
        <div className="newProductItem">
          <label>Roast Level</label>
          <select required onChange={(e) => setRoastLevel(e.target.value)}>
            <option value="">Choose Roast Level</option>
            {roastLevels.map((roastLevel) => (
              <option key={roastLevel} value={roastLevel}>
                {roastLevel}
              </option>
            ))}
          </select>
        </div>
        <div className="newProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="25"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="newProductItem">
          <label>Bag size</label>
          <input
            type="number"
            placeholder="250"
            required
            onChange={(e) => setBagSize(e.target.value)}
          />
        </div>
        <div className="newProductItem">
          <label>Product Description</label>
          <textarea
            placeholder="Description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            cols="30"
            rows="1"
            required
          ></textarea>
        </div>
        <div className="newProductItem">
          <label>Stock</label>
          <input
            type="number"
            placeholder="400"
            required
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="newProductItem">
          <label>Upload Image</label>
          <div className="custom-file-upload">
            <input
              type="file"
              id="file"
              placeholder="Upload Image"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
        </div>
        <div className="new-product-button">
          <button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Add new Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
