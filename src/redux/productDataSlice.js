import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productData: {},
};

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    getProductData: (state, action) => {
      state.productData = { ...action.payload };
    },
  },
});

export const { getProductData } = productSlice.actions;
export default productSlice.reducer;
