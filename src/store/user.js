import { createSlice } from "@reduxjs/toolkit";
import { setUserLocal, removeUserLocal } from "core/localStore";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const slice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    loading: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { payload } = action;
      state.user = payload?.user;
      setUserLocal(payload?.token, payload?.user);

      if (payload?.rememberMe?.isRemember) {
        localStorage.setItem("rememberMe", JSON.stringify(payload?.rememberMe));
      } else {
        localStorage.removeItem("rememberMe");
      }

      // if (!payload?.user?.isEnable) {
      //   window.location.href = "/verify-email";
      //   return;
      // }

      window.location.href = "/";
    },
    logoutSuccess: (state) => {
      state.user = null;
      removeUserLocal();
      window.location.href = "/login";
    },
    setLoading: (state, action) => {
      const { payload } = action;
      state.loading = payload.loading;
    },
    setHasProfile: (state, action) => {
      state.user.isProfileCreated = action.payload;
    }
  }
});

export default slice.reducer;

// Actions

export const { loginSuccess, logoutSuccess, setLoading, setHasProfile } =
  slice.actions;

export const login = (values) => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const data = await http.post("/api/auth/login", {
      email: values.email,
      password: values.password
    });

    let user = {
      ...data.data
    };
    const token = data.token || false;

    const rememberMe = {
      isRemember: values.isRemember,
      email: values.email,
      password: values.password
    };

    dispatch(setLoading({ loading: false }));

    if (!token) {
      pushToast("error", data?.message);
    } else if (data.success) {
      dispatch(loginSuccess({ user, token, rememberMe }));
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e.message);

    // if (e.message === "Please confirm token!") {
    //   window.location.href = "/verify-email";
    // }
    return;
  }
};

export const logout = () => async (dispatch) => {
  try {
    // await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

export const requestResetPassword = (values) => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));

    const data = await http.post("/api/auth/forgot", {
      email: values.email
    });

    const success = data.success;

    dispatch(setLoading({ loading: false }));

    if (success) {
      pushToast("success", "Check your email");

      // window.location.href = "/";
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e.message);

    return;
  }
};

export const resetPassword = (values, token) => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));

    const data = await http.post(`/api/auth/reset/${token}`, {
      password: values.password
    });

    const success = data.success;

    dispatch(setLoading({ loading: false }));

    if (success) {
      pushToast("success", "Check your email");
      // window.location.href = "/";
    } else {
      pushToast("error", data?.error);
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e?.error);

    return;
  }
};
