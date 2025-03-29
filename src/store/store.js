import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice.js";
import authSlice from "./authSlice.js";
// import todosSlice from "./todosSlice.js";
const store = configureStore({
    reducer: { usersSlice, authSlice },
    devTools: true,
});

// preloadedState: loadState(),
export default store;
