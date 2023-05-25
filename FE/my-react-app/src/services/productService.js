import {createAsyncThunk} from "@reduxjs/toolkit";
import customAPI from "./customAPI";

export const getProduct = createAsyncThunk(
    'products/getProducts',
    async () => {
        const res = await customAPI().get('products');
        return res.data;
    }
)
export const deleteProduct = createAsyncThunk(
    'products/deleteProducts',
    async (id) => {
        await customAPI().delete(`products/${id}`);
        return id;
    }
)
export const addProduct = createAsyncThunk(
    'products/addProducts',
    async (product) => {
        await customAPI().post(`products`, product)
    }
)
export const findProductById = createAsyncThunk(
    'products/findProducts',
    async (id) => {
        const res = await customAPI().get(`products/${id}`);
        return res.data;
    }
)
export const editProduct = createAsyncThunk(
    'products/editProduct',
    async (arg, thunkAPI) => {
        console.log(arg)
        await customAPI().put(`products/${arg.id}`, arg.product)
    }
)