import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    user: {
      name: "",
      email: "",
      phone: "",
      img: "",
    },
  },
  reducers: {
    addUser(state, action) {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.phone = action.payload.phone;
      state.user.img = action.payload.img;
    },
    removeUser(state) {
      state.user.name = "";
      state.user.email = "";
      state.user.phone = "";
      state.user.img = "";
    },
  },
});
export const profileActions = ProfileSlice.actions;
export default ProfileSlice.reducer;
