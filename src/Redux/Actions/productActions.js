// src/actions/productActions.js
import { setProducts } from "../Slices/productsSlice";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(setProducts(data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};
