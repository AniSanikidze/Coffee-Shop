import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loading/Loader";
import { useHistory } from "react-router-dom";
import { clearErrors, register, login } from "../../actions/userAction";
import { useAlert } from "react-alert";
import "./Form.css";

const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpSubmitted, setSignUpSubmitted] = useState(false);
  const dispatch = useDispatch();
  let { loading, error, isAuthenticated } = useSelector((state) => state.user);
  let history = useHistory();
  const alert = useAlert();

  const handleRegistration = (e) => {
    e.preventDefault();
    setSignUpSubmitted(true);
    dispatch(register(username, email, password, confirmPassword));
  };

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        dispatch(login(email, password));
        history.push("/");
        alert.success("Thank you for registration!");
      }
    }
  }, [loading, alert, dispatch, email, password, history, isAuthenticated]);

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
        <div className="form-wrapper-signup">
          <h1 className="form-title">CREATE AN ACCOUNT</h1>
          <p style={{ color: "red", fontSize: "14px", margin: "7px 0" }}>
            {signUpSubmitted && error}
          </p>
          <div className="sign-up-form" onSubmit={handleRegistration}>
            <input
              className="signup-input"
              placeholder="username"
              type="text"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              minLength={2}
              maxLength={30}
            />
            <input
              className="signup-input"
              placeholder="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="signup-input"
              placeholder="password"
              type="password"
              name="password"
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="signup-input"
              placeholder="confirm password"
              type="password"
              name="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="agreement">
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </span>
            <button className="signup-button" onClick={handleRegistration}>
              CREATE
            </button>
            <span className="agreement">
              Already have an account?{" "}
              <Link to="/login" className="signin-link">
                SIGN IN
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
