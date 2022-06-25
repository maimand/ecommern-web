import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "pages/Authentication/Login/Login";
import SignUp from "pages/Authentication/SignUp/SignUp";
import Error from "pages/Error/Error.js";
import VerifyEmail from "pages/Authentication/VerifyEmail/VerifyEmail";
import EnterEmail from "pages/Authentication/ForgotPassword/EnterEmail";
import UpdatePassWord from "pages/Authentication/ForgotPassword/UpdatePassWord";
import { Home } from "pages/Home/Home";
import OrderManagement from "pages/OrderManagement/OrderManagement";
import OrderDetailMerchant from "pages/OrderManagement/OrderDetail/OrderDetailMerchant";
import ProductManagement from "pages/ProductManagement/ProductManagement";
import UpdateProduct from "pages/ProductManagement/UpdateProduct/UpdateProduct";
import Cart from "pages/Cart/Cart";
import HIstory from "pages/History/History";
import OderDetail from "pages/History/OderDetail/OderDetail";
import ProductDetail from "pages/ProductDetail/ProductDetail";
import RequestMechant from "pages/RequestMerchant/RequestMechant";
import AddProduct from "pages/ProductManagement/AddProduct/AddProduct";
import ResetPassword from "pages/Authentication/ForgotPassword/ResetPassword";

export const routeConfig = [
  {
    path: "/signup",
    isPrivate: false,
    exact: true,
    component: SignUp
  },
  {
    path: "/user/cart",
    isPrivate: true,
    exact: true,
    component: Cart
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
    path: "/merchant/request-seller",
    isPrivate: true,
    exact: true,
    component: RequestMechant
  },
  {
    path: "/forgot-password-enter-email",
    isPrivate: false,
    exact: true,
    component: EnterEmail
  },
  {
    path: "/forgot-password-update-password/:token",
    isPrivate: false,
    exact: true,
    component: UpdatePassWord
  },
  {
    path: "/reset-password",
    isPrivate: false,
    exact: true,
    component: ResetPassword
  },
  {
    path: "/:slug",
    isPrivate: false,
    exact: true,
    component: Home
  },
  {
    path: "/user/order-management",
    isPrivate: true,
    exact: true,
    component: OrderManagement
  },
  {
    path: "/order-management-detail/:id",
    isPrivate: true,
    exact: true,
    component: OrderDetailMerchant
  },
  {
    path: "/product-management-merchant/:categoryId",
    isPrivate: true,
    exact: true,
    component: ProductManagement
  },
  {
    path: "/update-product-merchant/:productId",
    isPrivate: true,
    exact: true,
    component: UpdateProduct
  },
  {
    path: "/order-history/:id",
    isPrivate: true,
    exact: true,
    component: OderDetail
  },
  {
    path: "/user/history",
    isPrivate: true,
    exact: true,
    component: HIstory
  },
  {
    path: "/merchant/add-product/:subCategoryId",
    isPrivate: true,
    exact: true,
    component: AddProduct
  },
  {
    path: "/product-detail/:slug",
    isPrivate: false,
    exact: true,
    component: ProductDetail
  },
  {
    path: "/",
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
        return <Redirect to="/" />;
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

  return <Redirect to="/" />;
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
