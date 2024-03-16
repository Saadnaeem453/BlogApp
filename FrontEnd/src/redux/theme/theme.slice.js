import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    theme: "Light"
}
const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "Light" ? "dark" : "Light"
        },

    }
})
export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer