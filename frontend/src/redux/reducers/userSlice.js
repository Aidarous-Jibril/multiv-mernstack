import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userInfo,
    loading: false,
    error: null,
    success: false
}



export const registerUser = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/users/register', data );
      localStorage.setItem("userInfo", JSON.stringify(res.data));  
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
      try {
        const res = await axios.post('/api/users/login', data );
        localStorage.setItem("userInfo", JSON.stringify(res.data));  
        return res.data;
      } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      }
    }
  );

// Logout
export const logoutUser = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('userInfo')
})


const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: (state) => {
            // state.userInfo = null
            state.loading = false
            state.error = null
            state.success = false
        }
    },
    extraReducers: (builder) => {

        //Register
        builder.addCase(registerUser.pending, state => {
            state.loading = true
        })

        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loading = false
            state.userInfo = action.payload
            state.success = true
        })

        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.success = false
        })

        // Login
        builder.addCase(loginUser.pending, state => {
            state.loading = true
        })

        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.success = true
        })

        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.success = false
        })

    
    }
})

export const { resetState } = userSlice.actions
export default userSlice.reducer