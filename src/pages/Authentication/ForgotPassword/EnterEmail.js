/*eslint-disable*/
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./EnterEmail.scss";
import http from "core/services/httpService";
import Loading from "components/Loading/Loading";
import { pushToast } from "components/Toast";


function EnterEmail() {
  const [isLoadding, setIsLoading] = useState(false);
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      emailforgot: ''
    },
    validationSchema: Yup.object({
      emailforgot: Yup.string().email("Invalid email format").required("Required!")
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const respone = await http.get(`/auth/forgot-password?email=${values.emailforgot}`)
        localStorage.setItem("emailforgotPassword", values.emailforgot);
        if(respone.result){
          history.push("/forgot-password-verify-code")
        }
        setIsLoading(false);
      } catch (err) {
        pushToast("error", err.message);
        setIsLoading(false);
      }
    }
  })
  const {values, errors} = formik
  const backToLogin = () => {
    history.push("/")
  }
  return (
    <AuthLayout>
      <Loading visible={isLoadding} />
      <div className="forgot-password-wrapper">
        <div onClick={backToLogin} className="forgot-back-btn"></div>
        <div className="forgot-main">
          <div className="forgot-reset-title">Reset your Password</div>
          <form className="forgot-form-email" onSubmit={formik.handleSubmit}>
            <div className="forgot-form-group">
              <div className="forgot-text-form-forgot">Please enter your email address, we will send you an email to reset your password</div>
              <input 
                type="text" 
                className="forgot-email-forgot"
                name="emailforgot"
                value={values.emailforgot}
                onChange={formik.handleChange}
              />
              {errors.emailforgot && (
                <p className="errors">{errors.emailforgot}</p>
              )}
            </div>
            <button type="submit" className="forgot-btn-submit">SEND CODE</button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default EnterEmail;
