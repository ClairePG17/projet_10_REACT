import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from '../actions/userApi'

export const signIn = createAsyncThunk(
  'auth/signInStatus', //par convention <nom_du_slice>/<nom_de_l_action>
  async (credentials, thunkAPI) => {
    try {
      const response = await userAPI.signIn(credentials)
      return response.body.token
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token
    try {
      const profile = await userAPI.getProfile(token)
      return profile
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    profile: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null
      state.profile = null
      state.error = null
      state.loading = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.token = action.payload //stock le token
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload || action.error.message
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.profile = action.payload.body //stock données du profil
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload || action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

  