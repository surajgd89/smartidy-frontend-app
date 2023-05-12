import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_REGISTER_URL = 'http://localhost:3000/register';

//FETCH User
export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
   try {
      const response = await axios.get(API_REGISTER_URL);
      return response.data;
   } catch (error) {
      throw Error(error.response.data.error);
   }
});

//CREATE User
export const createUser = createAsyncThunk('users/createUser', async (userData) => {
   try {
      const response = await axios.post(API_REGISTER_URL, userData);
      return response.data;
   } catch (error) {
      throw Error(error.response.data.error);
   }
});

//UPDATE User
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }) => {

   try {
      const response = await axios.put(`${API_REGISTER_URL}/${id}`, userData);
      return response.data;
   } catch (error) {
      throw Error(error.response.data.error);
   }
});

//PATCH User
export const patchUser = createAsyncThunk('users/patchUser', async ({ id, userData }) => {
   try {
      const response = await axios.patch(`${API_REGISTER_URL}/${id}`, userData);
      return response.data;
   } catch (error) {
      throw Error(error.response.data.error);
   }
});

//DELETE User
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
   try {
      await axios.delete(`${API_REGISTER_URL}/${id}`);
      return id;
   } catch (error) {
      throw Error(error.response.data.error);
   }
});


//ACTIONS
const registerSlice = createSlice({
   name: 'register',
   initialState: {
      data: [],
      loading: false,
      error: null,
   },

   reducers: {},
   extraReducers: builder => {
      builder

         //FETCH 
         .addCase(fetchUser.pending, state => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
         })
         .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })


         //CREATE 
         .addCase(createUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data.push(action.payload);
         })
         .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })


         //UPDATE 
         .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateUser.fulfilled, (state, action) => {
            const updateUserData = action.payload;
            const index = state.data.findIndex((user) => user.id === updateUserData.id);
            if (index !== -1) {
               state.data[index] = updateUserData;
            }
            state.loading = false;
         })
         .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })


         //PATCH 
         .addCase(patchUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(patchUser.fulfilled, (state, action) => {
            const updateUserData = action.payload;
            const index = state.data.findIndex((user) => user.id === updateUserData.id);
            if (index !== -1) {
               state.data[index] = updateUserData;
            }
            state.loading = false;
         })
         .addCase(patchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })


         //DELETE 
         .addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(deleteUser.fulfilled, (state, action) => {
            const id = action.payload;
            state.data = state.data.filter((user) => user.id !== id);
            state.loading = false;
         })
         .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         });


   },
});

export default registerSlice.reducer;