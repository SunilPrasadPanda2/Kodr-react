import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  phone: "",
  name: "",
  gender:"",
  userType: "",
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { _id, phone, name, userType, gender,isAuthenticated,accessToken,refreshToken } =
        action.payload;

      state._id = _id;
      state.phone = phone;
      state.name = name;
      state.gender = gender;
      state.userType = userType;
      state.isAuthenticated = isAuthenticated;
      state.accessToken=accessToken;
      state.refreshToken=refreshToken;
    },
    resetAuth: (state, action) => {
      state._id = "";
      state.phone = "";
      state.name = "";
      state.gender = "";
      state.userType = "";
      state.isAuthenticated = false;
      state.accessToken="";
      state.refreshToken="";
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectUserType = (state) => state.auth.userType;
export const selectUserId = (state) => state.auth._id;
export const accessToken = (state) => state.auth.accessToken;
export const refreshToken = (state) => state.auth.refreshToken;

export default authSlice.reducer;
