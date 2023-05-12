import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice';
import registerReducer from '../features/register/registerSlice';
export const store = configureStore({
   reducer: {
      idyUser: userReducer,
      idyRegister: registerReducer,
   }
})
export default store;