import React from 'react'
import { Button } from "../button/Button"
import useUpdateUsernameForm from './useUpdateUsernameForm'
import validateUsername from './validateUsername';
import styled from "styled-components";
function UpdateUsername({ submitForm }) {
    const { handleChange, handleSubmit, errors } = useUpdateUsernameForm(
        submitForm,
        validateUsername
    );

    return (
        <form
                onSubmit={handleSubmit}
                className='form' noValidate>
            <div className="change-password">
                <div className='form-inputs'>
                <label className="old-password">
                    Current Password
                </label>
                <input
                    className='form-input blue'
                    type='password'
                    name='oldPassword'
                    placeholder='Enter your exsiting password'
                    // value={values.oldPassword}
                    onChange={handleChange}
                    />
                    {/* {incorrectOldPassword &&
                        !errors.oldPassword &&
                        values.oldPassword.length !== 0 ?
                    <p>Incorrect Password</p>
                        :
                    errors.oldPassword && <p>{errors.oldPassword}</p>} */}
                </div>
                <div className="form-inputs">
                <label className="old-password">
                    New Password
                </label>
                <input
                    className={
                        // values.newPassword.length > 5 ?
                        // values.newPassword > 64 ?
                        //     "form-input"
                        //     :
                        //     "form-input green"
                        // :
                        "form-input"}
                    type='password'
                    name='newPassword'
                    placeholder='Enter your new password'
                    value="you current password"
                    onChange={handleChange}
                />
                    {errors.newPassword && <p>{errors.newPassword}</p>}
                    </div>
                <div className="form-inputs">
                <label className="old-password">
                    Verify New Password
                </label>
                <input
                    className={
                        "form-input"}
                    type='password'
                    name='newPassword2'
                    placeholder='Reenter your password to verify'
                    // value={
                    //     values.newPassword2}
                    onChange={handleChange}
                />{errors.newPassword2 && <p>{errors.newPassword2}</p>}</div>
                <Button
                    buttonStyle="btn--form"
                    buttonSize="btn--large"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Save New Password
                </Button>
            </div>
        </form>
    )
}

export default UpdateUsername
