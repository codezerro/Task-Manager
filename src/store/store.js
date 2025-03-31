import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice.js";
import authSlice from "./authSlice.js";
import taskSlice from "./taskSlice.js";
const store = configureStore({
    reducer: { usersSlice, authSlice, taskSlice },
    devTools: true,
});

export default store;
