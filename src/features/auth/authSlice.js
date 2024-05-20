import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, loggedOut: false },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.token = null;
    },
    setLoggedOutState: (state, action) => {
      state.loggedOut = action.payload;
    },
  },
});

export const { setCredentials, logOut, setLoggedOutState } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;
export default authSlice.reducer;
