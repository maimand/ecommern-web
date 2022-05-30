import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./user";
import position from "./position";

const store = configureStore({
  reducer: {
    user: usersReducer,
    position: position
  }
});

export default store;
