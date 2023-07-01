import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  cartItem: [],
};
export const Product = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataReducer: (state, action) => {
      // console.log(action);
      state.product = [...action.payload];
    },
    addCartItem: (state, action) => {
      // console.log(action);
      const total = action.payload.price;
      const check = state.cartItem.some((el)=> el._id === action.payload._id);
      if( !check) {

        state.cartItem = [
        ...state.cartItem,
        { ...action.payload, qty: 1, total },
        ];
      }
    },
    deleteCartItem: (state, action) => {
        state.cartItem = state.cartItem.filter((el)=> el._id !== action.payload)
    },
    increaseQty: (state, action) => {
        const index = state.cartItem.findIndex((el)=>el._id === action.payload);
        state.cartItem[index].qty += 1;
        state.cartItem[index].total = Number(state.cartItem[index].total) + Number(state.cartItem[index].price);
    },
    decreaseQty: (state, action) => {
        const index = state.cartItem.findIndex((el)=>el._id === action.payload);
        if(state.cartItem[index].qty === 1 ){
            state.cartItem.splice(index,1);
        }
        else{
            state.cartItem[index].qty -= 1;
            state.cartItem[index].total -= state.cartItem[index].price;
        }
    },
  },
});

export const {
  setDataReducer,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = Product.actions;
export default Product.reducer;
