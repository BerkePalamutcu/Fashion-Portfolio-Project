import { createSlice } from '@reduxjs/toolkit';

const productInitialState = {
  productData: {},
};

export const productSlice = createSlice({
  name: 'productSlice',
  productInitialState,
  reducers: {
    getProductData: (state, action) => {
      state.productData = { ...action.payload };
    },
  },
});

export const { getProductData } = productSlice.actions;
export default productSlice.reducer;
