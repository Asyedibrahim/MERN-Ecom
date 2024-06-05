import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.items = action.payload;
        },

        removeCartItem: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload)
        },

        updateCartItemQuantity: (state, action) => {

            const { cartItemId, newQuantity } = action.payload;
            const itemToUpdate = state.items.find(item => item._id === cartItemId);

            if (itemToUpdate) {
              itemToUpdate.quantity = newQuantity;
            }
        },

    }
});

export const { setCartItems, removeCartItem, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;