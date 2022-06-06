import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./EnterEmail.scss";
import { useDispatch } from "react-redux";
import { requestResetPassword } from "store/user";

function EnterEmail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!")
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      dispatch(requestResetPassword(values));
    }
  });
  const { values, errors } = formik;
  const backToLogin = () => {
    history.push("/");
  };
  return (
    <AuthLayout>
      <div className="forgot-password-wrapper">
        <div onClick={backToLogin} className="forgot-back-btn"></div>
        <div className="forgot-main">
          <div className="forgot-reset-title">Reset your Password</div>
          <form className="forgot-form-email" onSubmit={formik.handleSubmit}>
            <div className="forgot-form-group">
              <div className="forgot-text-form-forgot">
                Please enter your email address, we will send you an email to
                reset your password
              </div>
              <input
                type="text"
                className="forgot-email-forgot"
                name="email"
                value={values.email}
                onChange={formik.handleChange}
              />
              {errors.email && <p className="errors">{errors.email}</p>}
            </div>
            <button type="submit" className="forgot-btn-submit">
              SEND CODE
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default EnterEmail;
