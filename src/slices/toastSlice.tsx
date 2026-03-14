import { createSlice } from "@reduxjs/toolkit";

const toastSlice=createSlice({
    name:"toast",
    initialState:{
        error:false,
        message:"",
        status:null
    },
    reducers:{
        toggleToast:(state,action)=>{
            state.error=action.payload.error;
            state.message=action.payload.message;
        }
    }
});

export const {toggleToast}=toastSlice.actions;
export default toastSlice.reducer;

