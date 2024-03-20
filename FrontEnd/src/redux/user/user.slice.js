import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser: null,
    error: null,
    loading: false
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Update reducers
        updateStart: (state) => {
            state.loading = true;
            state.error = null
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        // Delete Reducers
        deleteStart: (state) => {
            state.loading = true;
            state.error = null
        },
        deleteSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null
        },
        deleteFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})
export const { signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure, deleteFailure, deleteStart, deleteSuccess } = userSlice.actions

export default userSlice.reducer;