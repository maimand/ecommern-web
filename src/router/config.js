import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "pages/Authentication/Login/Login";
import SignUp from "pages/Authentication/SignUp/SignUp";
import Error from "pages/Error/Error.js";
import VerifyEmail from "pages/Authentication/VerifyEmail/VerifyEmail";
import EnterEmail from "pages/Authentication/ForgotPassword/EnterEmail";
import VerifyDigitalCode from "pages/Authentication/ForgotPassword/VerifyDigitalCode";
import UpdatePassWord from "pages/Authentication/ForgotPassword/UpdatePassWord";
import { Home } from "pages/Home/Home";

export const routeConfig = [
  {
    path: "/signup",
    isPrivate: false,
    exact: true,
    component: SignUp
  },
  {
    path: "/verify-email",
    isPrivate: false,
    exact: false,
    component: VerifyEmail
  },
  {
    path: "/login",
    isPrivate: false,
    exact: true,
    component: Login
  },
  {
    path: "/forgot-password-enter-email",
    isPrivate: false,
    exact: true,
    component: EnterEmail
  },
  {
    path: "/forgot-password-verify-code",
    isPrivate: false,
    exact: true,
    component: VerifyDigitalCode
  },
  {
    path: "/forgot-password-update-password",
    isPrivate: false,
    exact: true,
    component: UpdatePassWord
  },
  {
    path: "/home",
    isPrivate: false,
    exact: true,
    component: Home
  },
  { path: "*", component: Error }
];

const PrivateRoute = (privateProps) => {
  const { user } = useSelector((state) => state.user);
  if (user) {
    if (user.isProfileCreated) {
      if (privateProps.path === "home") {
        return <Redirect to="/home" />;
      }

      if (
        privateProps.role !== undefined &&
        !user.roles.includes(privateProps.role)
      ) {
        return <Redirect to="/not-found" />;
      }
    }

    return <privateProps.component {...privateProps} />;
  }

  return <Redirect to="/home" />;
};

export const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) =>
        route.isPrivate ? (
          <PrivateRoute {...route} />
        ) : (
          <route.component {...props} />
        )
      }
    />
  );
};
