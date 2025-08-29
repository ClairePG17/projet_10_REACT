import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from '../actions/userApi'

// Thunk asynchrone pour l’authentification
export const signIn = createAsyncThunk(
  'auth/signInStatus',
  async (credentials, thunkAPI) => {
    try {
      const userData = await userAPI.signIn(credentials)
      return userData
    } catch (error) {
      // Utiliser rejectWithValue pour envoyer l’erreur au reducer
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// État initial
const initialState = {
  user: null,
  loading: 'idle',
  error: null,
}

// Slice pour mettre à jour l’état selon le statut de la requête
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.user = action.payload
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload || action.error.message
      })
  },
})

export default authSlice.reducer
