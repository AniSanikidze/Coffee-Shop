import "../forms/Form.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loading/Loader";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { clearErrors, resetPassword } from "../../actions/userAction";
import MetaData from "../MetaData";
import "./Form.css";

const PasswordResetForm = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  let { loading, error, success } = useSelector(
    (state) => state.forgotPassword
  );

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(resetPassword(match.params.token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    } else {
      if (success) {
        alert.success(success);
        history.push("/login");
      }
    }
  }, [dispatch, error, alert, success, history]);

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
          <MetaData title={"Forgot Password - Coffee Berry"} />
          <h1 className="form-title">RESET PASSWORD</h1>
          <p style={{ color: "red", fontSize: "14px", margin: "7px 0" }}>
            {error}
          </p>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              className="login-input"
              placeholder=" New password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <input
              className="login-input"
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
            <button className="login-button">RESET</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PasswordResetForm;
