import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:{
        feed:[],
        loading:false,
    },
    reducers:{
        setFeed(state,action){
            state.feed = action.payload;
        }
    }

})

export const {setFeed} = feedSlice.actions;

export default feedSlice.reducer;