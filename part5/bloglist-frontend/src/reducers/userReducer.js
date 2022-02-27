import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      return state = user
    }
  }
})


export const { setUser } = userSlice.actions
export default userSlice.reducer