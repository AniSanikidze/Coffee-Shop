import React from "react";
import { Button } from "../button/Button";
import useUpdateUsernameForm from "./useUpdateUsernameForm";
import validateUsername from "./validateUsername";
function UpdateUsername({ submitForm }) {
  const { handleChange, handleSubmit, errors } = useUpdateUsernameForm(
    submitForm,
    validateUsername
  );

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <div className="change-password">
        <div className="form-inputs">
          <label className="input-field">Current Password</label>
          <input
            className="form-input blue"
            type="password"
            name="oldPassword"
            placeholder="Enter your exsiting password"
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <label className="input-field">New Password</label>
          <input
            className={"form-input"}
            type="password"
            name="newPassword"
            placeholder="Enter your new password"
            value="you current password"
            onChange={handleChange}
          />
          {errors.newPassword && <p>{errors.newPassword}</p>}
        </div>
        <div className="form-inputs">
          <label className="input-field">Verify New Password</label>
          <input
            className={"form-input"}
            type="password"
            name="newPassword2"
            placeholder="Reenter your password to verify"
            onChange={handleChange}
          />
          {errors.newPassword2 && <p>{errors.newPassword2}</p>}
        </div>
        <Button
          buttonStyle="btn--form"
          buttonSize="btn--large"
          type="submit"
          onClick={handleSubmit}
        >
          Save New Password
        </Button>
      </div>
    </form>
  );
}

export default UpdateUsername;
