import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../Slices/productsSlice";
import showFormReducer from "../Slices/showFormSlice";
import currentPageReducer from "../Slices/currentPageSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    showForm: showFormReducer,
    currentPage: currentPageReducer,
  },
});

export default store;
