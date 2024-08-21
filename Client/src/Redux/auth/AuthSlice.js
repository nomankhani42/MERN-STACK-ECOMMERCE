import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token:localStorage.getItem('token')
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  user:{

  },
  reducers: {
    loginSuccess: (state,action) => {
        state.isAuthenticated=true;
        state.token=action.payload;
        state.user=action.payload.user;
    },
    logoutSuccess: (state) => {
      state.token=null
       state.isAuthenticated=false;
       state.user={};
        
        
        
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
