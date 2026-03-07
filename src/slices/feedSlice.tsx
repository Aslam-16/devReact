import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "./userSlice";

const feedSlice = createSlice({
    name:"feed",
    initialState:{
        feed:[],
        loading:false,
    },
    reducers:{
        setFeed(state,action){
            state.feed = action.payload;
        },
        removeUserinFeed(state,action){
            state.feed = state.feed.filter(post=>post._id !== action.payload);
        }
    }

})

export const {setFeed,removeUserinFeed} = feedSlice.actions;

export default feedSlice.reducer;