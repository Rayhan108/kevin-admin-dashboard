import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    setEmail: (state, action) => {
      const { email } = action.payload;
      state.email = email;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    clearEmail: (state) => {
      state.email = null;
    },
  },
});

export const { setUser, logout, setEmail, clearEmail } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentEmail = (state) => state.auth.email;
