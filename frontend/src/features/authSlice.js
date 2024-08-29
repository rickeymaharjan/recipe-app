import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const backendUrl = import.meta.env.VITE_BACKEND_URL

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
}

// Function to check token
export const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token
    try {
      const response = await axios.get(`${backendUrl}/api/users/checkToken`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    } catch (error) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      return rejectWithValue(error.message)
    }
  }
)

// Function to handle login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/login`, {
        email,
        password,
      })
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      return response.data
    } catch (error) {
      if (error.response.data.error == "Error: Invalid email.") {
        return rejectWithValue("The email you entered is invalid.")
      } else if (error.response.data.error == "Error: Invalid password.") {
        return rejectWithValue("The password you entered is invalid.")
      } else if (
        error.response.data.error == "Error: All fields must be filled."
      ) {
        return rejectWithValue("All fields must be filled.")
      }
      return rejectWithValue("An error occurred. Please try again.")
    }
  }
)

// Function to handle sign up
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/signup`, {
        username,
        email,
        password,
      })
      console.log(response.data)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      return response.data
    } catch (error) {
      if (error.response.data.error == "Error: All fields must be filled") {
        return rejectWithValue("Please enter all fields.")
      } else if (error.response.data.error == "Error: Email already in use") {
        return rejectWithValue("The Email is already in use.")
      } else if (
        error.response.data.error == "Error: Username already in use"
      ) {
        return rejectWithValue("The Username is already in use.")
      }
      return rejectWithValue(error.response.data.error)
    }
  }
)

// Function to handle getting current user
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token
    try {
      const response = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Handle token check
      .addCase(checkToken.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(checkToken.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = true
      })

      .addCase(checkToken.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        state.error = null
      })

      // Handle registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// Export the actions generated by the slice
export const { logout } = authSlice.actions

// Selector to get the user from the state
export const selectUser = (state) => state.auth.user
export const selectAuthToken = (state) => state.auth.token
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error

// Export the reducer to be used in the store
export default authSlice.reducer
