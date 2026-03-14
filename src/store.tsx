import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';
import toastReducer from './slices/toastSlice';

const store=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        toast:toastReducer
    }
})

export default store;