import {createSlice} from "@reduxjs/toolkit";
import {deleteProduct, findProductById, getProduct} from "../../services/productService";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        list: []
    },
    extraReducers: builder => {
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.list = action.payload;
        })
        builder.addCase(deleteProduct.fulfilled,(state,action) => {
            const id = action.payload;
            const index = state.list.findIndex(item => item.id === id);
            if (index !== -1){
                state.list.splice(index,1)
            }
        })
        builder.addCase(findProductById.fulfilled,(state,action) => {
             state.list = action.payload;
        })
    }
});

export default productSlice.reducer;