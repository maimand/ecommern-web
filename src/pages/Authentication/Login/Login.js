import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthLayout from "layout/AuthLayout/AuthLayout";

import FormLogin from "./FormLogin/FormLogin";
import { pushToast } from "components/Toast";
import "./Login.scss";

const Login = () => {
  const location = useLocation();
  useEffect(() => {
    pushToast("success", location.state?.successful);
  }, [location]);
  return (
    <AuthLayout>
      <div className="login-wrapper">
        <h2 className="login-title">WELCOME</h2>
        <div className="login-form">
          <FormLogin />
        </div>
        <div className="directional-signup">
          <p>Don’t have an account,</p>
          <Link to="/signup" className="directional-signup-link">
            Sign Up Here
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
export default Login;
