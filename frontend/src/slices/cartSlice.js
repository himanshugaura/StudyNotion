import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"; //

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,

    reducers: {
        setTotalItems(state, value) {
            state.totalItems = value.totalItems;
           
        },
        resetCart(state)
        {
            state.totalItems = 0;
        }
    }
})


export const { setTotalItems , resetCart } = cartSlice.actions;


export default cartSlice.reducer;
