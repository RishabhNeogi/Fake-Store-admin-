import { createSlice } from "@reduxjs/toolkit";

const showFormSlice = createSlice({
  name: "showForm",
  initialState: false,
  reducers: {
    setShowForm: (state, action) => {
      return action.payload; // This line can be simplified
    },
  },
});

export const { setShowForm } = showFormSlice.actions;
export default showFormSlice.reducer;
