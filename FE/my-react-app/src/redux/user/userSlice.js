import {createSlice} from "@reduxjs/toolkit";
import {login} from "../../services/userService";


const useSlice = createSlice({
    name: 'user',
    initialState:{
        currentUser: JSON.parse(localStorage.getItem('user'))
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem('user',JSON.stringify(action.payload))
        })
    }
})

export default useSlice.reducer;