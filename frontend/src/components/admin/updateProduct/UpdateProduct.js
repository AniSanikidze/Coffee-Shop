import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getAdminProduct,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import { useHistory } from "react-router-dom";
import Loader from "../../loading/Loader";
import "./UpdateProductForm.css";
import "../newproduct/newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../../firebase";

const UpdateProduct = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { loading, error, product } = useSelector((state) => state.product);

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.adminProduct
  );

  const [productName, setProductName] = useState("");
  const [singleOrigin, setSingleOrigin] = useState(null);
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState(0);
  const [aroma, setAroma] = useState("");
  const [flavor, setFlavor] = useState("");
  const [finish, setFinish] = useState("");
  const [desc, setDesc] = useState("");
  const [bagSize, setBagSize] = useState(0);
  const [roastLevel, setRoastLevel] = useState("");
  const [stock, setStock] = useState(0);
  const [img, setImg] = useState(null);

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
    loading,
  ]);

  useEffect(() => {
    dispatch(getAdminProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (!loading) {
      if (product) {
        setProductName(product.productName);
        setDesc(product.desc);
        setPrice(product.price);
        setSingleOrigin(product.singleOrigin);
        setOrigin(product.origin);
        setRoastLevel(product.roastLevel);
        setBagSize(product.bagSize);
        setStock(product.stock);
        setAroma(product.aroma);
        setFinish(product.finish);
        setFlavor(product.flavor);
      }
    }
  }, [loading, product]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    if (img !== null) {
      const storage = getStorage(app);

      const desertRef = ref(storage, product.img);

      deleteObject(desertRef)
        .then(() => {})
        .catch((error) => {
          alert.error(error);
        });

      const fileName = new Date().getTime() + img.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              alert.info("Upload is paused");
              break;
            case "running":
              alert.success("Upload is running");
              break;
            default:
          }
        },

        (error) => {
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            let img = downloadURL;
            dispatch(
              updateProduct(
                productId,
                price,
                roastLevel,
                singleOrigin,
                origin,
                desc,
                stock,
                bagSize,
                productName,
                img
              )
            );
          });
        }
      );
    } else {
      dispatch(
        updateProduct(
          productId,
          price,
          roastLevel,
          singleOrigin,
          origin,
          desc,
          stock,
          bagSize,
          productName
        )
      );
    }
  };
  const roastLevels = ["Light", "Medium", "Dark"];

  return (
    <div className="newProduct">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="newProductTitle">Update Product</h1>
          <form
            className="newProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
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
                value={singleOrigin ? true : false}
                onChange={(e) => setSingleOrigin(e.target.value)}
              >
                <option value={true}>Single Origin</option>
                <option value={false}>Blend</option>
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
              <select
                value={roastLevel}
                onChange={(e) => setRoastLevel(e.target.value)}
              >
                {roastLevels.map((roast) => (
                  <option key={roast} value={roast}>
                    {roast}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="newProductItem">
              <label>Bag size</label>
              <input
                type="number"
                placeholder="250"
                required
                value={bagSize}
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
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="newProductItem">
              <label>Update Image</label>
              <div
                className="custom-file-upload"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: 10,
                  paddingLeft: 0,
                }}
              >
                {product.img && img == null && (
                  <div className="product-img">
                    <img
                      src={product.img}
                      alt="Product Preview"
                      style={{
                        width: "13rem",
                        height: "18rem",
                        borderRadius: "5px",
                        marginRight: "10px",
                      }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="file"
                  style={{ color: "rgba(0, 0, 0, 0)" }}
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
                Update Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
