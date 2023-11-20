import { createSlice } from "@reduxjs/toolkit";

let initialStateValue={
    
    data:{},
    isloggedin:false
}

export const bibleChapSlice = createSlice({
    // This is the name of the slice of state that we will implement in our
    // empty store.
    name: "bibleChap",
    // This is the initial state for your slice of state. 
    initialState: {
        value: initialStateValue,
    },
    // As indicated before. The reducer is used to manipulate the initial
    // state or current state.
    reducers: {
          
        reset: (state) => {
            state.value = initialStateValue;
        }
        
        ,updateBibleChapter:(state,action)=>
        {
            state.value.data=  action.payload.bibleChap;
        }
        ,
        updateLoginUser:(state)=>{
            state.value.isloggedin= !state.value.isloggedin;
        }
    },
});

// Actions are generated for each case reducer function. import acttions in react components
export const { reset,updateBibleChapter,updateLoginUser} =bibleChapSlice.actions;

//Exporting the reducer function into our empty store.
export default bibleChapSlice.reducer;