import { createSlice } from "@reduxjs/toolkit";

let initialStateValue={
    
    data:{}
}

export const testAndPrayerReqsSlice = createSlice({
    // This is the name of the slice of state that we will implement in our
    // empty store.
    name: "testAndPrayerReqs",
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
        
        ,updateTestAndPrayerReqs:(state,action)=>
        {
            state.value.data=  action.payload.testAndPrayerReqs;
        }
       
    },
});

// Actions are generated for each case reducer function. import acttions in react components
export const { reset,updateTestAndPrayerReqs} =testAndPrayerReqsSlice.actions;

//Exporting the reducer function into our empty store.
export default testAndPrayerReqsSlice.reducer;