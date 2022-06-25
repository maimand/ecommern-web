import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import "./UpdatePassWord.scss";

import MainLayout from "layout/MainLayout/MainLayout";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";
import { setLoading } from "store/user";
import { useHistory } from "react-router-dom";

function ResetPassword() {
  const history = useHistory();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, "Minimum 5 characters")
        .required("Required!"),
      confirmPassword: Yup.string()
        .min(5, "Minimum 5 characters")
        .required("Required!")
    }),
    onSubmit: async (values, { resetForm }) => {
      resetForm();

      try {
        setLoading(true);

        const res = await http.post("/api/auth/password", values);

        setLoading(false);
        if (res.success) {
          pushToast("success", res.message);
          history.push("/");
        }
      } catch (e) {
        setLoading(false);
        pushToast("error", e.message);
      }
    }
  });
  const { values, errors } = formik;

  return (
    <MainLayout>
      <div className="update-password-wrapper d-flex justify-content-center">
        <div className="update-main" style={{ width: "500px" }}>
          <div className="update-reset-title">Update your Password</div>
          <form onSubmit={formik.handleSubmit} className="update-form">
            <div className="update-pass-form-group">
              <label>Old Password</label>
              <input
                type={isShowPassword ? "text" : "password"}
                className="update-newpass"
                name="password"
                value={values.password}
                onChange={formik.handleChange}
              />
              <div
                className="show-password"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <i className="far fa-eye" />
                ) : (
                  <i className="far fa-eye-slash" />
                )}
              </div>
              {errors.password && <p className="errors">{errors.password}</p>}
            </div>
            <div className="update-pass-form-group confirm-pass-group">
              <label>New Password</label>
              <input
                type={isShowConfirmPassword ? "text" : "password"}
                className="update-newpass confirm-newpass"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={formik.handleChange}
              />
              <div
                className="show-password"
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              >
                {isShowConfirmPassword ? (
                  <i className="far fa-eye" />
                ) : (
                  <i className="far fa-eye-slash" />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="errors">{errors.confirmPassword}</p>
              )}
            </div>
            <button type="submit" className="update-btn-submit">
              UPDATE PASSWORD
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default ResetPassword;
