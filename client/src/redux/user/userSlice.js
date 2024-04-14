import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false; 
      state.error = null;
    },    
    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutSccess:(state, action)=>{
      state.currentUser = null;
      state.loading = false; 
      state.error = null;
    }
  },
});
//export
export const {
  signInStart,
  signInFailure,
  signInSucess,
  updateStart,
  updateSucess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOutSccess
} = userSlice.actions;
export default userSlice.reducer;
