import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstname:"",
    lastname:"",
    email:"",
    image:"",
    _id:"",
}

const userSlice = createSlice({

    name:"user",
    initialState,
    reducers:{
        loginReducer:(state , action)=>{
            // console.log(action.payload);
            state.email = action.payload.email;
            state._id = action.payload._id;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.image = action.payload.image;
        },
        logoutReducer:(state , action)=>{
            state.email = "";
            state._id = "";
            state.firstname = "";
            state.lastname = "";
            state.image = "";
        }
    }
});

export const {loginReducer , logoutReducer} = userSlice.actions;
export default userSlice.reducer;