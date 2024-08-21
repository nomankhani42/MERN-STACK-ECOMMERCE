import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: '',
    userName: '',
    country: '',
    role: 2,
  },
  reducers: {
    addUser: (state, action) => {
    
      return (state = { ...state,
         name: action.payload.name,
         userName:action.payload.userName,
         country:action.payload.country,
         role:action.payload.role,
         userId:action.payload.userId,
         token:action.payload.token
         });
    },
    removeUser: (state, action) => {
     
      return (state = {});
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
