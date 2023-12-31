import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  user: null,
  token: null,
  myCourses: [],
  courses: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initalState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setMyCourser: (state, action) => {
      state.myCourses = action.payload.myCourses;
    },
    setCourses: (state, action) => {
      state.courses = action.payload.courses;
    },
  },
});

export const { setLogin, setLogout, setMyCourser, setCourses } =
  authSlice.actions;
export default authSlice.reducer;
