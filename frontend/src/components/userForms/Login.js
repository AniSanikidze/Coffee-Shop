import "../forms/Form.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loading/Loader";
import { useHistory } from "react-router-dom";
import { clearErrors, login } from "../../actions/userAction";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import "./Form.css";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginSubmitted, SetLoginSubmitted] = useState(false);
  const { setClickedUserMenuItem } = useContext(UserContext);
  let history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, user, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/user-account";

  const handleLogin = (e) => {
    e.preventDefault();
    SetLoginSubmitted(true);
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        setClickedUserMenuItem("customerinfo");
        if (user.role === "admin") {
          history.push("/admin/products-board");
        } else {
          history.push(redirect);
        }
      }
    }
  }, [
    loading,
    redirect,
    dispatch,
    history,
    isAuthenticated,
    user,
    setClickedUserMenuItem,
  ]);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <div
      className="form-container"
      style={{ background: 'url("/images/Home/EDIT2-6723.jpg") center' }}
    >
      {loading ? (
        <Loader />
      ) : (
        <div className="form-wrapper">
          <h1 className="form-title">SIGN IN</h1>
          <p style={{ color: "red", fontSize: "14px", margin: "7px 0" }}>
            {loginSubmitted && error}
          </p>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              className="login-input"
              placeholder="Password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              minLength={6}
            />
            <button className="login-button">LOGIN</button>
            <Link
              to="/forgot-password"
              style={{
                margin: "5px 0px",
                fontSize: "12px",
                textDecoration: "underline",
                cursor: "pointer",
                color: "#555555",
              }}
            >
              FORGOT PASSWORD?
            </Link>
            <Link
              to="/signup"
              style={{
                margin: "5px 0px",
                fontSize: "12px",
                textDecoration: "underline",
                cursor: "pointer",
                color: "#555555",
              }}
            >
              CREATE A NEW ACCOUNT
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
