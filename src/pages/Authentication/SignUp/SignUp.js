import React, { useState } from "react";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./SignUp.scss";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import http from "core/services/httpService";
import Loading from "components/Loading/Loading";
import { pushToast } from "components/Toast";
import { useFormik } from "formik";

const SignUp = () => {
  let history = useHistory();
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("Required!")
        .max(15, "Maximum 15 characters")
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .matches(/^\s*\S[\s\S]*$/, "Cannot contain only blankspaces"),
      lastName: Yup.string()
        .required("Required!")
        .max(15, "Maximum 15 characters")
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .matches(/^\s*\S[\s\S]*$/, "Cannot contain only blankspaces"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .required("Required!")
        .matches(/^\S*$/, "This field cannot contain blankspaces")
        .matches(
          /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "At least one uppercase, one number and one special case character"
        )
        .min(5, "Minimum 5 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password doesn’t match")
        .required("Required!")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);

        try {
          await http
            .post("/api/auth/register", {
              email: values.email,
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password
            })
            .then((response) => {
              if (response?.success) {
                setIsLoading(false);
                resetForm();

                pushToast("success", response?.message);
                // localStorage.setItem("email", values.email);
                history.push("/login");
              } else {
                pushToast("error", response?.message);
                values.password = "";
                values.confirmPassword = "";
              }

              setIsLoading(false);
            });
        } catch (error) {
          pushToast("error", error?.message);
          setIsLoading(false);
        }
      } catch (error) {
        pushToast("error", error?.message);
        setIsLoading(false);
      }
    }
  });
  const touched = formik.touched;
  const error = formik.errors;
  const values = formik.values;

  return (
    <AuthLayout>
      <Loading visible={isLoading} />
      <div className="signup-wrapper">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-wrapper">
            <div className="row">
              <div className="col form-group">
                <label className="label-form">Name </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  name="firstName"
                  value={values.firstName}
                  onChange={formik.handleChange}
                />
                {error.firstName && touched.firstName && (
                  <p className="errors">{error.firstName}</p>
                )}
              </div>
              <div className="col form-group">
                <label className="label-form invisible">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  name="lastName"
                  value={values.lastName}
                  onChange={formik.handleChange}
                />
                {error.lastName && touched.lastName && (
                  <p className="errors">{error.lastName}</p>
                )}
              </div>
            </div>
            <div className="form-group">
              <label className="label-form">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={values.email}
                onChange={formik.handleChange}
              />
              {error.email && touched.email && (
                <p className="errors">{error.email}</p>
              )}
            </div>

            <div className="form-group">
              <label className="label-form">Password</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type={isShow ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={values.password}
                  onChange={formik.handleChange}
                />
                <span className="input-group-append">
                  <div className="input-group-text">
                    <i
                      className={isShow ? "fas fa-eye" : "fa fa-eye-slash"}
                      onClick={() => setIsShow((prevState) => !prevState)}
                    />
                  </div>
                </span>
              </div>
              {error.password && touched.password && (
                <p className="errors">{error.password}</p>
              )}
            </div>
            <div className="form-group">
              <label className="label-comfirm">Confirm password</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type={isShowConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={formik.handleChange}
                />
                <span className="input-group-append">
                  <div className="input-group-text">
                    <i
                      className={
                        isShowConfirm ? "fas fa-eye" : "fa fa-eye-slash"
                      }
                      onClick={() =>
                        setIsShowConfirm((prevState) => !prevState)
                      }
                    />
                  </div>
                </span>
              </div>
              {error.confirmPassword && touched.confirmPassword && (
                <p className="errors">{error.confirmPassword}</p>
              )}
            </div>
            <p className="text-muted-1">
              By clicking Sign Up, you agree with our{" "}
              <span className="font-weight-bold">Privacy Policy</span>
            </p>
            <div className="form-group btn-signup">
              <Loading visible={isLoading} />
              <button type="submit" className="btn btn-block">
                {" "}
                SIGN UP
              </button>
            </div>
            <p className="text-muted-2">
              Already have an account ?{" "}
              <Link to="/login" className="font-weight-bold">
                Log In Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
