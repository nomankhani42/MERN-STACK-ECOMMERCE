import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth/AuthSlice";
import UserSlice from "./user/UserSlice";
import CartSlice from "./Cart/CartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const rootConfig={
    key:'root',
    storage
}

const rootReducers=combineReducers({
    auth:AuthSlice,
    user:UserSlice,
    cart:CartSlice
})

const persistedReducer=persistReducer(rootConfig,rootReducers);

const Store =configureStore({
    reducer:persistedReducer
})


export default Store;