import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

export const moviesSlice = createSlice({
    name: "movies",
    initialState,

    reducers: {

    }
})

export const { } = moviesSlice.actions
export default moviesSlice.reducer